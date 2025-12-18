import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-dvh bg-white text-black flex items-center justify-center">
      <div className="w-full text-center flex-y items-center space-y-4">
        <h2 className="text-4xl font-bold">404 Not Found</h2>
        <p className="block m-6">Could not find requested resource</p>
        <Link
          className="border-2 p-4 rounded-xl hover:bg-black hover:text-white transition-colors"
          href="/"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
