export default function Loading() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-4 bg-brand-dark">
      <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      <h2 className="font-bebas text-2xl text-brand-light tracking-widest">LOADING...</h2>
    </div>
  );
}