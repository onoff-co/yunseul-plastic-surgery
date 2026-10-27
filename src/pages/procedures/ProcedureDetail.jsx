import SiteLink from "../../components/shared/SiteLink.jsx";
import Accordion from "../../components/shared/Accordion.jsx";
import SiteFooter from "../../components/layout/SiteFooter.jsx";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import ConsultationForm from "../../components/shared/ConsultationForm.jsx";
import ContentImage from "../../components/shared/ContentImage.jsx";
import YunseulLight from "../../components/shared/YunseulLight.jsx";
import useSectionReveal from "../../components/home/useSectionReveal.js";
import useCurrentInView from "../../components/shared/useCurrentInView.js";
import { procedures } from "../../data/procedures.mjs";
import { procedureDetails } from "../../data/procedureDetails.mjs";
import { procedureVisuals } from "../../data/procedureVisuals.mjs";
import { clinicalNotes } from "../../data/clinicalNotes.mjs";
import { procedureGuides } from "../../data/procedureGuides.mjs";
import { toSiteUrl } from "../../app/paths.mjs";
import { subProcedures } from "../../data/subProcedures.mjs";

// 확인되지 않은 수치는 게시하지 않는다. 항목만 보여주고 값은 상담에서 안내한다.
const surgeryInfo = ["수술 시간", "마취 방법", "입원 여부", "실밥 제거", "회복 기간"];
const priceItems = [
  ["진료·검사", "초진 상담, 수술 전 검사와 추가 검사 비용"],
  ["수술·마취", "시술 범위, 마취 방법과 관련 비용"],
  ["약제·사후관리", "처방약, 경과 확인, 추가 관리의 포함 범위"],
];
const revealTargets = ".pd-reveal";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

