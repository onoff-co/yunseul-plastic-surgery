export default function TrustPoints() {
  const points = [
    ["충분히 듣기", "상담의 첫 순서는 설명이 아니라 경청입니다."],
    ["필요한 만큼만", "가능한 변화와 필요한 변화를 구분합니다."],
    ["끝까지 함께", "수술 후 회복 과정까지 계획에 포함합니다."],
  ];
  return (
    <section className="trust-section" id="about">
      <div className="trust-intro">
        <p className="section-kicker">01 / CLINIC</p>
        <h2>윤슬이 생각하는 진료</h2>
      </div>
      <div className="trust-points">
        {points.map(([title, body]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <a className="text-link" href="/about">윤슬의 진료 철학 알아보기</a>
    </section>
  );
}
