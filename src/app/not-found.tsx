import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-6 text-center bg-brand-dark">
      <h2 className="font-bebas text-6xl text-brand-red tracking-wide mb-2">404</h2>
      <h3 className="font-bebas text-3xl text-brand-light tracking-wide mb-6">PAGE NOT FOUND</h3>
      <p className="font-inter text-brand-light/70 mb-8">The route or team you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="bg-transparent border border-brand-red text-brand-red font-bebas text-lg tracking-widest px-10 py-3 uppercase transition-all hover:bg-brand-red/10"
      >
        RETURN HOME
      </Link>
    </div>
  );
}