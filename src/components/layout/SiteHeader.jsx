import { useEffect, useRef, useState } from "react";
import { navigation } from "../../data/site.mjs";
import { procedures } from "../../data/procedures.mjs";
import MobileActionBar from "./MobileActionBar.jsx";

const submenus = {
  "/about": [
    { label: "병원 소개", href: "/about" },
    { label: "공간과 장비", href: "/about#facility-space-title" },
    { label: "방문 안내", href: "/location" },
  ],
  "/procedures": procedures.map((item) => ({
    label: item.name,
    href: `/procedures/${item.slug}`,
  })),
  "/doctors": [
    { label: "의료진 소개", href: "/doctors" },
    { label: "상담 준비", href: "/consultation" },
  ],
  "/cases": [
    { label: "분야별 이미지", href: "/cases" },
  ],
  "/reviews": [
    { label: "상담 후기", href: "/reviews" },
    { label: "자주 묻는 질문", href: "/faq" },
  ],
  "/consultation": [
    { label: "상담 준비", href: "/consultation" },
    { label: "비용 안내", href: "/pricing" },
    { label: "방문 안내", href: "/location" },
  ],
};

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef(null);
  const toggleRef = useRef(null);
  const path = window.location.pathname.replace(/\/$/, "");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 24);
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveMenu(null);
        if (isOpen) toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnResize = () => {
      setIsOpen(false);
      setActiveMenu(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnResize);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnResize);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`ys-header${isScrolled ? " ys-header--scrolled" : ""}${isOpen || activeMenu ? " ys-header--expanded" : ""}`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="ys-header-inner">
          <a className="ys-brand" href="/" aria-label="윤슬성형외과 홈">
            <img
              src="/assets/images/logo/ysps-logo-monochrome.png"
              alt="윤슬성형외과 YSPS"
              width="1983"
              height="793"
            />
          </a>
          <nav
            className="ys-desktop-nav"
            aria-label="주요 메뉴"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setActiveMenu(null);
            }}
          >
            {navigation.map((item) => (
              <div
                className="ys-nav-group"
                key={item.href}
                onMouseEnter={() => setActiveMenu(item.href)}
                onFocus={(event) => {
                  if (event.target.tagName === "A") setActiveMenu(item.href);
                }}
              >
                <div className="ys-nav-label">
                  <a
                    href={item.href}
                    aria-current={
                      path === item.href || path.startsWith(`${item.href}/`)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </a>
                  <button
                    type="button"
                    aria-label={`${item.label} 하위 메뉴`}
                    aria-expanded={activeMenu === item.href}
                    aria-controls={`nav-${item.href.slice(1)}`}
                    onClick={() =>
                      setActiveMenu(activeMenu === item.href ? null : item.href)
                    }
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="m4 6 4 4 4-4" />
                    </svg>
                  </button>
                </div>
                <div
                  className="ys-submenu"
                  id={`nav-${item.href.slice(1)}`}
                  hidden={activeMenu !== item.href}
                >
                  {submenus[item.href].map((link) => (
                    <a href={link.href} key={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <a className="ys-header-booking" href="/consultation">
            상담 준비
          </a>
          <button
            ref={toggleRef}
            className="ys-menu-toggle"
            type="button"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            aria-controls="ys-mobile-nav"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {isOpen ? (
                <path d="m5 5 14 14M19 5 5 19" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
        <nav
          id="ys-mobile-nav"
          className="ys-mobile-nav"
          aria-label="모바일 메뉴"
          hidden={!isOpen}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="ys-mobile-extra">
            <a href="/location">방문 안내</a>
            <a href="/faq">FAQ</a>
            <a href="/pricing">비용 안내</a>
          </div>
        </nav>
        <div
          ref={progressRef}
          className="ys-reading-progress"
          aria-hidden="true"
        />
      </header>
      {isOpen && (
        <button
          className="ys-menu-backdrop"
          aria-label="메뉴 닫기"
          onClick={() => setIsOpen(false)}
          tabIndex={-1}
        />
      )}
      <MobileActionBar />
    </>
  );
}
