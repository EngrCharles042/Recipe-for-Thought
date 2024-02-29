import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Welcome to Recipe for Thought</h1>
        <div className="mt-4 flex items-center">
          <Link href="/restaurants">
            <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Find Restaurants
            </button>
          </Link>
          <Link href="/recipe-search">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Recipe Search
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
