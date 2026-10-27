import { useEffect, useState } from "react";

export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");
  useEffect(() => {
    let frame = 0;
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const update = () => {
      frame = 0;
      // Match the browser's anchor alignment, including the mobile sticky outline.
      const padding =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      const margin = sections[0]
        ? parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0
        : 0;
      const offset = padding + margin + 2;
      let current = sections[0]?.id;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      });
      if (current) setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [key]);
  return active;
}
