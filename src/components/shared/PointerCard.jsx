import { useEffect, useRef } from "react";
import { toSiteUrl } from "../../app/paths.mjs";

export default function PointerCard({
  as: Tag = "article",
  className = "",
  children,
  ...props
}) {
  const root = useRef(null);
  const bounds = useRef(null);
  const frame = useRef(0);
  const allowed = useRef(false);
  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => {
      allowed.current = query.matches;
      if (!query.matches) root.current?.style.setProperty("--card-x", "0px");
    };
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      cancelAnimationFrame(frame.current);
    };
  }, []);
  const reset = () => {
    cancelAnimationFrame(frame.current);
    root.current?.style.setProperty("--card-x", "0px");
    bounds.current = null;
  };
  return (
    <Tag
      {...props}
      {...(Tag === "a" ? { href: toSiteUrl(props.href) } : {})}
      ref={root}
      className={`pointer-card ${className}`.trim()}
      onPointerEnter={(event) => {
        bounds.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={(event) => {
        if (
          !allowed.current ||
          event.pointerType !== "mouse" ||
          !bounds.current
        )
          return;
        if (event.target.closest(".image-comparison, input, button")) {
          cancelAnimationFrame(frame.current);
          root.current?.style.setProperty("--card-x", "0px");
          return;
        }
        const x = Math.max(
          -1,
          Math.min(
            1,
            ((event.clientX - bounds.current.left) / bounds.current.width -
              0.5) *
              2,
          ),
        );
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() =>
          root.current?.style.setProperty(
            "--card-x",
            `${(x * 7).toFixed(2)}px`,
          ),
        );
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </Tag>
  );
}
