import SiteLink from "../../components/shared/SiteLink.jsx";
import PageLayout from "../../components/layout/PageLayout.jsx";
import ConsultationForm from "../../components/shared/ConsultationForm.jsx";
import Accordion from "../../components/shared/Accordion.jsx";
import { faq } from "../../data/faq.mjs";
import { pageImages } from "../../data/pageImages.mjs";
import ContentImage from "../../components/shared/ContentImage.jsx";

export default function Consultation() {
  return (
    <PageLayout title="상담 준비">
      <section className="ys-booking-layout" aria-label="온라인 상담 양식">
        <div className="ys-booking-aside">
          <ContentImage
            src={pageImages.consultation}
            alt="상담 서류와 두 좌석이 놓인 공간"
            width="1672"
            height="940"
          />
          <div>
            <h2>궁금한 점부터 편안하게 남겨주세요.</h2>
            <p>관심 진료와 원하는 변화를 정리해 상담을 준비하세요.</p>
            <SiteLink className="ys-link" href="/location">
              방문 안내 확인
            </SiteLink>
          </div>
        </div>
        <ConsultationForm />
      </section>
      <section className="ys-booking-faq">
        <h2>상담 전에 확인하세요</h2>
        <Accordion items={faq.slice(0, 4)} />
      </section>
    </PageLayout>
  );
}
