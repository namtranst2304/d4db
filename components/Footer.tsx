import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-white dark:border-dark-300 dark:bg-dark-100">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 font-bold text-white text-sm">
                D4
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-dark-900">
                D4DB
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-dark-700">
              Your comprehensive Diablo 4 database for items, builds, and game
              information.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-dark-900">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="footer-link">
                  Items Database
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="footer-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-dark-900">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-dark-900">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 dark:border-dark-300">
          <p className="text-center text-sm text-muted">
            © {new Date().getFullYear()} D4DB. Not affiliated with Blizzard
            Entertainment. All game assets belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
