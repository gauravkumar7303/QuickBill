// src/app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to the Book Store Billing System</h2>
      <p className="mb-8">Manage your book store effortlessly by logging in or registering your company.</p>

      <div className="space-x-4">
        <Link href="/register" legacyBehavior>
          <a className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors">
            Register Your Company
          </a>
        </Link>
        
        <Link href="/login" legacyBehavior>
          <a className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
            Login
          </a>
        </Link>
        <Link href="/billing">
          <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Go to Billing Page
          </button>
        </Link>
      </div>
    </div>
  );
}
