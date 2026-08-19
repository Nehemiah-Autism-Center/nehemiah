import { CharityHeader } from '@/shared/components/layout/CharityHeader';
import { CharityFooter } from '@/shared/components/layout/CharityFooter';
import BackToTop from '@/shared/components/common/BackToTop';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CharityHeader />
      <main>{children}</main>
      <CharityFooter />
      <BackToTop />
    </>
  );
}
