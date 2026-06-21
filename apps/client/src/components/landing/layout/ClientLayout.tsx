import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MOCK_NAV_TREE, MOCK_USER_PROFILE } from "./mock.data";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header
        isAuthenticated={true}
        navTree={MOCK_NAV_TREE}
        userProfile={MOCK_USER_PROFILE}
      />
      {children}
      <Footer
        isAuthenticated={true}
        navTree={MOCK_NAV_TREE}
        userProfile={MOCK_USER_PROFILE}
      />
    </>
  );
}
