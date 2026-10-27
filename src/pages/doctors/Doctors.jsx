import PageLayout from "../../components/layout/PageLayout.jsx";

export default function Doctors() {
  return (
    <PageLayout title="의료진">
      <section className="ys-interior-intro">
        <h2>의료진 정보</h2>
        <div>
          <p>현재 공개된 의료진의 이름·자격·경력 정보가 없습니다.</p>
          <p>의료진 정보는 실제 자격과 진료 분야를 확인할 수 있을 때 게시합니다.</p>
        </div>
      </section>
      <section className="ys-interior-intro">
        <h2>상담에서 함께 확인하는 것</h2>
        <div>
          <p>
            이전 시술 경험과 현재 고민을 편안하게 알려주세요. 개인의 상태와 생활
            습관을 살펴 진료 계획과 회복 일정을 함께 정리합니다.
          </p>
          <a className="ys-link" href="/procedures">
            진료 분야 살펴보기
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
