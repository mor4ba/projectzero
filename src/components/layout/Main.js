export default function Main({ children }) {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="max-w-2xl w-full pt-10">{children}</div>
    </main>
  );
}
