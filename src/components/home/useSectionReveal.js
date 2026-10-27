import { useEffect, useRef } from "react";

const homeTargets =
  ".ys-section-head h2, .ys-story figure, .ys-procedure-panel, .ys-case-preview figure, .ys-space-stage, .ys-care-feature, .ys-care-process";

export default function useSectionReveal(targets = homeTargets) {
  const root = useRef(null);
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.IntersectionObserver
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("ys-arrive");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    root.current
      ?.querySelectorAll(targets)
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [targets]);
  return root;
}
