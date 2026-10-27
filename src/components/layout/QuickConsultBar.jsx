import { useEffect, useState } from "react";
import { procedures } from "../../data/procedures.mjs";
import { consultationSelection } from "../../data/procedureVisuals.mjs";
import { toSiteUrl } from "../../app/paths.mjs";

// 입력값은 서버로 보내지 않는다. 이 탭의 sessionStorage로만 상담 준비 양식에 넘기고,
// 양식이 읽은 즉시 지운다. URL에는 개인정보를 넣지 않는다.
export const quickConsultKey = "ys-quick-consult";
const collapsedKey = "ys-quick-consult-collapsed";

function readCollapsed() {
  try {
    return sessionStorage.getItem(collapsedKey) === "1";
  } catch {
    return false;
  }
}

export default function QuickConsultBar() {
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [error, setError] = useState("");
  const current = window.location.pathname.match(/\/procedures\/([^/]+)/)?.[1];
  // 상담 준비 페이지에는 같은 양식이 있으므로 바를 띄우지 않는다
  const hidden = /\/consultation\/?$/.test(window.location.pathname);

  useEffect(() => {
    document.body.classList.toggle("has-quick-consult", !collapsed && !hidden);
    try {
      sessionStorage.setItem(collapsedKey, collapsed ? "1" : "0");
    } catch {}
    return () => document.body.classList.remove("has-quick-consult");
  }, [collapsed, hidden]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("quick-name") || "").trim();
    const phone = String(values.get("quick-phone") || "").trim();
    const procedure = consultationSelection(values.get("quick-procedure"));
    const digits = phone.replace(/\D/g, "");
    if (!name) return setError("이름을 입력해 주세요.");
    if (!/^[+\d\s()-]+$/.test(phone) || digits.length < 9 || digits.length > 15)
      return setError("연락 가능한 전화번호를 확인해 주세요.");
    try {
      sessionStorage.setItem(quickConsultKey, JSON.stringify({ name, phone }));
    } catch {}
    const query = procedure ? `?procedure=${procedure}` : "";
    window.location.assign(toSiteUrl(`/consultation${query}#consultation-form`));
  };

  if (hidden) return null;

  if (collapsed) {
    return (
      <button className="ys-quick-consult-open" type="button" onClick={() => setCollapsed(false)}>
        빠른 상담 준비 열기
      </button>
    );
  }

  return (
    <section className="ys-quick-consult" aria-label="빠른 상담 준비">
      <form className="ys-quick-consult-inner" onSubmit={handleSubmit} noValidate>
        <p className="ys-quick-consult-title">
          <strong>빠른 상담 준비</strong>
          <span>입력 내용은 전송·저장되지 않습니다</span>
        </p>
        <label>
          <span className="ys-visually-hidden">이름</span>
          <input name="quick-name" placeholder="이름" autoComplete="name" maxLength={100} onInput={() => setError("")} />
        </label>
        <label>
          <span className="ys-visually-hidden">연락처</span>
          <input name="quick-phone" type="tel" inputMode="tel" placeholder="연락처" autoComplete="tel" maxLength={24} onInput={() => setError("")} />
        </label>
        <label>
          <span className="ys-visually-hidden">관심 시술</span>
          <select name="quick-procedure" defaultValue={consultationSelection(current)}>
            <option value="">관심 시술</option>
            {procedures.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button className="ys-quick-consult-submit" type="submit">
          상담 준비하기
        </button>
        <p className="ys-quick-consult-error" role="status" aria-live="polite">
          {error}
        </p>
        <button
          className="ys-quick-consult-close"
          type="button"
          aria-label="빠른 상담 준비 닫기"
          onClick={() => setCollapsed(true)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </form>
    </section>
  );
}