function SectionHead({ id, title, children, light = false }) {
  return (
    <header className={`pd-head pd-reveal${light ? " pd-head-light" : ""}`}>
      <span className="pd-head-rule" aria-hidden="true" />
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

export default function ProcedureDetail({ slug }) {
  const procedure =
    procedures.find((item) => item.slug === slug) ?? procedures[0];
  const detail = procedureDetails[procedure.slug];
  const visual = procedureVisuals[procedure.slug];
  const notes = clinicalNotes[procedure.slug];
  const guide = procedureGuides[procedure.slug];
  // 세부 진료 항목과 세부 시술 페이지는 같은 순서로 대응한다
  const subs = subProcedures[procedure.slug] ?? [];
  const bookingUrl = `/consultation?procedure=${procedure.slug}`;
  const root = useSectionReveal(revealTargets);
  const subnavRef = useCurrentInView();
  const seed = procedures.indexOf(procedure) + 3;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pd" ref={root}>
        <nav className="pd-subnav" aria-label="진료 분야">
          <div className="pd-subnav-inner">
            <div className="pd-subnav-links" ref={subnavRef}>
              {procedures.map((item) => (
                <SiteLink
                  key={item.slug}
                  href={`/procedures/${item.slug}`}
                  aria-current={item.slug === procedure.slug ? "page" : undefined}
                >
                  {item.name}
                </SiteLink>
              ))}
            </div>
            <SiteLink className="pd-subnav-cta" href={bookingUrl}>
              상담 준비
            </SiteLink>
          </div>
        </nav>

        <section className="pd-hero" aria-labelledby="treatment-title">
          <div className="pd-hero-copy">
            <nav className="pd-breadcrumbs" aria-label="현재 위치">
              <SiteLink href="/">홈</SiteLink>
              <span aria-hidden="true">/</span>
              <SiteLink href="/procedures">시술 안내</SiteLink>
              <span aria-hidden="true">/</span>
              <strong aria-current="page">{procedure.name}</strong>
            </nav>
            <p className="pd-hero-kicker">{visual.headline}</p>
            <h1 id="treatment-title">{procedure.name}</h1>
            <p className="pd-hero-lead">{procedure.summary}</p>
            <div className="pd-hero-actions">
              <SiteLink className="ys-button" href={bookingUrl}>
                {procedure.name} 상담 준비
              </SiteLink>
            </div>
            <nav className="pd-hero-options" aria-label="세부 진료 바로가기">
              {subs.map((item) => (
                <SiteLink key={item.slug} href={`/procedures/${procedure.slug}/${item.slug}`}>
                  {item.name}
                </SiteLink>
              ))}
            </nav>
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

        <section className="pd-intro" id="overview" aria-labelledby="overview-title">
          <div className="pd-wrap pd-intro-inner">
            <p className="pd-intro-statement pd-reveal">{detail.intro}</p>
            <h2 id="overview-title" className="pd-intro-title pd-reveal">
              {visual.focus}
            </h2>
            <ol className="pd-points">
              {procedure.points.map((point, index) => (
                <li key={point} className="pd-reveal">
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pd-band pd-band-dark" aria-labelledby="info-title">
          <YunseulLight seed={seed} />
          <div className="pd-wrap pd-band-inner">
            <SectionHead id="info-title" title="진료 정보" light>
              환자의 상태와 수술 방법에 따라 달라질 수 있어, 상담에서 개별로
              안내합니다.
            </SectionHead>
            <dl className="pd-info pd-reveal">
              {surgeryInfo.map((label) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>상담 시 안내</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="pd-section" aria-labelledby="concerns-title">
          <div className="pd-wrap">
            <SectionHead id="concerns-title" title="이런 고민이 있다면">
              상담에서 함께 이야기할 내용입니다.
            </SectionHead>
            <ul className="pd-concerns">
              {detail.concerns.map((item) => (
                <li key={item} className="pd-reveal">
                  <CheckIcon />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <p className="pd-note pd-center">
              위 항목은 수술 적합성에 대한 진단이 아닙니다.
            </p>
          </div>
        </section>

        <section className="pd-section pd-section-raised" id="options" aria-labelledby="options-title">
          <div className="pd-wrap">
            <SectionHead id="options-title" title={guide.heading}>
              고민의 원인과 가능한 방법을 구분해 살펴보세요.
            </SectionHead>
            <figure className="pd-guide pd-reveal">
              <img
                src={toSiteUrl(guide.image)}
                alt={guide.imageAlt}
                width="1536"
                height="1024"
                loading="lazy"
              />
              <figcaption>
                <strong>{guide.imageHeading}</strong>
                <span>{guide.imageCopy}</span>
              </figcaption>
            </figure>
            <div className="pd-options">
              {guide.items.map((item, index) => (
                <article key={item.name} id={`option-${index + 1}`} className="pd-reveal">
                  <div className="pd-option-name">
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.name}</h3>
                    {subs[index] && (
                      <SiteLink className="pd-option-link" href={`/procedures/${procedure.slug}/${subs[index].slug}`}>
                        {item.name} 자세히 보기
                      </SiteLink>
                    )}
                  </div>
                  <p className="pd-option-summary">{item.summary}</p>
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
          </div>
        </section>

        <section className="pd-section" id="planning" aria-labelledby="planning-title">
          <div className="pd-wrap">
            <SectionHead id="planning-title" title="나에게 맞는 계획의 기준" />
            <div className="pd-criteria">
              {detail.topics.map(([title, body], index) => (
                <article key={title} className="pd-reveal">
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="pd-flow">
              <h3 className="pd-flow-title pd-reveal">상담부터 경과 확인까지</h3>
              <ol className="pd-steps">
                {guide.flow.map(([title, body], index) => (
                  <li key={title} className="pd-reveal">
                    <span className="pd-step-number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="pd-band pd-band-light" id="recovery" aria-labelledby="recovery-title">
          <YunseulLight seed={seed + 11} count={110} />
          <div className="pd-wrap pd-band-inner">
            <SectionHead id="recovery-title" title="회복과 사후관리">
              {detail.recovery}
            </SectionHead>
            <dl className="pd-recovery">
              <div className="pd-reveal">
                <dt>예상 회복</dt>
                <dd>{notes.recoveryPeriod}</dd>
              </div>
              <div className="pd-reveal">
                <dt>일상에서의 관리</dt>
                <dd>{notes.aftercare}</dd>
              </div>
            </dl>
            <p className="pd-note pd-center">
              회복 일정과 경과에는 개인차가 있습니다. 일상 복귀 시점은 의료진과
              확인해 주세요.
            </p>
          </div>
        </section>

        <section className="pd-section" id="safety" aria-labelledby="safety-title">
          <div className="pd-wrap">
            <SectionHead id="safety-title" title="결정 전에 확인할 내용" />
            <dl className="pd-table pd-reveal">
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
            <p className="pd-center">
              <SiteLink className="ys-link" href="/about#facility-equipment-title">
                장비와 안전 관리 확인
              </SiteLink>
            </p>
          </div>
        </section>

        <section className="pd-section pd-section-raised" id="prices" aria-labelledby="prices-title">
          <div className="pd-wrap">
            <SectionHead id="prices-title" title="비용에 포함되는 항목">
              방법과 범위, 필요한 검사와 마취에 따라 비용이 달라질 수 있습니다.
              상담에서 다음 항목의 포함 여부를 확인해 주세요.
            </SectionHead>
            <ul className="pd-prices">
              {priceItems.map(([title, body]) => (
                <li key={title} className="pd-reveal">
                  <CheckIcon />
                  <strong>{title}</strong>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
            <p className="pd-center">
              <SiteLink className="ys-link" href="/pricing">
                비용 안내 자세히 보기
              </SiteLink>
            </p>
          </div>
        </section>

        <section className="pd-section" id="questions" aria-labelledby="questions-title">
          <div className="pd-wrap pd-narrow">
            <SectionHead id="questions-title" title="자주 묻는 질문" />
            <Accordion items={detail.faq} />
            <div className="pd-related">
              <SiteLink href="/doctors">의료진 정보</SiteLink>
              <SiteLink href="/cases">비교 이미지 안내</SiteLink>
              <SiteLink href="/faq">전체 FAQ</SiteLink>
            </div>
          </div>
        </section>

        <section className="pd-band pd-band-dark pd-consultation" aria-labelledby="detail-consultation-title">
          <YunseulLight seed={seed + 23} count={120} />
          <div className="pd-wrap pd-consultation-inner">
            <div className="pd-consultation-copy">
              <span className="pd-head-rule" aria-hidden="true" />
              <h2 id="detail-consultation-title">{procedure.name} 상담 준비</h2>
              <p>
                현재 상태와 원하는 방향을 남겨 주세요. 상담에서 확인할 내용을
                정리해 드립니다.
              </p>
              <p className="pd-note">
                입력 내용은 전송·저장되지 않으며 예약도 접수되지 않습니다.
              </p>
              <SiteLink className="ys-link" href="/procedures">
                전체 시술 안내
              </SiteLink>
            </div>
            <ConsultationForm initialProcedure={procedure.slug} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
