import { useId, useRef, useState } from "react";
import { imageSizes } from "../../data/imageSizes.mjs";
import { clampComparison, comparisonPosition } from "./comparison.mjs";

// The supplied asset contains two equal panels. Each half retains its original pixels.
export default function BeforeAfterCompare({
  src,
  title,
  beforeLabel = "화면 A",
  afterLabel = "화면 B",
}) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef(null);
  const id = useId();
  const size = imageSizes[src];
  const updatePosition = (event) =>
    setPosition(
      comparisonPosition(
        event.clientX,
        event.currentTarget.getBoundingClientRect(),
      ),
    );
  const stopDrag = (event) => {
    if (pointer.current !== event.pointerId) return;
    pointer.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      className={`image-comparison${dragging ? " is-dragging" : ""}`}
      data-comparison-src={src}
      style={{
        "--compare-position": `${position}%`,
        "--compare-image": `url("${src}")`,
        "--compare-aspect": `${(size?.width || 1600) / 2} / ${size?.height || 1000}`,
      }}
    >
      <div
        className="comparison-frame"
        role="img"
        aria-label={`${title}. 왼쪽은 ${beforeLabel}, 오른쪽은 ${afterLabel}`}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          pointer.current = event.pointerId;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          updatePosition(event);
        }}
        onPointerMove={(event) => {
          if (pointer.current === event.pointerId) updatePosition(event);
        }}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={() => {
          pointer.current = null;
          setDragging(false);
        }}
      >
        <div
          className="comparison-photo comparison-photo-after"
          aria-hidden="true"
        />
        <div
          className="comparison-photo comparison-photo-before"
          aria-hidden="true"
        />
        <div className="comparison-labels" aria-hidden="true">
          <span>{beforeLabel}</span>
          <span>{afterLabel}</span>
        </div>
        <div className="comparison-handle" aria-hidden="true">
          <span>
            <svg viewBox="0 0 32 24">
              <path d="m11 6-6 6 6 6M21 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
      <div className="comparison-controls">
        <label htmlFor={id}>드래그하여 비교</label>
        <input
          id={id}
          type="range"
          min="0"
          max="100"
          step="1"
          value={position}
          aria-label={`${title} ${beforeLabel}·${afterLabel} 비교`}
          aria-valuetext={`${beforeLabel} ${position}%, ${afterLabel} ${100 - position}% 표시`}
          onChange={(event) =>
            setPosition(clampComparison(Number(event.target.value)))
          }
        />
        <div className="comparison-buttons">
          <button type="button" onClick={() => setPosition(100)}>
            {beforeLabel} 전체 보기
          </button>
          <button type="button" onClick={() => setPosition(0)}>
            {afterLabel} 전체 보기
          </button>
        </div>
      </div>
    </div>
  );
}
