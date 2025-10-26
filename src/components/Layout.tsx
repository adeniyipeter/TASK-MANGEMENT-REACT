import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} TicketFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
