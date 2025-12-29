// Main scraper implementation for Wowhead Diablo 4 data
import puppeteer, { Browser, Page } from 'puppeteer'
import * as fs from 'fs'
import * as path from 'path'
import {
    SCRAPER_CONFIG,
    QUALITY_MAP,
    CLASS_MAP,
    SLOT_MAP,
    ASPECT_TYPE_MAP,
} from './scraper-config'

// Types for scraped data
interface WowheadItem {
    id: number
    name: string
    quality: number
    classmask?: number
    slot?: number
    icon?: string
    reqLevel?: number
    itemPower?: number
    tooltip?: string
}

interface WowheadSkill {
    id: number
    name: string
    classmask?: number
    category?: number
    icon?: string
    description?: string
}

interface WowheadAspect {
    id: number
    name: string
    type?: number
    classmask?: number
    description?: string
    icon?: string
    dungeon?: string
}

// Sleep utility
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Create output directory if it doesn't exist
function ensureOutputDir() {
    const outputDir = path.resolve(SCRAPER_CONFIG.outputDir)
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }
    return outputDir
}

export class WowheadScraper {
    private browser: Browser | null = null
    private page: Page | null = null

    async init() {
        console.log('🚀 Launching browser...')
        this.browser = await puppeteer.launch({
            headless: SCRAPER_CONFIG.headless,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })
        this.page = await this.browser.newPage()

        // Set user agent to avoid detection
        await this.page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )

        // Set viewport
        await this.page.setViewport({ width: 1920, height: 1080 })

