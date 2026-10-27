import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { pageRoutes } from "../../app/routes.mjs";

export default function PageLayout({ title, children }) {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const pageTitle = pageRoutes[path]?.title || title;
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-shell interior-page">
        <h1 className="ys-visually-hidden">{pageTitle}</h1>
        <nav className="ys-page-navigation" aria-label="현재 위치">
          <a href="/">홈</a>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="m6 3 5 5-5 5" />
          </svg>
          <strong aria-current="page">{pageTitle}</strong>
        </nav>
        <div className="interior-content">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
