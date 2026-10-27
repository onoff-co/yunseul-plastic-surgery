import SiteLink from "../../components/shared/SiteLink.jsx";
import { useEffect, useRef, useState } from "react";
import PageLayout from "../../components/layout/PageLayout.jsx";
import BeforeAfterCompare from "../../components/shared/BeforeAfterCompare.jsx";
import ContentImage from "../../components/shared/ContentImage.jsx";
import { caseExamples } from "../../data/caseExamples.mjs";

const categories = ["전체", ...new Set(caseExamples.map(({ type }) => type))];

export default function Cases() {
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const visibleCases = caseExamples.filter(
    (item) => category === "전체" || item.type === category,
  );

  useEffect(() => {
    if (selected && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [selected]);

  const closeDialog = () => dialogRef.current?.close();

  return (
    <PageLayout title="이미지 비교">
      <div className="cases-page">
        <section className="cases-gallery" aria-labelledby="cases-gallery-title">
          <div className="cases-gallery-heading">
            <h2 id="cases-gallery-title">분야별 이미지</h2>
            <p role="status" aria-live="polite">
              {category === "전체" ? "전체" : category} {visibleCases.length}개 이미지
            </p>
          </div>
          <div className="cases-filters" role="group" aria-label="이미지 분야 필터">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="cases-grid">
            {visibleCases.map((item, index) => (
              <article className="cases-card" key={item.slug}>
                <button
                  className="cases-preview"
                  type="button"
                  aria-label={`${item.type} 이미지 크게 보기`}
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setSelected(item);
                  }}
                >
                  <ContentImage
                    src={item.image}
                    alt=""
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <span className="cases-preview-labels" aria-hidden="true">
                    <span>화면 A</span>
                    <span>화면 B</span>
                  </span>
                  <span className="cases-preview-action" aria-hidden="true">
                    크게 비교하기
                  </span>
                </button>
                <div className="cases-card-copy">
                  <p>{item.type}</p>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>

      <dialog
        className="cases-dialog"
        ref={dialogRef}
        aria-labelledby="cases-dialog-title"
        onClose={() => {
          setSelected(null);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {selected && (
          <div className="cases-dialog-content">
            <div className="cases-dialog-heading">
              <div>
                <p>{selected.type}</p>
                <h2 id="cases-dialog-title">{selected.title}</h2>
              </div>
              <button
                className="cases-dialog-close"
                type="button"
                aria-label="비교 이미지 닫기"
                onClick={closeDialog}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 5 19 19M19 5 5 19" />
                </svg>
              </button>
            </div>
            <div className="cases-dialog-body">
              <BeforeAfterCompare
                src={selected.image}
                title={selected.type}
                beforeLabel="화면 A"
                afterLabel="화면 B"
              />
              <div className="cases-dialog-details">
                <h3>상담에서 확인할 내용</h3>
                <p>{selected.detail}</p>
                <SiteLink
                  className="button button-dark"
                  href={
                    selected.procedureSlug
                      ? `/procedures/${selected.procedureSlug}`
                      : "/consultation"
                  }
                >
                  {selected.procedureSlug ? "시술 정보 보기" : "상담 준비"}
                </SiteLink>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </PageLayout>
  );
}
