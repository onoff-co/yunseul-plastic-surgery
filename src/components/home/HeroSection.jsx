import SiteLink from "../shared/SiteLink.jsx";
import { useState } from "react";
import { pageImages } from "../../data/pageImages.mjs";
import { imageSizes } from "../../data/imageSizes.mjs";
import ContentImage from "../shared/ContentImage.jsx";
import { toSiteUrl } from "../../app/paths.mjs";

const slides = [
  {
    label: "진료 안내",
    image: pageImages.home.hero,
    title: ["나를 이해하는 상담,", "윤슬성형외과"],
    body: "눈, 코, 윤곽, 리프팅. 얼굴의 균형과 일상의 표정을 함께 살핍니다.",
    href: "/procedures",
    action: "진료 분야 보기",
    className: "ys-hero-portrait",
  },
  {
    label: "공간 안내",
    image: pageImages.home.spaceSlide,
    title: ["상담부터 회복까지,", "편안한 진료 공간"],
    body: "프라이빗 상담실부터 회복실까지, 방문 전 공간을 살펴보세요.",
    href: "/about",
    action: "병원 둘러보기",
    className: "ys-hero-space",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  return (
    <section
      className={`ys-hero ${slide.className}`}
      aria-label="윤슬성형외과 진료 안내"
    >
      <picture className="ys-hero-picture">
        {index === 0 && (
          <source
            media="(max-width: 600px)"
            srcSet={toSiteUrl(pageImages.home.heroMobile)}
            width={imageSizes[pageImages.home.heroMobile].width}
            height={imageSizes[pageImages.home.heroMobile].height}
          />
        )}
        <ContentImage
          key={slide.image}
          className="ys-hero-image"
          src={slide.image}
          alt=""
          width="1774"
          height="887"
          fetchPriority="high"
        />
      </picture>
      <div
        className="ys-container ys-hero-content"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="ys-hero-copy">
          <h1>
            {slide.title.map((part) => (
              <span className="hero-title-phrase" key={part}>
                {part}{" "}
              </span>
            ))}
          </h1>
          <p>{slide.body}</p>
          <SiteLink className="ys-button" href={slide.href}>
            {slide.action}
          </SiteLink>
        </div>
      </div>
      <div className="ys-container ys-hero-bottom">
        <div
          className="ys-hero-tabs"
          role="group"
          aria-label="메인 비주얼 선택"
        >
          {slides.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
