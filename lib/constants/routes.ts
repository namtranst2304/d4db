// Route constants for the D4DB application

export const ROUTES = {
    // Main routes
    HOME: '/',
    DATABASE: '/database',
    DASHBOARD: '/dashboard',

    // Database routes
    DATABASE_ITEMS: '/database/items',
    DATABASE_SKILLS: '/database/skills',
    DATABASE_ASPECTS: '/database/aspects',
    DATABASE_BOSSES: '/database/bosses',

    // Auth routes
    AUTH_LOGIN: '/auth/login',
    AUTH_REGISTER: '/auth/register',

    // Item detail
    ITEM_DETAIL: (id: string) => `/item/${id}`,
} as const

export const EXTERNAL_LINKS = {
    WOWHEAD_D4: 'https://www.wowhead.com/diablo-4',
    BLIZZARD_D4: 'https://diablo4.blizzard.com',
} as const

// Navigation items for the navbar
export const NAV_ITEMS = [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Database', href: ROUTES.DATABASE },
    { label: 'Dashboard', href: ROUTES.DASHBOARD },
] as const

// Database categories for navigation
export const DATABASE_NAV_ITEMS = [
    { label: 'Items', href: ROUTES.DATABASE_ITEMS, icon: '⚔️' },
    { label: 'Skills', href: ROUTES.DATABASE_SKILLS, icon: '✨' },
    { label: 'Aspects', href: ROUTES.DATABASE_ASPECTS, icon: '🔮' },
    { label: 'Bosses', href: ROUTES.DATABASE_BOSSES, icon: '👹' },
] as const
