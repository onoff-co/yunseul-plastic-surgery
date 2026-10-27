import { pageImages } from "./pageImages.mjs";

const relativeImage = (src) => src.replace("/assets/images/", "");
export const procedureVisuals = {
  eye: {
    image: relativeImage(pageImages.details.eye),
    directoryImage: relativeImage(pageImages.directory.eye),
    headline: "표정에 어울리는 눈매",
    focus: "눈의 모양과 뜨는 힘, 함께 살펴봅니다.",
  },
  nose: {
    image: relativeImage(pageImages.details.nose),
    directoryImage: relativeImage(pageImages.directory.nose),
    headline: "옆모습까지 자연스럽게",
    focus: "높이보다 중요한 얼굴 전체의 연결.",
  },
  contour: {
    image: relativeImage(pageImages.details.contour),
    directoryImage: relativeImage(pageImages.directory.contour),
    headline: "나만의 균형을 찾아서",
    focus: "정면과 측면에서 나다운 얼굴선을 살핍니다.",
  },
  lifting: {
    image: relativeImage(pageImages.details.lifting),
    directoryImage: relativeImage(pageImages.directory.lifting),
    headline: "지금의 표정을 오래도록",
    focus: "피부와 탄력의 변화를 차분하게 이해합니다.",
  },
};

export function consultationSelection(slug) {
  return Object.hasOwn(procedureVisuals, slug) ? slug : "";
}
