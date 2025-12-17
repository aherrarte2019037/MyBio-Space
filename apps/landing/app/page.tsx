import Link from "next/link";
import { Now } from "../../../packages/utils/src/current-date";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-gray-900">
          Kyt - The Live Media Kit Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A B2B SaaS platform for content creators to share verified, real-time analytics with
          brands.
        </p>
      </header>

      {/* What We Do Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">What we do</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Stop sending static PDFs. Kyt connects directly to the YouTube Data API to generate a
            verified, always-up-to-date media kit. We provide real-time data syncing, historical
            growth graphs, and secure contact tools to help professional creators pitch sponsorships
            effectively.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
            <p className="text-4xl font-extrabold mb-6">
              $0<span className="text-base font-normal text-gray-500">/mo</span>
            </p>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                1 Media Kit
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Daily Updates
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="border border-blue-200 bg-blue-50 rounded-2xl p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-900">Pro Plan</h3>
            <p className="text-4xl font-extrabold mb-6 text-blue-900">
              $7<span className="text-base font-normal text-blue-700">/mo</span>{" "}
              <span className="text-lg font-normal text-gray-500">or $70/yr</span>
            </p>
            <ul className="space-y-3 text-blue-800 mb-8">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Unlimited Kits
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Live 15-minute Updates
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                White Labeling
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Historical Data Access
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="mb-4">
            Support:{" "}
            <a href="mailto:hello@kyt.one" className="text-white hover:underline">
              hello@kyt.one
            </a>
          </p>
          <div className="flex justify-center gap-6 mt-8 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="mt-8 text-xs text-gray-500">
            &copy; {Now().getFullYear()} Kyt LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
