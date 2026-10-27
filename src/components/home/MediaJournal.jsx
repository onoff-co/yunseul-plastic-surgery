import { homeStories } from "../../data/homeDesign.mjs";
import ContentImage from "../shared/ContentImage.jsx";
import PointerCard from "../shared/PointerCard.jsx";

export default function MediaJournal() {
  return (
    <section
      className="ys-stories ys-section ys-container"
      aria-labelledby="ys-stories-title"
    >
      <div className="ys-section-head">
        <h2 id="ys-stories-title">상담 전에 읽어보세요</h2>
        <a className="ys-link" href="/faq">
          자주 묻는 질문
        </a>
      </div>
      <div className="ys-story-grid">
        {homeStories.map((item) => (
          <PointerCard
            as="a"
            className="ys-story"
            href={item.href}
            key={item.title}
          >
            <figure>
              <ContentImage
                src={item.image}
                alt=""
                width="1024"
                height="1536"
                loading="lazy"
              />
              <b>안내 읽기</b>
            </figure>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </PointerCard>
        ))}
      </div>
    </section>
  );
}
