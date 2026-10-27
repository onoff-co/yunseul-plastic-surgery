import SiteLink from "../shared/SiteLink.jsx";
import { useEffect, useRef, useState } from "react";
import { homeSpaces } from "../../data/homeDesign.mjs";
import ContentImage from "../shared/ContentImage.jsx";
import { toSiteUrl } from "../../app/paths.mjs";

export default function ClinicExperience() {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const video = useRef(null);
  const space = homeSpaces[selected];
  useEffect(() => {
    if (selected !== 0) {
      video.current?.pause();
      setPlaying(false);
    }
  }, [selected]);
  const toggleVideo = async () => {
    if (!video.current || failed) return;
    if (playing) {
      video.current.pause();
      setPlaying(false);
    } else {
      try {
        await video.current.play();
        setPlaying(true);
      } catch {
        setFailed(true);
      }
    }
  };
  return (
    <section
      className="ys-experience ys-section"
      aria-labelledby="ys-space-title"
    >
      <div className="ys-container ys-section-head">
        <div>
          <h2 id="ys-space-title">머무는 시간까지 편안하게</h2>
          <p>상담, 준비, 회복. 공간의 흐름을 미리 살펴보세요.</p>
        </div>
        <SiteLink className="ys-link" href="/about">
          병원 둘러보기
        </SiteLink>
      </div>
      <div className="ys-space-stage">
        {selected === 0 && !failed ? (
          <video
            ref={video}
            poster={toSiteUrl(space.image)}
            src={toSiteUrl("/assets/video/consultation-space.webm")}
            muted
            loop
            playsInline
            preload="none"
            aria-label="상담 공간 영상"
            onError={() => {
              setFailed(true);
              setPlaying(false);
            }}
          />
        ) : (
          <ContentImage
            key={space.image}
            src={space.image}
            alt={`${space.name} 공간 이미지`}
            loading="lazy"
            width="1672"
            height="940"
          />
        )}
        <div className="ys-space-caption">
          <p>{space.description}</p>
        </div>
        {selected === 0 && !failed && (
          <button
            className="ys-video-toggle"
            type="button"
            onClick={toggleVideo}
            aria-label={playing ? "공간 영상 일시정지" : "공간 영상 재생"}
            aria-pressed={playing}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {playing ? (
                <path d="M8 5v14M16 5v14" />
              ) : (
                <path d="m8 4 11 8-11 8Z" />
              )}
            </svg>
            {playing ? "일시정지" : "공간 영상 보기"}
          </button>
        )}
      </div>
      <div
        className="ys-space-tabs ys-container"
        role="group"
        aria-label="병원 공간 선택"
      >
        {homeSpaces.map((item, i) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
