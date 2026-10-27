import SiteLink from "../../components/shared/SiteLink.jsx";
import PageLayout from "../../components/layout/PageLayout.jsx";
import { EquipmentGallery } from "../../components/shared/FacilityGallery.jsx";
import { pageImages } from "../../data/pageImages.mjs";
import ContentImage from "../../components/shared/ContentImage.jsx";

const careProcess = [
  [
    "상담과 상태 확인",
    "원하는 변화, 과거 시술 경험과 현재 건강 상태를 함께 확인합니다.",
  ],
  [
    "개인별 계획 설명",
    "가능한 방법과 대안, 비용에 포함되는 항목과 예상되는 한계를 안내합니다.",
  ],
  [
    "진료 전 준비",
    "마취와 준비사항, 시술 후 확인해야 할 내용을 미리 설명합니다.",
  ],
  [
    "회복과 경과 확인",
    "귀가 후 주의사항과 일상 복귀, 경과 확인 일정을 함께 계획합니다.",
  ],
];

export default function About() {
  return (
    <PageLayout title="병원 소개">
      <figure className="ys-interior-photo">
        <ContentImage
          src={pageImages.about.reception}
          alt="접수 및 대기 공간 이미지"
          width="1672"
          height="940"
          fetchPriority="high"
        />
      </figure>
      <section className="ys-interior-intro">
        <h2>상담의 시작은 충분히 듣는 일입니다.</h2>
        <div>
          <p>
            원하는 변화와 걱정되는 점을 먼저 듣습니다. 얼굴의 비율과 표정, 생활
            일정을 살펴 개인에게 필요한 선택지를 정리합니다.
          </p>
          <p>
            방법과 회복 과정, 예상되는 부작용과 한계까지 이해하고 결정할 수
            있도록 설명합니다.
          </p>
          <SiteLink className="ys-link" href="/procedures">
            진료 분야 살펴보기
          </SiteLink>
        </div>
      </section>
      <SiteLink className="ys-link" href="/#ys-space-title" id="facility-space-title">
        상담실·시술 준비실·회복실 미리보기
      </SiteLink>
      <section
        className="ys-process-section"
        aria-labelledby="ys-process-title"
      >
        <h2 id="ys-process-title">상담부터 회복까지</h2>
        <ol>
          {careProcess.map(([title, body]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>
      <EquipmentGallery />
      <div className="ys-interior-closing">
        <SiteLink className="ys-button" href="/consultation">
          상담 준비
        </SiteLink>
        <SiteLink className="ys-link" href="/location">
          방문 안내
        </SiteLink>
      </div>
    </PageLayout>
  );
}
