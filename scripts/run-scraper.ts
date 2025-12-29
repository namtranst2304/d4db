#!/usr/bin/env node
// CLI entry point for the Wowhead scraper

import { runScraper } from './scraper'

type Category = 'items' | 'skills' | 'aspects' | 'bosses'

async function main() {
    const args = process.argv.slice(2)

    // Parse arguments
    let categories: Category[] = []
    let limit: number | undefined

    for (let i = 0; i < args.length; i++) {
        const arg = args[i]

        if (arg === '--limit' || arg === '-l') {
            limit = parseInt(args[i + 1], 10)
            i++ // Skip next arg
        } else if (arg === '--all' || arg === '-a') {
            categories = ['items', 'skills', 'aspects', 'bosses']
        } else if (['items', 'skills', 'aspects', 'bosses'].includes(arg)) {
            categories.push(arg as Category)
        } else if (arg === '--help' || arg === '-h') {
            printHelp()
            process.exit(0)
        }
    }

    // Default to all if no categories specified
    if (categories.length === 0) {
        categories = ['items', 'skills', 'aspects', 'bosses']
    }

    console.log('╔════════════════════════════════════════════════════════════╗')
    console.log('║           🎮 Wowhead Diablo 4 Data Scraper 🎮              ║')
    console.log('╠════════════════════════════════════════════════════════════╣')
    console.log(`║  Categories: ${categories.join(', ').padEnd(44)}║`)
    console.log(`║  Limit: ${(limit?.toString() || 'None').padEnd(49)}║`)
    console.log('╚════════════════════════════════════════════════════════════╝')
    console.log('')

    try {
        await runScraper(categories, limit)
        console.log('\n🎉 All done! Check public/data/ for the scraped files.')
    } catch (error) {
        console.error('\n💥 Scraping failed:', error)
        process.exit(1)
    }
}

function printHelp() {
    console.log(`
Wowhead Diablo 4 Data Scraper
=============================

Usage: npx tsx scripts/run-scraper.ts [options] [categories...]

Categories:
  items       Scrape unique and mythic items
  skills      Scrape class skills
  aspects     Scrape legendary aspects
  bosses      Scrape lair bosses, uber bosses, and world bosses

Options:
  --all, -a         Scrape all categories
  --limit, -l NUM   Limit the number of items per category (not applicable to bosses)
  --help, -h        Show this help message

Examples:
  npx tsx scripts/run-scraper.ts items --limit 10
  npx tsx scripts/run-scraper.ts skills aspects
  npx tsx scripts/run-scraper.ts bosses
  npx tsx scripts/run-scraper.ts --all --limit 20
  `)
}

main()

