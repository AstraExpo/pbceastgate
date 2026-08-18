import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute("/_merch")({
  component: MerchLayout,
});

function MerchLayout() {

  return (
    <>
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
        {/* Merchandise Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-6">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-4">Categories</h2>
          <nav className="flex md:flex-col gap-2 text-sm">
            <span className="cursor-pointer hover:underline">All Products</span>
            <span className="cursor-pointer hover:underline">Apparel</span>
            <span className="cursor-pointer hover:underline">Accessories</span>
          </nav>
        </aside>
        
        {/* Product Catalog Grid Container */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}