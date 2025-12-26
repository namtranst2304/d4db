# CSS Utility Classes - D4DB

## Overview
This document lists all custom utility classes defined in `app/globals.css` for consistent styling across the application.

## Navigation & Links

### `.nav-link`
Navigation link styling for headers and menus.
```css
@apply text-sm font-medium text-gray-700 transition-colors 
       hover:text-primary-600 dark:text-dark-800 dark:hover:text-primary-500;
```
**Usage:** Navbar links, menu items

### `.footer-link`
Footer link styling.
```css
@apply text-gray-600 transition-colors hover:text-primary-600 
       dark:text-dark-700 dark:hover:text-primary-500;
```
**Usage:** Footer links

## Buttons

### `.icon-btn`
Icon button styling with hover effects.
```css
@apply rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 
       dark:text-dark-800 dark:hover:bg-dark-200;
```
**Usage:** Theme toggle, close buttons, icon-only actions

## Form Elements

### `.label`
Form label styling.
```css
@apply block text-sm font-medium text-gray-700 dark:text-dark-800;
```
**Usage:** Input labels, checkbox labels

## Text Colors

### `.text-heading`
Main heading and title color.
```css
@apply text-gray-900 dark:text-dark-900;
```
**Usage:** H1-H6, card titles, important text

### `.text-body`
Body text color.
```css
@apply text-gray-800 dark:text-dark-850;
```
**Usage:** Paragraphs, descriptions

### `.text-muted`
Muted/secondary text color.
```css
@apply text-gray-600 dark:text-dark-700;
```
**Usage:** Subtitles, helper text, less important info

### `.text-subtle`
Most subtle text color for hints.
```css
@apply text-gray-500 dark:text-dark-600;
```
**Usage:** Timestamps, very minor details

## Cards

### `.card-hover`
Card with hover effect.
```css
@apply rounded-lg border border-gray-200 bg-white p-6 shadow-sm 
       transition-all hover:shadow-md dark:border-dark-300 
       dark:bg-dark-100 dark:hover:shadow-dark;
```
**Usage:** Item cards, clickable cards

## Badges

### `.badge`
Base badge styling.
```css
@apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium;
```
**Usage:** Status indicators, tags

### `.badge-primary`
Primary colored badge.
```css
@apply bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400;
```
**Usage:** Featured items, important tags

## Dividers

### `.divider`
Bottom border divider.
```css
@apply border-b pb-4 dark:border-dark-300;
```
**Usage:** Separating list items

### `.divider-last`
Divider that disappears on last child.
```css
@apply border-b pb-4 last:border-0 dark:border-dark-300;
```
**Usage:** List items where last item should have no border

## Usage Examples

### Navigation
```tsx
<Link href="/about" className="nav-link">
  About
</Link>
```

### Card with Hover
```tsx
<div className="card-hover">
  <h3 className="text-heading">Item Name</h3>
  <p className="text-muted">Description</p>
</div>
```

### Form Label
```tsx
<label className="label">
  Email Address
</label>
```

### Badge
```tsx
<span className="badge badge-primary">
  New
</span>
```

### List with Dividers
```tsx
<div className="space-y-4">
  <div className="divider-last">Item 1</div>
  <div className="divider-last">Item 2</div>
  <div className="divider-last">Item 3</div>
</div>
```

## Benefits

1. **Consistency:** Same styles across all components
2. **Maintainability:** Change once, apply everywhere
3. **Dark Mode:** Built-in dark mode support
4. **Performance:** Reduced CSS bundle size through class reuse
5. **Developer Experience:** Semantic class names easier to remember

## Guidelines

- Use these utility classes instead of repeating Tailwind class combinations
- If a pattern is used 3+ times, consider adding it to global CSS
- Keep class names semantic (describe purpose, not appearance)
- Always include dark mode variants
