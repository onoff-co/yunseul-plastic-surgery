import SiteLink from "../shared/SiteLink.jsx";
import { site } from "../../data/site.mjs";
import { toSiteUrl } from "../../app/paths.mjs";

export default function SiteFooter() {
  return (
    <footer className="ys-footer">
      <div className="ys-container ys-footer-top">
        <SiteLink className="ys-footer-brand" href="/" aria-label="윤슬성형외과 홈">
          <img
            src={toSiteUrl("/assets/images/logo/ysps-logo-monochrome.png")}
            alt="윤슬성형외과 YSPS"
            width="1983"
            height="793"
          />
        </SiteLink>
        <nav aria-label="하단 메뉴">
          <SiteLink href="/about">병원 소개</SiteLink>
          <SiteLink href="/doctors">의료진</SiteLink>
          <SiteLink href="/location">방문 안내</SiteLink>
          <SiteLink href="/notices">공지·이벤트</SiteLink>
          <SiteLink href="/privacy">개인정보처리방침</SiteLink>
          <SiteLink href="/terms">이용약관</SiteLink>
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
