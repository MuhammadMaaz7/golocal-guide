import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to start your journey?</span>
          <span className="block text-blue-600">Join GoLocal Guide today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link href="/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Sign up as Tourist
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link href="/guide-signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
              Become a Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

