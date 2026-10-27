import { site } from "../../data/site.mjs";

export default function SiteFooter() {
  return (
    <footer className="ys-footer">
      <div className="ys-container ys-footer-top">
        <a className="ys-footer-brand" href="/" aria-label="윤슬성형외과 홈">
          <img
            src="/assets/images/logo/ysps-logo-monochrome.png"
            alt="윤슬성형외과 YSPS"
            width="1983"
            height="793"
          />
        </a>
        <nav aria-label="하단 메뉴">
          <a href="/about">병원 소개</a>
          <a href="/doctors">의료진</a>
          <a href="/location">방문 안내</a>
          <a href="/notices">공지·이벤트</a>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
        </nav>
      </div>
      <div className="ys-container ys-footer-bottom">
        <div>
          <p>{site.name}</p>
          <p>© {new Date().getFullYear()} Yunseul Plastic Surgery</p>
        </div>
      </div>
    </footer>
  );
}
