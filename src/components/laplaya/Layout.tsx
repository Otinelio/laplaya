import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="min-h-screen">{children}</div>
      </PageTransition>
      <Footer />
    </>
  );
}