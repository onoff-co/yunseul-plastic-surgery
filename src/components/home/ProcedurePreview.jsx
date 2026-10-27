import SiteLink from "../shared/SiteLink.jsx";
import { useState } from "react";
import { procedures } from "../../data/procedures.mjs";
import { homeProcedureVisuals } from "../../data/homeDesign.mjs";
import ContentImage from "../shared/ContentImage.jsx";

export default function ProcedurePreview() {
  const [selected, setSelected] = useState(procedures[0].slug);
  const current = procedures.find((item) => item.slug === selected);
  const visual = homeProcedureVisuals[selected];
  return (
    <section
      className="ys-procedures ys-section ys-container"
      id="procedures"
      aria-labelledby="ys-procedures-title"
    >
      <div className="ys-section-head">
        <h2 id="ys-procedures-title">진료 분야</h2>
        <SiteLink className="ys-link" href="/procedures">
          전체 진료 안내
        </SiteLink>
      </div>
      <div className="ys-procedure-layout">
        <div
          className="ys-procedure-choices"
          role="group"
          aria-label="관심 진료 선택"
        >
          {procedures.map((item) => (
            <button
              type="button"
              key={item.slug}
              aria-pressed={selected === item.slug}
              aria-controls="ys-procedure-panel"
              onClick={() => setSelected(item.slug)}
            >
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </button>
          ))}
        </div>
        <div
          id="ys-procedure-panel"
          className={`ys-procedure-panel ys-procedure-${selected}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="ys-procedure-copy">
            <h3>{visual.headline}</h3>
            <p>{current.summary}</p>
            <ul>
              {current.points.slice(0, 2).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <SiteLink className="ys-button" href={`/procedures/${selected}`}>
              {current.name} 알아보기
            </SiteLink>
          </div>
          <figure>
            <ContentImage
              key={visual.image + selected}
              src={visual.image}
              alt={`${current.name} 분야 이미지`}
              width="1024"
              height="1536"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
