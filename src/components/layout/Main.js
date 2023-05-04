export default function Main({ children }) {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="max-w-2xl w-full">{children}</div>
    </main>
  );
}
