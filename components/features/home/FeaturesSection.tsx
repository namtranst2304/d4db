'use client'

const FEATURES = [
    {
        title: 'Comprehensive Database',
        description:
            'Access detailed information about every item in Diablo 4, from common gear to legendary artifacts.',
        icon: (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
            </svg>
        ),
    },
    {
        title: 'Build Creator',
        description:
            'Create, save, and share your optimal character builds with the community.',
        icon: (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        ),
    },
    {
        title: 'Real-time Updates',
        description:
            'Stay up-to-date with the latest patches, balance changes, and new items.',
        icon: (
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
    },
]

export default function FeaturesSection() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-dark-100">
            <div className="container-custom">
                <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-dark-900">
                    Why Choose D4DB?
                </h2>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="card text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                                {feature.icon}
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-dark-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-gray-600 dark:text-dark-700">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
