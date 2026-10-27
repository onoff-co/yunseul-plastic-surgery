import { useRef } from "react";
import Accordion from "../../components/shared/Accordion.jsx";
import SiteFooter from "../../components/layout/SiteFooter.jsx";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import ConsultationForm from "../../components/shared/ConsultationForm.jsx";
import ContentImage from "../../components/shared/ContentImage.jsx";
import useActiveSection from "../../components/shared/useActiveSection.js";
import { procedures } from "../../data/procedures.mjs";
import { procedureDetails } from "../../data/procedureDetails.mjs";
import { procedureVisuals } from "../../data/procedureVisuals.mjs";
import { clinicalNotes } from "../../data/clinicalNotes.mjs";
import { procedureGuides } from "../../data/procedureGuides.mjs";

const sections = [
  ["overview", "진료 소개"],
  ["options", "세부 진료"],
  ["planning", "상담과 계획"],
  ["recovery", "회복·사후관리"],
  ["safety", "주의사항"],
  ["prices", "비용 확인"],
  ["questions", "자주 묻는 질문"],
];
const priceItems = [
  ["진료·검사", "초진 상담, 수술 전 검사와 추가 검사 비용"],
  ["수술·마취", "시술 범위, 마취 방법과 관련 비용"],
  ["약제·사후관리", "처방약, 경과 확인, 추가 관리의 포함 범위"],
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

export default function ProcedureDetail({ slug }) {
  const procedure =
    procedures.find((item) => item.slug === slug) ?? procedures[0];
  const detail = procedureDetails[procedure.slug];
  const visual = procedureVisuals[procedure.slug];
  const notes = clinicalNotes[procedure.slug];
  const guide = procedureGuides[procedure.slug];
  const bookingUrl = `/consultation?procedure=${procedure.slug}`;
  const activeSection = useActiveSection(sections.map(([id]) => id));
  const criteriaDialogRef = useRef(null);
  const criteriaTriggerRef = useRef(null);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pd">
        <section className="pd-hero" aria-labelledby="treatment-title">
          <div className="pd-hero-copy">
            <nav className="pd-breadcrumbs" aria-label="현재 위치">
              <a href="/">홈</a>
              <span aria-hidden="true">/</span>
              <a href="/procedures">시술 안내</a>
              <span aria-hidden="true">/</span>
              <strong aria-current="page">{procedure.name}</strong>
            </nav>
            <h1 id="treatment-title">{procedure.name}</h1>
            <p className="pd-hero-detail">{procedure.detail}</p>
            <p className="pd-hero-lead">{procedure.summary}</p>
            <div className="pd-hero-actions">
              <a className="ys-button" href={bookingUrl}>
                {procedure.name} 상담 준비
              </a>
              <button
                className="pd-text-button"
                type="button"
                ref={criteriaTriggerRef}
                onClick={() => criteriaDialogRef.current?.showModal()}
              >
                상담 기준 확인
              </button>
            </div>
          </div>
          <figure className="pd-hero-media">
            <ContentImage
              src={`/assets/images/${visual.image}`}
              alt={`${procedure.name} 분야 이미지`}
              fetchPriority="high"
            />
            <figcaption>AI 생성 이미지 · 실제 환자가 아닙니다</figcaption>
          </figure>
        </section>
        <dialog
          className="treatment-criteria-dialog"
          ref={criteriaDialogRef}
          aria-labelledby="criteria-dialog-title"
          onClose={() => criteriaTriggerRef.current?.focus({ preventScroll: true })}
          onClick={(event) => {
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
        >
          <div className="treatment-criteria-dialog-content">
            <div className="treatment-criteria-dialog-heading">
              <h2 id="criteria-dialog-title">{procedure.name} 상담 기준</h2>
              <button
                className="treatment-criteria-dialog-close"
                type="button"
                aria-label="상담 기준 닫기"
                onClick={() => criteriaDialogRef.current?.close()}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 5 19 19M19 5 5 19" />
                </svg>
              </button>
            </div>
            <p>상담에서 현재 상태와 원하는 변화를 함께 확인할 항목입니다.</p>
            <div className="treatment-criteria-dialog-topics">
              {detail.topics.map(([title, body]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <p className="treatment-criteria-dialog-note">
              이 항목만으로 시술 여부나 방법을 결정할 수 없습니다. 진료에서
              개인의 상태를 확인한 뒤 안내받아 주세요.
            </p>
            <a className="button button-dark" href={bookingUrl}>
              {procedure.name} 상담 준비
            </a>
          </div>
        </dialog>
        <nav className="pd-switcher" aria-label="관련 진료 안내">
          {procedures.map((item) => (
            <a
              key={item.slug}
              href={`/procedures/${item.slug}`}
              aria-current={item.slug === procedure.slug ? "page" : undefined}
            >
              <strong>{item.name}</strong>
              <span>{item.detail}</span>
            </a>
          ))}
        </nav>
        <div className="pd-body">
          <aside className="pd-outline">
            <nav aria-label="상세페이지 목차">
              {sections.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
            <a className="ys-button pd-outline-booking" href={bookingUrl}>
              이 분야 상담 준비
            </a>
          </aside>
          <div className="pd-content">
            <section className="pd-section" id="overview" aria-labelledby="overview-title">
              <h2 id="overview-title">{visual.focus}</h2>
              <p className="pd-lead">{detail.intro}</p>
              <ul className="pd-points">
                {procedure.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="pd-concerns">
                <h3>상담에서 이야기할 고민</h3>
                <ul>
                  {detail.concerns.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="pd-note">
                  아래 항목은 수술 적합성에 대한 진단이 아닙니다.
                </p>
              </div>
            </section>

            <section className="pd-section" id="options" aria-labelledby="options-title">
              <div className="pd-section-head">
                <h2 id="options-title">{guide.heading}</h2>
                <p>고민의 원인과 가능한 방법을 구분해 살펴보세요.</p>
              </div>
              <figure className="pd-guide-figure">
                <img src={guide.image} alt={guide.imageAlt} loading="lazy" />
                <figcaption>
                  <strong>{guide.imageHeading}</strong>
                  <span>{guide.imageCopy}</span>
                </figcaption>
              </figure>
              <div className="pd-options">
                {guide.items.map((item, index) => (
                  <article key={item.name}>
                    <span className="pd-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.summary}</p>
                    <dl>
                      <div>
                        <dt>확인할 내용</dt>
                        <dd>{item.check}</dd>
                      </div>
                      <div>
                        <dt>방법을 정할 때</dt>
                        <dd>{item.approach}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <section className="pd-section" id="planning" aria-labelledby="planning-title">
              <h2 id="planning-title">나에게 맞는 계획의 기준</h2>
              <div className="pd-criteria">
                {detail.topics.map(([title, body]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
              <h3 className="pd-subtitle">상담부터 경과 확인까지</h3>
              <ol className="pd-steps">
                {guide.flow.map(([title, body], index) => (
                  <li key={title}>
                    <span className="pd-step-number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="pd-section pd-section-dark" id="recovery" aria-labelledby="recovery-title">
              <h2 id="recovery-title">회복과 사후관리</h2>
              <p className="pd-lead">{detail.recovery}</p>
              <dl className="pd-recovery">
                <div>
                  <dt>예상 회복</dt>
                  <dd>{notes.recoveryPeriod}</dd>
                </div>
                <div>
                  <dt>일상에서의 관리</dt>
                  <dd>{notes.aftercare}</dd>
                </div>
              </dl>
              <p className="pd-note">
                회복 일정과 경과에는 개인차가 있습니다. 일상 복귀 시점은
                의료진과 확인해 주세요.
              </p>
            </section>

            <section className="pd-section" id="safety" aria-labelledby="safety-title">
              <h2 id="safety-title">결정 전에 확인할 내용</h2>
              <dl className="pd-safety">
                <div>
                  <dt>마취 방법</dt>
                  <dd>{notes.anesthesia}</dd>
                </div>
                <div>
                  <dt>주의사항</dt>
                  <dd>{notes.precautions}</dd>
                </div>
                <div>
                  <dt>부작용과 한계</dt>
                  <dd>{notes.limitations}</dd>
                </div>
              </dl>
              <a className="ys-link" href="/about#facility-equipment-title">
                장비와 안전 관리 확인
              </a>
            </section>

            <section className="pd-section" id="prices" aria-labelledby="prices-title">
              <div className="pd-section-head">
                <h2 id="prices-title">비용에 포함되는 항목을 확인하세요</h2>
                <p>
                  방법과 범위, 필요한 검사와 마취에 따라 비용이 달라질 수
                  있습니다. 상담에서 다음 항목의 포함 여부를 확인해 주세요.
                </p>
              </div>
              <ul className="pd-price-list">
                {priceItems.map(([title, body]) => (
                  <li key={title}>
                    <CheckIcon />
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </li>
                ))}
              </ul>
              <a className="ys-link" href="/pricing">
                비용 안내 자세히 보기
              </a>
            </section>

            <section className="pd-section" id="questions" aria-labelledby="questions-title">
              <h2 id="questions-title">{procedure.name}, 자주 묻는 질문</h2>
              <Accordion items={detail.faq} />
              <div className="pd-related">
                <a href="/doctors">의료진 정보</a>
                <a href="/cases">비교 이미지 안내</a>
                <a href="/faq">전체 FAQ</a>
              </div>
            </section>
          </div>
        </div>
        <section className="pd-consultation" aria-labelledby="detail-consultation-title">
          <div className="pd-consultation-copy">
            <h2 id="detail-consultation-title">{procedure.name} 상담 준비</h2>
            <p>
              현재 상태와 원하는 방향을 남겨 주세요. 상담에서 확인할 내용을
              정리해 드립니다.
            </p>
            <p className="pd-note">
              입력 내용은 전송·저장되지 않으며 예약도 접수되지 않습니다.
            </p>
            <a className="ys-link" href="/procedures">
              전체 시술 안내
            </a>
          </div>
          <ConsultationForm initialProcedure={procedure.slug} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
