'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants/routes'

interface CTASectionProps {
    title?: string
    description?: string
    buttonText?: string
    buttonLink?: string
}

export default function CTASection({
    title = 'Ready to Optimize Your Build?',
    description = 'Join thousands of players using D4DB to dominate Sanctuary',
    buttonText = 'Get Started Free',
    buttonLink = ROUTES.AUTH_REGISTER,
}: CTASectionProps) {
    return (
        <section className="bg-primary-600 py-16 text-white dark:bg-primary-700">
            <div className="container-custom text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                    {title}
                </h2>
                <p className="mt-4 text-xl text-primary-100">
                    {description}
                </p>
                <div className="mt-8">
                    <Link href={buttonLink}>
                        <Button variant="secondary" size="lg">
                            {buttonText}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
