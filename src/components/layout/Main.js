export default function Main({ children }) {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="p-4 pt-14 lg:p-0 max-w-2xl w-full lg:pt-10 mb-40">
        {children}
      </div>
    </main>
  );
}
