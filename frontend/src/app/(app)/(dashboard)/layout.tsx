export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="bg-card w-64 border-r" />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
