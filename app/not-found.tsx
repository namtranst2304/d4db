export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-500">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-dark-900">
          Page Not Found
        </h2>
        <p className="mt-2 text-muted">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
