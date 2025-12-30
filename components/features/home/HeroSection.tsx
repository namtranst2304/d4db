'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants/routes'

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-dark-50 to-dark-100 py-20 text-white">
            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="animate-fade-in text-5xl font-bold md:text-6xl lg:text-7xl">
                        Diablo 4 Database
                    </h1>
                    <p className="mt-6 animate-slide-up text-xl text-gray-300 md:text-2xl">
                        Your ultimate resource for items, builds, and strategies. Explore
                        the vast collection of Diablo 4 gear.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href={ROUTES.DATABASE}>
                            <Button variant="primary" size="lg">
                                🗄️ Explore Database
                            </Button>
                        </Link>
                        <Link href={ROUTES.DATABASE_ITEMS}>
                            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                                ⚔️ Browse Items
                            </Button>
                        </Link>
                        <Link href={ROUTES.DASHBOARD}>
                            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                                📊 Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative gradient orbs */}
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-600 opacity-20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
        </section>
    )
}
