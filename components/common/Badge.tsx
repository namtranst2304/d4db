'use client'

import { ReactNode } from 'react'

interface BadgeProps {
    children: ReactNode
    variant?: 'default' | 'outline' | 'solid'
    color?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'cyan'
    size?: 'sm' | 'md'
    className?: string
}

const colorClasses = {
    gray: {
        default: 'bg-gray-500/10 text-gray-400 border-gray-500/50',
        outline: 'border-gray-500 text-gray-400',
        solid: 'bg-gray-500 text-white',
    },
    red: {
        default: 'bg-red-500/10 text-red-400 border-red-500/50',
        outline: 'border-red-500 text-red-400',
        solid: 'bg-red-500 text-white',
    },
    orange: {
        default: 'bg-orange-500/10 text-orange-400 border-orange-500/50',
        outline: 'border-orange-500 text-orange-400',
        solid: 'bg-orange-500 text-white',
    },
    yellow: {
        default: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50',
        outline: 'border-yellow-500 text-yellow-400',
        solid: 'bg-yellow-500 text-white',
    },
    green: {
        default: 'bg-green-500/10 text-green-400 border-green-500/50',
        outline: 'border-green-500 text-green-400',
        solid: 'bg-green-500 text-white',
    },
    blue: {
        default: 'bg-blue-500/10 text-blue-400 border-blue-500/50',
        outline: 'border-blue-500 text-blue-400',
        solid: 'bg-blue-500 text-white',
    },
    purple: {
        default: 'bg-purple-500/10 text-purple-400 border-purple-500/50',
        outline: 'border-purple-500 text-purple-400',
        solid: 'bg-purple-500 text-white',
    },
    cyan: {
        default: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/50',
        outline: 'border-cyan-500 text-cyan-400',
        solid: 'bg-cyan-500 text-white',
    },
}

const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
}

export default function Badge({
    children,
    variant = 'default',
    color = 'gray',
    size = 'sm',
    className = ''
}: BadgeProps) {
    const baseClasses = 'inline-flex items-center rounded-full font-medium border'

    return (
        <span className={`${baseClasses} ${colorClasses[color][variant]} ${sizeClasses[size]} ${className}`}>
            {children}
        </span>
    )
}
