import ContentSections from "../../components/shared/ContentSections.jsx";
import { pageContent } from "../../data/pageContent.mjs";
import PageLayout from "../../components/layout/PageLayout.jsx";
import { procedures } from "../../data/procedures.mjs";
import { procedureVisuals } from "../../data/procedureVisuals.mjs";
import ContentImage from "../../components/shared/ContentImage.jsx";
import PointerCard from "../../components/shared/PointerCard.jsx";

export default function Procedures() {
  return (
    <PageLayout
      title="나에게 필요한 변화 찾기"
      description="눈, 코, 얼굴의 윤곽과 탄력까지. 각 분야의 상담 기준을 확인해 보세요."
    >
      <div className="procedure-directory portrait-directory">
        {procedures.map((item) => (
          <PointerCard key={item.slug}>
            <a
              href={`/procedures/${item.slug}`}
              className="directory-portrait"
              aria-label={`${item.name} 이미지와 상세 안내`}
            >
              <ContentImage
                src={`/assets/images/${procedureVisuals[item.slug].directoryImage}`}
                loading="lazy"
                alt={`${item.name} 분야 이미지`}
              />
            </a>
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p className="directory-meta">{item.detail}</p>
            </div>
            <a
              className="text-link"
              href={`/procedures/${item.slug}`}
              aria-label={`${item.name} 상세 보기`}
            >
              상세 보기
            </a>
          </PointerCard>
        ))}
      </div>
      <section className="interior-story">
        <h2>결정 전에 충분히 이해합니다.</h2>
        <div>
          <p>
            상세페이지에서 분야별 상담 항목을 확인할 수 있습니다. 구체적인
            방법과 회복 계획은 진료 후 개인의 상태에 맞춰 안내드립니다.
          </p>
          <a className="button button-primary" href="/consultation">
            상담 준비
          </a>
        </div>
      </section>
      <ContentSections
        title="시술을 고르기 전, 상담의 흐름"
        items={pageContent.consultation}
      />
      <p className="medical-note">
        각 분야의 안내는 상담을 돕기 위한 일반 정보입니다. 시술 가능 여부와
        구체적인 방법은 진료 후 결정됩니다.
      </p>
    </PageLayout>
  );
}
