'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from './ui/Button'

export default function Navbar() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:border-dark-300 dark:bg-dark-100/80">
                <nav className="container-custom">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 font-bold text-white">
                                D4
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-dark-900">
                                D4DB
                            </span>
                        </Link>
                        <div className="hidden items-center space-x-8 md:flex">
                            <Link
                                href="/"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-dark-800 dark:hover:text-primary-500"
                            >
                                Home
                            </Link>
                            <Link
                                href="/database"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-dark-800 dark:hover:text-primary-500"
                            >
                                Database
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-dark-800 dark:hover:text-primary-500"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/#items"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-dark-800 dark:hover:text-primary-500"
                            >
                                Items
                            </Link>
                            <Link
                                href="/#lair-bosses"
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-dark-800 dark:hover:text-primary-500"
                            >
                                Lair Bosses
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/auth/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button variant="primary" size="sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

    return <NavbarContent />
}

function NavbarContent() {

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:border-dark-300 dark:bg-dark-100/80">
            <nav className="container-custom">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 font-bold text-white">
                            D4
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-dark-900">
                            D4DB
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden items-center space-x-8 md:flex">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                        <Link href="/database" className="nav-link">
                            Database
                        </Link>
                        <Link href="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                        <Link href="/#items" className="nav-link">
                            Items
                        </Link>
                        <Link
                            href="/#lair-bosses"
                            className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-dark-800 dark:hover:text-primary-500"
                        >
                            Lair Bosses
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Auth Buttons */}
                        <Link href="/auth/login">
                            <Button variant="outline" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link href="/auth/register">
                            <Button variant="primary" size="sm">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}
