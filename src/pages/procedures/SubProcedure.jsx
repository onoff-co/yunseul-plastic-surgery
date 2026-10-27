import SiteLink from "../../components/shared/SiteLink.jsx";
import Accordion from "../../components/shared/Accordion.jsx";
import SiteFooter from "../../components/layout/SiteFooter.jsx";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import ConsultationForm from "../../components/shared/ConsultationForm.jsx";
import ImageSlot from "../../components/shared/ImageSlot.jsx";
import YunseulLight from "../../components/shared/YunseulLight.jsx";
import useSectionReveal from "../../components/home/useSectionReveal.js";
import useCurrentInView from "../../components/shared/useCurrentInView.js";
import { procedures } from "../../data/procedures.mjs";
import { clinicalNotes } from "../../data/clinicalNotes.mjs";
import { subProcedures, findSubProcedure } from "../../data/subProcedures.mjs";

// 확인되지 않은 수치는 게시하지 않는다. 항목만 보여주고 값은 상담에서 안내한다.
const surgeryInfo = ["수술 시간", "마취 방법", "입원 여부", "실밥 제거", "내원 치료", "회복 기간"];

function SectionHead({ id, english, title, children, light = false }) {
  return (
    <header className={`pd-head pd-reveal${light ? " pd-head-light" : ""}`}>
      <span className="sp-head-english" aria-hidden="true">{english}</span>
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

export default function SubProcedure({ slug, sub }) {
  const procedure = procedures.find((item) => item.slug === slug);
  const item = findSubProcedure(slug, sub);
  const siblings = subProcedures[slug];
  const notes = clinicalNotes[slug];
  const bookingUrl = `/consultation?procedure=${slug}`;
  const root = useSectionReveal(".pd-reveal");
  const subnavRef = useCurrentInView();
  const seed = procedures.indexOf(procedure) * 3 + siblings.indexOf(item) + 5;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pd sp" ref={root}>
        <nav className="pd-subnav sp-subnav" aria-label={`${procedure.name} 세부 진료`}>
          <div className="pd-subnav-inner">
            <div className="pd-subnav-links" ref={subnavRef}>
              <SiteLink href={`/procedures/${slug}`}>{procedure.name} 전체</SiteLink>
              {siblings.map((entry) => (
                <SiteLink
                  key={entry.slug}
                  href={`/procedures/${slug}/${entry.slug}`}
                  aria-current={entry.slug === item.slug ? "page" : undefined}
                >
                  {entry.name}
                </SiteLink>
              ))}
            </div>
            <SiteLink className="pd-subnav-cta" href={bookingUrl}>
              상담 준비
            </SiteLink>
          </div>
        </nav>

        <section className="sp-hero" aria-labelledby="sp-title">
          <div className="sp-hero-media">
            <ImageSlot src={item.images.hero} alt={`${item.name} 대표 이미지`} ratio="4 / 5" label="대표 인물 사진 · 세로 4:5" />
          </div>
          <div className="sp-hero-copy">
            <nav className="pd-breadcrumbs" aria-label="현재 위치">
              <SiteLink href="/">홈</SiteLink>
              <span aria-hidden="true">/</span>
              <SiteLink href="/procedures">시술 안내</SiteLink>
              <span aria-hidden="true">/</span>
              <SiteLink href={`/procedures/${slug}`}>{procedure.name}</SiteLink>
              <span aria-hidden="true">/</span>
              <strong aria-current="page">{item.name}</strong>
            </nav>
            <p className="sp-hero-english" aria-hidden="true">{item.english}</p>
            <h1 id="sp-title">{item.name}</h1>
            <p className="sp-hero-headline">{item.headline}</p>
            <p className="sp-hero-intro">{item.intro}</p>
            <dl className="sp-info">
              {surgeryInfo.map((label) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>상담 시 안내</dd>
                </div>
              ))}
            </dl>
            <p className="pd-note">환자의 상태나 수술 방법에 따라 차이가 있을 수 있습니다.</p>
            <div className="pd-hero-actions">
              <SiteLink className="ys-button" href={bookingUrl}>
                {item.name} 상담 준비
              </SiteLink>
            </div>
          </div>
        </section>

        <section className="pd-section pd-section-raised" aria-labelledby="sp-compare-title">
          <div className="pd-wrap">
            <SectionHead id="sp-compare-title" english="Image Guide" title="분야별 비교 이미지">
              상담 이해를 돕기 위한 이미지입니다. 실제 환자 사진이나 시술 결과가 아닙니다.
            </SectionHead>
            <div className="sp-compare">
              {[1, 2, 3, 4].map((index) => (
                <figure key={index} className="pd-reveal">
                  <ImageSlot ratio="16 / 9" label="비교 이미지 · 가로 16:9" />
                  <figcaption>{item.name} 상담 이미지 {index}</figcaption>
                </figure>
              ))}
            </div>
            <div className="sp-compare-footer">
              <p className="pd-note">
                수술 후 출혈, 감염, 염증 등 일반적으로 발생할 수 있는 합병증은 개인에 따라
                정도의 차이가 있을 수 있으므로 주의가 필요합니다.
              </p>
              <SiteLink className="ys-button" href="/cases">
                비교 이미지 더 보기
              </SiteLink>
            </div>
          </div>
        </section>

        <section className="pd-section" aria-labelledby="sp-problem-title">
          <div className="pd-wrap">
            <SectionHead id="sp-problem-title" english="Concerns" title="이런 고민에서 시작합니다" />
            <ul className="sp-problems">
              {item.problems.map((problem, index) => (
                <li key={problem.title} className="pd-reveal">
                  <ImageSlot
                    src={item.images.problems[index]}
                    alt=""
                    ratio="1 / 1"
                    className="sp-problem-image"
                    label="부위 설명 그림 · 1:1"
                  />
                  <h3>{problem.title}</h3>
                  <p>{problem.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pd-section pd-section-raised" aria-labelledby="sp-method-title">
          <div className="pd-wrap">
            <SectionHead id="sp-method-title" english="Process" title={`${item.name} 상담과 진행 과정`} />
            <div className="sp-method">
              <div className="sp-method-image pd-reveal">
                <ImageSlot src={item.images.method} alt="" ratio="4 / 3" label="진행 과정 설명 그림 · 4:3" />
              </div>
              <ol className="sp-steps">
                {item.method.map((step, index) => (
                  <li key={step.title} className="pd-reveal">
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="pd-section" aria-labelledby="sp-points-title">
          <div className="pd-wrap">
            <SectionHead id="sp-points-title" english="Key Points" title="상담에서 함께 보는 기준" />
            <ul className="sp-points">
              {item.points.map((point) => (
                <li key={point.title} className="pd-reveal">
                  <p className="sp-bubble">{point.body}</p>
                  <h3>{point.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="pd-band pd-band-light" aria-labelledby="sp-target-title">
          <YunseulLight seed={seed} count={110} />
          <div className="pd-wrap pd-band-inner sp-target">
            <div className="sp-target-copy">
              <span className="sp-head-english" aria-hidden="true">Who</span>
              <h2 id="sp-target-title">이런 분께 상담을 권합니다</h2>
              <ol>
                {item.targets.map((target, index) => (
                  <li key={target} className="pd-reveal">
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <p>{target}</p>
                  </li>
                ))}
              </ol>
              <p className="pd-note">위 항목은 수술 적합성에 대한 진단이 아닙니다.</p>
            </div>
            <div className="sp-target-image pd-reveal">
              <ImageSlot src={item.images.target} alt="" ratio="4 / 5" label="인물 사진 · 세로 4:5" />
            </div>
          </div>
        </section>

        <section className="pd-section" aria-labelledby="sp-safety-title">
          <div className="pd-wrap">
            <SectionHead id="sp-safety-title" english="Before You Decide" title="결정 전에 확인할 내용" />
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
              <div>
                <dt>회복과 관리</dt>
                <dd>{notes.aftercare}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="pd-section pd-section-raised" aria-labelledby="sp-faq-title">
          <div className="pd-wrap pd-narrow">
            <SectionHead id="sp-faq-title" english="FAQ" title={`${item.name}, 자주 묻는 질문`} />
            <Accordion items={item.faq} />
          </div>
        </section>

        <section className="pd-section" aria-labelledby="sp-related-title">
          <div className="pd-wrap">
            <SectionHead id="sp-related-title" english="More" title={`${procedure.name}의 다른 진료`} />
            <ul className="sp-related">
              {siblings
                .filter((entry) => entry.slug !== item.slug)
                .map((entry) => (
                  <li key={entry.slug} className="pd-reveal">
                    <SiteLink href={`/procedures/${slug}/${entry.slug}`}>
                      <span aria-hidden="true">{entry.english}</span>
                      <strong>{entry.name}</strong>
                      <p>{entry.headline}</p>
                      <em>자세히 보기</em>
                    </SiteLink>
                  </li>
                ))}
              <li className="pd-reveal">
                <SiteLink href={`/procedures/${slug}`}>
                  <span aria-hidden="true">Overview</span>
                  <strong>{procedure.name} 전체 안내</strong>
                  <p>{procedure.summary}</p>
                  <em>자세히 보기</em>
                </SiteLink>
              </li>
            </ul>
          </div>
        </section>

        <section className="pd-band pd-band-dark pd-consultation" aria-labelledby="sp-consultation-title">
          <YunseulLight seed={seed + 17} count={120} />
          <div className="pd-wrap pd-consultation-inner">
            <div className="pd-consultation-copy">
              <span className="pd-head-rule" aria-hidden="true" />
              <h2 id="sp-consultation-title">{item.name} 상담 준비</h2>
              <p>
                현재 상태와 원하는 방향을 남겨 주세요. 상담에서 확인할 내용을
                정리해 드립니다.
              </p>
              <p className="pd-note">
                입력 내용은 전송·저장되지 않으며 예약도 접수되지 않습니다.
              </p>
            </div>
            <ConsultationForm initialProcedure={slug} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
