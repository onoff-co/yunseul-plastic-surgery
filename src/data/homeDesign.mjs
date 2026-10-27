import { pageImages } from "./pageImages.mjs";

export const homeProcedureVisuals = {
  eye: {
    image: pageImages.home.procedures.eye,
    headline: "눈매와 표정의 균형",
  },
  nose: {
    image: pageImages.home.procedures.nose,
    headline: "정면에서 옆모습까지",
  },
  contour: {
    image: pageImages.home.procedures.contour,
    headline: "얼굴 전체의 자연스러운 연결",
  },
  lifting: {
    image: pageImages.home.procedures.lifting,
    headline: "피부와 탄력의 변화를 함께",
  },
};
export const homeStories = [
  {
    title: "눈 성형, 라인 외에 확인할 것",
    text: "눈 뜨는 힘과 좌우 차이, 표정까지",
    href: "/procedures/eye",
    image: pageImages.home.stories.eye,
  },
  {
    title: "코 상담에서 살피는 균형",
    text: "정면과 측면을 함께 보는 이유",
    href: "/procedures/nose",
    image: pageImages.home.stories.nose,
  },
  {
    title: "장비의 역할을 먼저 알아보세요",
    text: "피부 분석부터 기구 관리까지",
    href: "/about#facility-equipment-title",
    image: pageImages.home.stories.equipment,
  },
];
export const homeSpaces = [
  {
    name: "상담 라운지",
    image: pageImages.home.spaces.consultation,
    description: "원하는 변화와 걱정되는 점을 편안하게 나누는 공간.",
  },
  {
    name: "시술 준비실",
    image: pageImages.home.spaces.treatment,
    description: "시술 전 확인과 준비 과정을 위한 독립된 공간.",
  },
  {
    name: "회복실",
    image: pageImages.home.spaces.recovery,
    description: "회복 상태와 귀가 전 주의사항을 확인하는 공간.",
  },
];
