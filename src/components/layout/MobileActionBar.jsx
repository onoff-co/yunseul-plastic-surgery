import SiteLink from "../shared/SiteLink.jsx";
export default function MobileActionBar() {
  return (
    <nav className="ys-mobile-actions" aria-label="빠른 상담 메뉴">
      <SiteLink href="/procedures">시술 안내</SiteLink>
      <SiteLink href="/location">방문 안내</SiteLink>
      <SiteLink href="/consultation">상담 준비</SiteLink>
    </nav>
  );
}
