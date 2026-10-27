import { useState } from "react";
import { procedures } from "../../data/procedures.mjs";
import { pageImages } from "../../data/pageImages.mjs";
import BeforeAfterCompare from "../shared/BeforeAfterCompare.jsx";

export default function BeforeAfterGallery() {
  const [selected, setSelected] = useState("eye");
  const current = procedures.find((item) => item.slug === selected);
  return (
    <section
      className="ys-case-section ys-section"
      id="cases"
      aria-labelledby="ys-cases-title"
    >
      <div className="ys-container">
        <div className="ys-section-head">
          <div>
            <h2 id="ys-cases-title">변화를 살피는 기준</h2>
            <p>정면과 측면 이미지를 비교하며 진료 항목을 살펴보세요.</p>
          </div>
          <a className="ys-link" href="/cases">
            비교 이미지 보기
          </a>
        </div>
        <div
          className="ys-case-filters"
          role="group"
          aria-label="비교 이미지 분야 선택"
        >
          {procedures.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={selected === item.slug}
              aria-controls="ys-case-preview"
              onClick={() => setSelected(item.slug)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div
          className="ys-case-preview"
          id="ys-case-preview"
          aria-live="polite"
          aria-atomic="true"
        >
          <figure>
            <BeforeAfterCompare
              key={selected}
              src={pageImages.home.cases[selected]}
              title={`${current.name} 촬영 각도`}
              beforeLabel="정면"
              afterLabel="측면"
            />
          </figure>
          <div>
            <h3>{current.name}</h3>
            <p>{current.description}</p>
            <dl>
              <div>
                <dt>상담 항목</dt>
                <dd>{current.detail}</dd>
              </div>
              <div>
                <dt>확인할 내용</dt>
                <dd>
                  방법, 회복 일정,{" "}
                  <span className="text-phrase">부작용과 한계</span>
                </dd>
              </div>
            </dl>
            <a
              className="ys-button ys-button-light"
              href={`/procedures/${selected}`}
            >
              시술 정보 확인
            </a>
            <a className="ys-link" href={`/consultation?procedure=${selected}`}>
              이 분야 상담 준비
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
