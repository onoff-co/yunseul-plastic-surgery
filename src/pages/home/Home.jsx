import SiteLink from "../../components/shared/SiteLink.jsx";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SiteFooter from "../../components/layout/SiteFooter.jsx";
import HeroSection from "../../components/home/HeroSection.jsx";
import ProcedurePreview from "../../components/home/ProcedurePreview.jsx";
import BeforeAfterGallery from "../../components/home/BeforeAfterGallery.jsx";
import MediaJournal from "../../components/home/MediaJournal.jsx";
import ClinicExperience from "../../components/home/ClinicExperience.jsx";
import useSectionReveal from "../../components/home/useSectionReveal.js";
import Accordion from "../../components/shared/Accordion.jsx";
import { faq } from "../../data/faq.mjs";
import { procedures } from "../../data/procedures.mjs";
import { pageImages } from "../../data/pageImages.mjs";
import ContentImage from "../../components/shared/ContentImage.jsx";

export default function Home() {
  const mainRef = useSectionReveal();
  return (
    <>
      <SiteHeader />
      <main ref={mainRef} id="main-content" className="ys-home">
        <HeroSection />
        <nav className="ys-quick-links" aria-label="주요 진료 바로가기">
          <div className="ys-container">
            {procedures.map((item) => (
              <SiteLink key={item.slug} href={`/procedures/${item.slug}`}>
                <strong>{item.name}</strong>
                <small>{item.detail}</small>
              </SiteLink>
            ))}
            <SiteLink href="/consultation">
              <strong>상담 준비</strong>
              <small>궁금한 점부터 편안하게</small>
            </SiteLink>
          </div>
        </nav>
        <ProcedurePreview />
        <BeforeAfterGallery />
        <MediaJournal />
        <ClinicExperience />
        <section
          className="ys-care ys-container ys-section"
          aria-label="의료진과 진료 과정"
        >
          <SiteLink className="ys-care-feature" href="/procedures">
            <ContentImage
              src={pageImages.home.care}
              alt="상담 공간 이미지"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <div>
              <h2>진료 분야를 먼저 확인하세요.</h2>
              <p>관심 분야의 상담 기준과 주의사항을 살펴보세요.</p>
              <strong className="ys-link">시술 안내</strong>
            </div>
          </SiteLink>
          <div className="ys-care-process">
            <h2>결정 전부터 회복 후까지</h2>
            <ol>
              <li>
                <h3>고민을 충분히 듣습니다</h3>
                <p>
                  원하는 변화와 이전 시술 경험, 생활 일정을 함께 확인합니다.
                </p>
              </li>
              <li>
                <h3>선택지를 설명합니다</h3>
                <p>방법과 비용, 예상되는 한계와 주의사항을 비교합니다.</p>
              </li>
              <li>
                <h3>회복 계획을 안내합니다</h3>
                <p>일상 복귀와 경과 확인 일정까지 상담에 포함합니다.</p>
              </li>
            </ol>
            <SiteLink className="ys-link" href="/about">
              진료 과정 알아보기
            </SiteLink>
          </div>
        </section>
        <section
          className="ys-faq-section ys-section"
          aria-labelledby="ys-faq-title"
        >
          <div className="ys-container ys-faq-layout">
            <div>
              <h2 id="ys-faq-title">상담이 처음이라면</h2>
              <p>방문 전에 자주 궁금해하시는 내용을 모았습니다.</p>
              <SiteLink className="ys-link" href="/faq">
                질문 전체 보기
              </SiteLink>
            </div>
            <Accordion items={faq.slice(0, 4)} />
          </div>
        </section>
        <section
          className="ys-visit ys-container ys-section"
          aria-labelledby="ys-visit-title"
        >
          <div className="ys-visit-intro">
            <h2 id="ys-visit-title">편안하게 물어보세요.</h2>
            <p>원하는 진료 분야를 남겨 상담을 준비하세요.</p>
            <SiteLink className="ys-button" href="/consultation">
              상담 준비
            </SiteLink>
            <SiteLink className="ys-link" href="/pricing">
              비용 안내
            </SiteLink>
          </div>
          <div className="ys-hours">
            <h3>상담 전 확인</h3>
            <p>관심 분야와 궁금한 점을 정리해 주세요.</p>
            <small>온라인 입력만으로 예약이 확정되지 않습니다.</small>
          </div>
          <div className="ys-address">
            <h3>방문 안내</h3>
            <p>주소와 진료시간은 현재 안내되지 않습니다.</p>
            <SiteLink className="ys-link" href="/location">
              방문 전 확인 사항
            </SiteLink>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
