import SiteLink from "../shared/SiteLink.jsx";
import SiteHeader from "./SiteHeader.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { pageRoutes } from "../../app/routes.mjs";
import { fromSitePath } from "../../app/paths.mjs";

export default function PageLayout({ title, description, children }) {
  const path = fromSitePath(window.location.pathname).replace(/\/$/, "") || "/";
  const route = pageRoutes[path];
  const pageTitle = route?.title || title;
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="page-shell interior-page">
        <header className="ys-subhead">
          <div className="ys-subhead-title">
            <nav className="ys-subhead-breadcrumbs" aria-label="현재 위치">
              <SiteLink href="/">홈</SiteLink>
              <span aria-hidden="true">/</span>
              <strong aria-current="page">{pageTitle}</strong>
            </nav>
            <h1>{pageTitle}</h1>
            {description && <p>{description}</p>}
          </div>
          {route?.english && (
            <p className="ys-subhead-english" aria-hidden="true">
              <small>Yunseul Plastic Surgery</small>
              <span>{route.english}</span>
            </p>
          )}
        </header>
        <div className="interior-content">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
