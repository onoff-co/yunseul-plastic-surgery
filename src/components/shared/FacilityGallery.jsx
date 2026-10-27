import { pageImages } from "../../data/pageImages.mjs";
import ContentImage from "./ContentImage.jsx";

const equipmentItems = [
  {
    title: "멸균·기구 관리",
    body: "사용 전후 기구 관리와 감염 예방을 위한 운영 영역입니다.",
    image: pageImages.about.sterilization,
    alt: "멸균 및 의료 기구 관리 이미지",
  },
  {
    title: "피부 관리 장비",
    body: "피부·쁘띠 상담에서 상태에 따라 검토할 수 있는 장비입니다.",
    image: pageImages.about.skinCare,
    alt: "LED 피부 관리 장비 이미지",
  },
];

function Gallery({ items, title, description, className }) {
  return (
    <section
      className={`facility-gallery ${className ?? ""}`}
      aria-labelledby={`${className}-title`}
    >
      <div className="section-heading">
        <h2 id={`${className}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="facility-gallery-grid">
        {items.map((item) => (
          <figure key={item.title} className="facility-gallery-item">
            <ContentImage src={item.image} alt={item.alt} loading="lazy" />
            <figcaption>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function EquipmentGallery() {
  return (
    <Gallery
      items={equipmentItems}
      title="장비와 안전 관리"
      description="피부 상태 확인과 기구 관리에 사용되는 장비의 역할을 안내합니다."
      className="facility-equipment"
    />
  );
}
