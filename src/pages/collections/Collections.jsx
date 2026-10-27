import PageLayout from "../../components/layout/PageLayout.jsx";
import Accordion from "../../components/shared/Accordion.jsx";
import { faq } from "../../data/faq.mjs";

const pageMeta = {
  reviews: [
    "후기",
    "동의를 받은 후기를 확인할 수 있습니다.",
  ],
  pricing: [
    "비용 안내",
    "비용에 포함되는 항목과 개인별 차이가 발생하는 이유를 먼저 설명합니다.",
  ],
  notices: [
    "공지사항·이벤트",
    "진료 일정과 공지사항을 확인하세요.",
  ],
  faq: [
    "자주 묻는 질문",
    "상담·예약부터 회복과 사후관리까지 자주 묻는 내용을 정리했습니다.",
  ],
  privacy: [
    "개인정보처리방침",
    "온라인 입력 정보의 처리 방식을 안내합니다.",
  ],
  terms: ["이용약관", "사이트 이용 안내입니다."],
};

export default function Collections({ kind }) {
  const meta = pageMeta[kind];

  return (
    <PageLayout title={meta[0]} description={meta[1]}>
      {kind === "reviews" && (
        <section className="review-list" aria-label="후기 안내">
          <h2>후기 안내</h2>
          <p>현재 공개된 후기가 없습니다.</p>
          <p>사진과 개인 정보가 포함된 후기는 작성자의 동의를 확인한 뒤 게시합니다.</p>
        </section>
      )}
      {kind === "pricing" && (
        <div className="pricing-list">
          <article>
            <div>
              <h2>비용 확인 항목</h2>
              <p>진료·검사, 시술·마취, 약제와 사후관리의 포함 범위를 확인해 주세요.</p>
            </div>
          </article>
          <article>
            <div>
              <h2>개인별 차이</h2>
              <p>방법과 범위, 필요한 검사에 따라 비용이 달라질 수 있습니다.</p>
            </div>
          </article>
          <p className="collection-disclosure">
            현재 게시된 시술별 비용은 없습니다. 구체적인 금액과 추가 비용의
            가능성은 진료 후 확인해야 합니다.
          </p>
        </div>
      )}
      {kind === "notices" && (
        <div className="notice-list">
          <p>현재 등록된 공지사항이나 이벤트가 없습니다.</p>
        </div>
      )}
      {kind === "faq" && (
        <div className="faq-page">
          <Accordion items={faq} />
          <a className="button button-primary" href="/consultation">
            상담 준비하기
          </a>
        </div>
      )}
      {kind === "privacy" && (
        <section className="policy-copy">
          <h2>온라인 입력 정보</h2>
          <p>
            상담 양식에 입력한 이름·연락처·관심 분야·문의 내용은 이 브라우저에서만
            입력 오류를 확인하는 데 사용됩니다. 서버로 전송하거나 저장하지 않습니다.
          </p>
          <h2>예약 접수</h2>
          <p>
            양식을 작성해도 예약이 접수되거나 확정되지 않습니다. 민감한 의료
            정보는 입력하지 마세요.
          </p>
        </section>
      )}
      {kind === "terms" && (
        <section className="policy-copy">
          <h2>사이트 이용</h2>
          <p>
            시술 안내는 일반 정보입니다. 시술 가능 여부와 구체적인 계획은 개인의
            상태를 확인한 뒤 판단해야 합니다.
          </p>
          <h2>온라인 양식</h2>
          <p>
            이 사이트의 양식은 입력 내용을 확인하는 기능만 제공합니다. 입력한
            정보는 전송·저장되지 않으며 예약이 완료되지 않습니다.
          </p>
        </section>
      )}
    </PageLayout>
  );
}