        console.log('✅ Browser launched successfully')
    }

    async close() {
        if (this.browser) {
            await this.browser.close()
            console.log('🔒 Browser closed')
        }
    }

    private async navigateWithRetry(url: string, retries = SCRAPER_CONFIG.maxRetries): Promise<boolean> {
        for (let i = 0; i < retries; i++) {
            try {
                console.log(`📄 Navigating to: ${url}`)
                await this.page!.goto(url, {
                    waitUntil: 'networkidle2',
                    timeout: SCRAPER_CONFIG.timeout,
                })

                // Wait for Listview to be available
                await this.page!.waitForFunction(
                    () => typeof (window as any).Listview !== 'undefined',
                    { timeout: 10000 }
                ).catch(() => {
                    console.log('⚠️ Listview not found, continuing anyway...')
                })

                return true
            } catch (error) {
                console.error(`❌ Navigation failed (attempt ${i + 1}/${retries}):`, error)
                if (i < retries - 1) {
                    console.log(`⏳ Retrying in ${SCRAPER_CONFIG.retryDelay / 1000}s...`)
                    await sleep(SCRAPER_CONFIG.retryDelay)
                }
            }
        }
        return false
    }

    // Extract Listview data from the page
    private async extractListviewData(): Promise<any[]> {
        try {
            const data = await this.page!.evaluate(() => {
                // Look for listview data in the page
                const scriptTags = Array.from(document.querySelectorAll('script'))

                for (const script of scriptTags) {
                    const content = script.textContent || ''

                    // Look for Listview initialization with data
                    const match = content.match(/new Listview\s*\(\s*\{[\s\S]*?data\s*:\s*(\[[\s\S]*?\])/)
                    if (match) {
                        try {
                            return JSON.parse(match[1])
                        } catch {
                            continue
                        }
                    }
                }

                // Try to get data from global Listview instances
                const win = window as any
                if (win.lv_data) return win.lv_data
                if (win.listviewData) return win.listviewData

                return []
            })

            return data || []
        } catch (error) {
            console.error('❌ Failed to extract Listview data:', error)
            return []
        }
    }

    // Scrape items from Wowhead
    async scrapeItems(limit?: number): Promise<any[]> {
        console.log('\n📦 Starting items scrape...')
        const items: any[] = []

        // Navigate to unique/mythic items pages
        // Using separate URLs for better filtering
        const itemPages = [
            { url: `${SCRAPER_CONFIG.baseUrl}/items/quality:6`, name: 'Mythic', rarity: 'Mythic' },
            { url: `${SCRAPER_CONFIG.baseUrl}/items/quality:5`, name: 'Unique', rarity: 'Unique' },
        ]

        for (const { url, name, rarity } of itemPages) {
            const success = await this.navigateWithRetry(url)

            if (!success) {
                console.error(`❌ Failed to load ${name} items page`)
                continue
            }

            // Wait for the listview to load
            await sleep(3000)

            // Wait for listview rows to appear
            try {
                await this.page!.waitForSelector('.listview-row', { timeout: 10000 })
            } catch {
                console.log('⚠️ No listview rows found, trying alternate selectors...')
            }

            // Extract data using JavaScript execution with correct selectors
            const rawItems = await this.page!.evaluate(() => {
                const items: any[] = []

                // Find all item rows in the listview
                const rows = document.querySelectorAll('.listview-row')
                console.log('Found rows:', rows.length)

                rows.forEach((row, index) => {
                    // Use the correct selector for item links
                    const nameLink = row.querySelector('a.listview-cleartext') as HTMLAnchorElement
                    if (!nameLink) return

                    const name = nameLink.textContent?.trim() || 'Unknown'
                    const url = nameLink.href
                    const idMatch = url.match(/-(\d+)$/)
                    const id = idMatch ? idMatch[1] : String(index + 1)

                    // Get icon URL from the iconmedium element
                    const iconDiv = row.querySelector('.iconmedium ins') as HTMLElement
                    let iconUrl = ''
                    if (iconDiv && iconDiv.style.backgroundImage) {
                        iconUrl = iconDiv.style.backgroundImage.replace(/url\(['"]?(.+?)['"]?\)/, '$1')
                    }

                    // Get type, slot, class from table cells
                    const cells = Array.from(row.querySelectorAll('td'))
                    const type = cells[2]?.textContent?.trim() || ''
                    const slot = cells[3]?.textContent?.trim() || ''
                    const classReq = cells[4]?.textContent?.trim() || 'All Classes'

                    // Filter out non-equipment items
                    const unwantedTypes = ['Elixir', 'Incense', 'Material', 'Consumable', 'Quest', 'Scroll', 'Key']
                    if (unwantedTypes.some(t => type.includes(t))) {
                        return
                    }

                    items.push({
                        id,
                        name,
                        href: url,
                        iconUrl,
                        type,
                        slot,
                        classReq,
                    })
                })

                return items
            })

            console.log(`📊 Found ${rawItems.length} ${name} items from list`)

            if (rawItems.length === 0) {
                console.log('⚠️ No items found in list, skipping detail pages...')
                continue
            }

            // Get detailed info for each item (limited)
            const itemsToProcess = limit ? rawItems.slice(0, Math.ceil(limit / itemPages.length)) : rawItems.slice(0, 20) // Limit to 20 per quality by default

            for (const rawItem of itemsToProcess) {
                try {
                    await sleep(SCRAPER_CONFIG.delayBetweenRequests)

                    const itemUrl = rawItem.href
                    await this.navigateWithRetry(itemUrl)

                    // Extract item details from the detail page
                    const itemDetails = await this.page!.evaluate(() => {
                        // Get description from the tooltip or page content
                        const descEl = document.querySelector('.db-description-display, .tooltip-desc, .q, .item-description')
                        const description = descEl?.textContent?.trim() || ''

                        // Get affixes from stat lines
                        const affixes: { name: string; value: string; description: string; type: string }[] = []
                        const statElements = document.querySelectorAll('.q7, .q2, .item-stats li, .indent')

                        statElements.forEach((el) => {
                            const text = el.textContent?.trim() || ''
                            if (text && text.length > 3 && text.length < 200) {
                                // Try to parse "+X% Stat Name" format
                                const valueMatch = text.match(/^([+\-]?[\d.,]+%?)\s*(.+)/)
                                if (valueMatch) {
                                    affixes.push({
                                        name: valueMatch[2],
                                        value: valueMatch[1],
                                        description: text,
                                        type: 'Offensive',
                                    })
                                } else if (!text.includes('Requires') && !text.includes('Item Power')) {
                                    affixes.push({
                                        name: text,
                                        value: '',
                                        description: text,
                                        type: 'Utility',
                                    })
                                }
                            }
                        })

                        // Get item power
                        const ipMatch = document.body.textContent?.match(/Item Power:?\s*(\d+)/i)
                        const itemPower = ipMatch ? parseInt(ipMatch[1], 10) : 800

                        // Get required level
                        const lvlMatch = document.body.textContent?.match(/Requires Level\s*(\d+)/i)
                        const requiredLevel = lvlMatch ? parseInt(lvlMatch[1], 10) : 60

                        return {
                            description,
                            affixes,
                            itemPower,
                            requiredLevel,
                        }
                    })

                    // Determine category from type
                    let category: 'Weapons' | 'Armor' | 'Socketable' | 'Consumable' | 'Material' = 'Armor'
                    const typeL = rawItem.type.toLowerCase()
                    if (typeL.includes('sword') || typeL.includes('axe') || typeL.includes('mace') ||
                        typeL.includes('staff') || typeL.includes('bow') || typeL.includes('crossbow') ||
                        typeL.includes('dagger') || typeL.includes('scythe') || typeL.includes('polearm')) {
                        category = 'Weapons'
                    }

                    // Parse class requirement
                    const classArray = rawItem.classReq === 'All Classes' || rawItem.classReq === ''
                        ? ['All Classes']
                        : rawItem.classReq.split(',').map((c: string) => c.trim())

                    items.push({
                        id: rawItem.id,
                        name: rawItem.name,
                        type: rawItem.type || 'Unknown',
                        category,
                        slot: rawItem.slot || 'Unknown',
                        rarity,
                        requiredLevel: itemDetails.requiredLevel,
                        itemPower: itemDetails.itemPower,
                        description: itemDetails.description,
                        affixes: itemDetails.affixes,
                        class: classArray,
                        iconUrl: rawItem.iconUrl,
                    })

                    console.log(`  ✅ Scraped: ${rawItem.name}`)

                } catch (error) {
                    console.error(`  ❌ Failed to scrape item: ${rawItem.name}`, error)
                }
            }

            await sleep(SCRAPER_CONFIG.delayBetweenCategories)
        }

        return items
    }

    // Scrape skills from Wowhead
    async scrapeSkills(limit?: number): Promise<any[]> {
        console.log('\n⚔️ Starting skills scrape...')
        const skills: any[] = []

        const classes = ['barbarian', 'druid', 'necromancer', 'rogue', 'sorcerer', 'spiritborn']

        for (const className of classes) {
            const url = `${SCRAPER_CONFIG.baseUrl}/skills/${className}`
            const success = await this.navigateWithRetry(url)

            if (!success) {
                console.error(`❌ Failed to load ${className} skills page`)
                continue
            }

            await sleep(2000)

            // Extract skills from the page
            const rawSkills = await this.page!.evaluate((cls) => {
                const skills: any[] = []

                // Find skill cards or links
                const skillElements = document.querySelectorAll('a[href*="/skill/"]')

                skillElements.forEach((el, index) => {
                    const link = el as HTMLAnchorElement
                    const href = link.href
                    const idMatch = href.match(/\/skill\/[^/]+-(\d+)/)
                    const id = idMatch ? idMatch[1] : String(index + 1)
                    const name = link.textContent?.trim() || 'Unknown'

                    if (name && name.length > 0 && !skills.some(s => s.name === name)) {
                        skills.push({
                            id,
                            name,
                            href,
                            class: cls,
                        })
                    }
                })

                return skills
            }, className)

            console.log(`📊 Found ${rawSkills.length} ${className} skills`)

            // Limit per class
            const limitPerClass = limit ? Math.ceil(limit / classes.length) : rawSkills.length
            const skillsToProcess = rawSkills.slice(0, limitPerClass)

            for (const rawSkill of skillsToProcess) {
                try {
                    await sleep(SCRAPER_CONFIG.delayBetweenRequests)

                    await this.navigateWithRetry(rawSkill.href)

                    // Extract skill details
                    const skillDetails = await this.page!.evaluate(() => {
                        const description = document.querySelector('.db-description-display, .tooltip-desc, .q')?.textContent?.trim() || ''
                        const categoryEl = document.querySelector('.skill-category, .breadcrumb')
                        const category = categoryEl?.textContent?.trim() || 'Core'

                        return {
                            description,
                            category,
                        }
                    })

                    skills.push({
                        id: rawSkill.id,
                        name: rawSkill.name,
                        class: className.charAt(0).toUpperCase() + className.slice(1),
                        category: skillDetails.category || 'Core',
                        description: skillDetails.description,
                        iconUrl: '',
                    })

                    console.log(`  ✅ Scraped: ${rawSkill.name}`)

                } catch (error) {
                    console.error(`  ❌ Failed to scrape skill: ${rawSkill.name}`, error)
                }
            }

            await sleep(SCRAPER_CONFIG.delayBetweenCategories)
        }

        return skills
    }

    // Scrape aspects from Wowhead
    async scrapeAspects(limit?: number): Promise<any[]> {
        console.log('\n✨ Starting aspects scrape...')
        const aspects: any[] = []

        const url = `${SCRAPER_CONFIG.baseUrl}/aspects`
        const success = await this.navigateWithRetry(url)

        if (!success) {
            console.error('❌ Failed to load aspects page')
            return aspects
        }

        await sleep(2000)

        // Extract aspects from the page
        const rawAspects = await this.page!.evaluate(() => {
            const aspects: any[] = []

            // Find aspect links
            const aspectElements = document.querySelectorAll('a[href*="/aspect/"]')

            aspectElements.forEach((el, index) => {
                const link = el as HTMLAnchorElement
                const href = link.href
                const idMatch = href.match(/\/aspect\/[^/]+-(\d+)/)
                const id = idMatch ? idMatch[1] : String(index + 1)
                const name = link.textContent?.trim() || 'Unknown'

                if (name && name.length > 0 && !aspects.some(a => a.name === name)) {
                    aspects.push({
                        id,
                        name,
                        href,
                    })
                }
            })

            return aspects
        })

        console.log(`📊 Found ${rawAspects.length} aspects`)

        const aspectsToProcess = limit ? rawAspects.slice(0, limit) : rawAspects

        for (const rawAspect of aspectsToProcess) {
            try {
                await sleep(SCRAPER_CONFIG.delayBetweenRequests)

                await this.navigateWithRetry(rawAspect.href)

                // Extract aspect details
                const aspectDetails = await this.page!.evaluate(() => {
                    const description = document.querySelector('.db-description-display, .tooltip-desc, .q')?.textContent?.trim() || ''

                    // Try to find aspect type
                    const typeEl = document.querySelector('.aspect-type, .category')
                    const type = typeEl?.textContent?.trim() || 'Utility'

                    // Try to find dungeon location
                    const dungeonEl = document.querySelector('.aspect-source, .source')
                    const dungeon = dungeonEl?.textContent?.trim() || ''

                    return {
                        description,
                        type,
                        dungeon,
                    }
                })

                aspects.push({
                    id: rawAspect.id,
                    name: rawAspect.name,
                    type: aspectDetails.type || 'Utility',
                    description: aspectDetails.description,
                    class: ['All Classes'],
                    dungeonLocation: aspectDetails.dungeon,
                    iconUrl: '',
                })

                console.log(`  ✅ Scraped: ${rawAspect.name}`)

            } catch (error) {
                console.error(`  ❌ Failed to scrape aspect: ${rawAspect.name}`, error)
            }
        }

        return aspects
    }

    // Scrape bosses from Wowhead
    async scrapeBosses(): Promise<any[]> {
        console.log('\n👹 Starting bosses scrape...')
        const bosses: any[] = []

        // Define all bosses with their types and tiers based on Season 11 data
        const bossConfigs = [
            // Initiate Tier Lair Bosses
            { name: 'Echo of Varshan', type: 'Lair Boss', tier: 'Initiate', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/world-boss-echo-of-varshan` },
            { name: 'Grigoire, the Galvanic Saint', type: 'Lair Boss', tier: 'Initiate', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/world-boss-grigoire-the-galvanic-saint` },
            { name: 'The Beast in the Ice', type: 'Lair Boss', tier: 'Initiate', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/world-boss-beast-in-ice` },
            { name: 'Lord Zir', type: 'Lair Boss', tier: 'Initiate', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/world-boss-lord-zir` },
            { name: 'Urivar', type: 'Lair Boss', tier: 'Initiate', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/urivar-boss-guide` },
            // Greater Tier Lair Bosses
            { name: 'Duriel, King of Maggots', type: 'Lair Boss', tier: 'Greater', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/uber-duriel-boss-guide` },
            { name: 'Andariel, Maiden of Anguish', type: 'Lair Boss', tier: 'Greater', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/world-boss-uber-andariel` },
            { name: 'Harbinger of Hatred', type: 'Lair Boss', tier: 'Greater', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/harbinger-of-hatred-boss-guide` },
            // Exalted Tier Lair Bosses
            { name: 'Belial, Lord of Lies', type: 'Lair Boss', tier: 'Exalted', guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/belial-boss-guide` },
            // Pinnacle Boss
            { name: 'Echo of Lilith', type: 'Pinnacle Boss', tier: undefined, guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/world-boss-uber-lilith-echo-of-lilith` },
            // World Bosses
            { name: 'Ashava, the Pestilent', type: 'World Boss', tier: undefined, guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/ashava-pestilent-world-boss` },
            { name: 'Avarice, the Gold Cursed', type: 'World Boss', tier: undefined, guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/avarice-gold-cursed-world-boss` },
            { name: 'Wandering Death', type: 'World Boss', tier: undefined, guideUrl: `${SCRAPER_CONFIG.baseUrl}/guide/zones/wandering-death-world-boss` },
        ]

        for (const config of bossConfigs) {
            try {
                await sleep(SCRAPER_CONFIG.delayBetweenRequests)

                console.log(`📄 Scraping: ${config.name}...`)
                const success = await this.navigateWithRetry(config.guideUrl)

                if (!success) {
                    console.error(`  ❌ Failed to load guide for ${config.name}`)
                    // Still add the boss with basic info
                    bosses.push({
                        id: config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        name: config.name,
                        type: config.type,
                        tier: config.tier,
                        guideUrl: config.guideUrl,
                    })
                    continue
                }

                await sleep(2000)

                // Extract boss details from the guide page
                const bossDetails = await this.page!.evaluate(() => {
                    // Get description from the page content
                    const paragraphs = Array.from(document.querySelectorAll('p'))
                    let description = ''
                    for (const p of paragraphs) {
                        const text = p.textContent?.trim() || ''
                        if (text.length > 50 && text.length < 500 && !text.includes('Table of Contents')) {
                            description = text
                            break
                        }
                    }

                    // Try to find location
                    const locationMatch = document.body.textContent?.match(/located?\s+(?:in|at)\s+([^.]+)/i)
                    const location = locationMatch ? locationMatch[1].trim() : ''

                    // Try to find summoning materials
                    const materials: { name: string; quantity: number }[] = []
                    const materialsSection = document.body.textContent || ''

                    // Common material patterns
                    const materialPatterns = [
                        /(\d+)x?\s+(Malignant Heart|Gurgling Head|Blackened Femur|Trembling Hand|Living Steel|Exquisite Blood|Distilled Fear|Mucus-Slick Egg|Shard of Agony|Stygian Stone)/gi,
                        /(Malignant Heart|Gurgling Head|Blackened Femur|Trembling Hand|Living Steel|Exquisite Blood|Distilled Fear|Mucus-Slick Egg|Shard of Agony|Stygian Stone)\s*[x×]\s*(\d+)/gi,
                    ]

                    for (const pattern of materialPatterns) {
                        let match
                        while ((match = pattern.exec(materialsSection)) !== null) {
                            const qty = parseInt(match[1], 10) || 1
                            const name = match[2] || match[1]
                            if (!materials.some(m => m.name === name)) {
                                materials.push({ name, quantity: qty })
                            }
                        }
                    }

                    // Try to find drops/loot
                    const drops: { name: string; type: string; class?: string[] }[] = []
                    const itemLinks = document.querySelectorAll('a[href*="/item/"]')
                    itemLinks.forEach(link => {
                        const name = link.textContent?.trim() || ''
                        if (name && name.length > 3 && name.length < 50) {
                            // Determine type based on color class or context
                            const parent = link.closest('li, tr, p')
                            const context = parent?.textContent?.toLowerCase() || ''
                            let type: string = 'Unique'
                            if (context.includes('mythic')) type = 'Mythic'
                            else if (context.includes('rune')) type = 'Rune'

                            if (!drops.some(d => d.name === name)) {
                                drops.push({ name, type })
                            }
                        }
                    })

                    return {
                        description,
                        location,
                        materials,
                        drops: drops.slice(0, 20), // Limit drops
                    }
                })

                bosses.push({
                    id: config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name: config.name,
                    type: config.type,
                    tier: config.tier,
                    location: bossDetails.location || undefined,
                    description: bossDetails.description || undefined,
                    summoningMaterials: bossDetails.materials.length > 0 ? bossDetails.materials : undefined,
                    drops: bossDetails.drops.length > 0 ? bossDetails.drops : undefined,
                    guideUrl: config.guideUrl,
                })

                console.log(`  ✅ Scraped: ${config.name}`)

            } catch (error) {
                console.error(`  ❌ Failed to scrape boss: ${config.name}`, error)
                // Still add basic info
                bosses.push({
                    id: config.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name: config.name,
                    type: config.type,
                    tier: config.tier,
                    guideUrl: config.guideUrl,
                })
            }
        }

        console.log(`\n📊 Scraped ${bosses.length} bosses total`)
        return bosses
    }

    // Save data to JSON file
    saveToFile(data: any[], filename: string) {
        const outputDir = ensureOutputDir()
        const filePath = path.join(outputDir, filename)

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
        console.log(`💾 Saved ${data.length} items to ${filePath}`)
    }
}

// Export for CLI usage
export async function runScraper(
    categories: ('items' | 'skills' | 'aspects' | 'bosses')[],
    limit?: number
) {
    const scraper = new WowheadScraper()

    try {
        await scraper.init()

        for (const category of categories) {
            switch (category) {
                case 'items': {
                    const items = await scraper.scrapeItems(limit)
                    if (items.length > 0) {
                        scraper.saveToFile(items, 'items-scraped.json')
                    }
                    break
                }
                case 'skills': {
                    const skills = await scraper.scrapeSkills(limit)
                    if (skills.length > 0) {
                        scraper.saveToFile(skills, 'skills-scraped.json')
                    }
                    break
                }
                case 'aspects': {
                    const aspects = await scraper.scrapeAspects(limit)
                    if (aspects.length > 0) {
                        scraper.saveToFile(aspects, 'aspects-scraped.json')
                    }
                    break
                }
                case 'bosses': {
                    const bosses = await scraper.scrapeBosses()
                    if (bosses.length > 0) {
                        scraper.saveToFile(bosses, 'bosses-scraped.json')
                    }
                    break
                }
            }
        }

        console.log('\n✅ Scraping complete!')

    } catch (error) {
        console.error('❌ Scraping failed:', error)
        throw error
    } finally {
        await scraper.close()
    }
}
