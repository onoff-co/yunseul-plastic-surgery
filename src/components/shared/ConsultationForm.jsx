import { useState } from "react";
import { procedures } from "../../data/procedures.mjs";
import { consultationSelection } from "../../data/procedureVisuals.mjs";

export default function ConsultationForm({ initialProcedure = "" }) {
  const selected = consultationSelection(
    initialProcedure ||
      new URLSearchParams(window.location.search).get("procedure"),
  );
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const nextErrors = {};
    if (!String(values.get("name") || "").trim())
      nextErrors.name = "이름을 입력해 주세요.";
    const phone = String(values.get("phone") || "").trim();
    const digits = phone.replace(/\D/g, "");
    if (!/^[+\d\s()-]+$/.test(phone) || digits.length < 9 || digits.length > 15)
      nextErrors.phone = "연락 가능한 전화번호를 확인해 주세요.";
    if (!procedures.some((item) => item.slug === values.get("procedure")))
      nextErrors.procedure = "관심 시술을 선택해 주세요.";
    if (!values.get("consent"))
      nextErrors.consent = "입력 정보 처리 안내를 확인해 주세요.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("필수 항목을 확인해 주세요.");
      form.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setStatus("입력 내용을 확인했습니다. 정보는 전송되거나 저장되지 않았습니다.");
  };
  return (
    <form className="consultation-form" onSubmit={handleSubmit} noValidate>
      <p className="form-notice">
        이 양식은 입력 내용만 확인합니다. 정보는 전송·저장되지 않으며 예약도
        접수되지 않습니다.
      </p>
      <div className="form-row">
        <label htmlFor="name">
          이름
          <input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && (
            <small className="form-field-error" id="name-error">
              {errors.name}
            </small>
          )}
        </label>
        <label htmlFor="phone">
          연락처
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="휴대전화 번호"
            maxLength={24}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
          {errors.phone && (
            <small className="form-field-error" id="phone-error">
              {errors.phone}
            </small>
          )}
        </label>
      </div>
      <label htmlFor="procedure">
        관심 시술
        <select
          id="procedure"
          name="procedure"
          defaultValue={selected}
          aria-invalid={Boolean(errors.procedure)}
          aria-describedby={errors.procedure ? "procedure-error" : undefined}
          required
        >
          <option value="">선택해 주세요</option>
          {procedures.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.procedure && (
          <small className="form-field-error" id="procedure-error">
            {errors.procedure}
          </small>
        )}
      </label>
      <label htmlFor="message">
        상담 내용
        <textarea
          id="message"
          name="message"
          rows="4"
          maxLength={3000}
          placeholder="현재 고민이나 궁금한 점을 적어 주세요."
        />
      </label>
      <label className="consent">
        <input
          name="consent"
          type="checkbox"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          required
        />{" "}
        입력 정보가 전송·저장되지 않음을 확인했습니다.
      </label>
      {errors.consent && (
        <small className="form-field-error" id="consent-error">
          {errors.consent}
        </small>
      )}
      <button className="button button-dark" type="submit">
        입력 내용 확인
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
