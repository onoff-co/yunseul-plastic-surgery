import ContentImage from "./ContentImage.jsx";

// 사진이 정해지지 않은 자리. src가 생기면 원본 비율 그대로 이미지를 보여준다.
export default function ImageSlot({ src, alt = "", ratio = "4 / 3", label, className = "" }) {
  if (src) return <ContentImage src={src} alt={alt} className={className} loading="lazy" />;
  return (
    <div
      className={`image-slot ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${label ?? "이미지"} 준비 중`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="m4.5 17 4.5-4.5 3.5 3.5 2.5-2.5 4.5 4.5" />
      </svg>
      <strong>이미지 준비 중</strong>
      {label && <span>{label}</span>}
    </div>
  );
}
