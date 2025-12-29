// Scraper configuration for Wowhead Diablo 4 data

export const SCRAPER_CONFIG = {
  baseUrl: 'https://www.wowhead.com/diablo-4',
  
  // Rate limiting
  delayBetweenRequests: 2000, // 2 seconds between page requests
  delayBetweenCategories: 5000, // 5 seconds between categories
  maxRetries: 3,
  retryDelay: 5000,
  
  // Browser settings
  headless: true,
  timeout: 30000,
  
  // Output paths
  outputDir: './public/data',
  
  // Category configurations
  categories: {
    items: {
      listUrl: '/items',
      types: [
        { name: 'weapons', filter: 'type=1' },
        { name: 'armor', filter: 'type=2' },
        { name: 'jewelry', filter: 'type=3' },
      ],
    },
    skills: {
      listUrl: '/skills',
      classes: ['barbarian', 'druid', 'necromancer', 'rogue', 'sorcerer', 'spiritborn'],
    },
    aspects: {
      listUrl: '/aspects',
    },
  },
}

// Wowhead item quality mapping
export const QUALITY_MAP: Record<number, string> = {
  1: 'Common',
  2: 'Magic',
  3: 'Rare',
  4: 'Legendary',
  5: 'Unique',
  6: 'Mythic',
}

// Wowhead class mapping
export const CLASS_MAP: Record<number, string> = {
  0: 'All Classes',
  1: 'Barbarian',
  2: 'Druid',
  3: 'Necromancer',
  4: 'Rogue',
  5: 'Sorcerer',
  6: 'Spiritborn',
}

// Item slot mapping
export const SLOT_MAP: Record<number, string> = {
  1: 'Helm',
  2: 'Chest',
  3: 'Gloves',
  4: 'Pants',
  5: 'Boots',
  6: 'Amulet',
  7: 'Ring',
  8: 'One-Hand',
  9: 'Two-Hand',
  10: 'Off-Hand',
}

// Aspect type mapping
export const ASPECT_TYPE_MAP: Record<number, string> = {
  1: 'Offensive',
  2: 'Defensive',
  3: 'Utility',
  4: 'Mobility',
  5: 'Resource',
}
