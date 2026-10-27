import SiteLink from "../shared/SiteLink.jsx";

const items = [
  ["/consultation", "상담 준비", "M5 5h14v10H9l-4 4z"],
  ["/pricing", "비용 안내", "M5 7h14v10H5zM5 10h14M8 14h3"],
  ["/location", "방문 안내", "M12 20s6-5.5 6-10a6 6 0 0 0-12 0c0 4.5 6 10 6 10zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  ["/faq", "FAQ", "M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 16.5v.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"],
];

// 확인된 전화번호·메신저 채널이 없으므로 사이트 안의 안내 페이지로만 연결한다.
export default function QuickMenu() {
  return (
    <nav className="ys-quick-menu" aria-label="퀵메뉴">
      {items.map(([href, label, path]) => (
        <SiteLink key={href} href={href}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} />
          </svg>
          <span>{label}</span>
        </SiteLink>
      ))}
      <button type="button" onClick={() => window.scrollTo({ top: 0 })}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 14l6-6 6 6" />
        </svg>
        <span>TOP</span>
      </button>
    </nav>
  );
}
