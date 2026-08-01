import { ReactNode } from "react";
import { MOCK_NAV_TREE, MOCK_USER_PROFILE, mockFooterData } from "./mock.data";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header
        isAuthenticated={true}
        navTree={MOCK_NAV_TREE}
        userProfile={MOCK_USER_PROFILE}
      />
      {children}
      <Footer isLoading={false} data={mockFooterData} />
    </>
  );
}
