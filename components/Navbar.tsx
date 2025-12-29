'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from '@/lib/utils/theme'
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
    const { theme, toggleTheme } = useTheme()

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
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="icon-btn"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            )}
                        </button>

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
