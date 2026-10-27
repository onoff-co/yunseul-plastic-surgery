// Each content slot owns its image. Brand marks and a video's poster are exceptions.
const pageAsset = (name) => `/assets/images/pages/${name}.jpg`;

export const pageImages = {
  home: {
    hero: "/assets/images/hero/yunseul-hero-wide.jpg",
    heroMobile: pageAsset("hero-mobile"),
    spaceSlide: "/assets/images/clinic-lounge.jpg",
    procedures: {
      eye: "/assets/images/model-front.jpg",
      nose: "/assets/images/model-profile.jpg",
      contour: pageAsset("home-contour"),
      lifting: pageAsset("home-lifting"),
    },
    cases: Object.fromEntries(
      ["eye", "nose", "contour", "lifting"].map((key) => [
        key,
        pageAsset(`home-case-${key}`),
      ]),
    ),
    stories: {
      eye: pageAsset("journal-eye"),
      nose: pageAsset("journal-nose"),
      equipment: "/assets/images/equipment/skin-analysis-camera.jpg",
    },
    spaces: {
      consultation: "/assets/images/facility/consultation-lounge.jpg",
      treatment: "/assets/images/facility/treatment-room.jpg",
      recovery: "/assets/images/facility/recovery-room.jpg",
    },
    care: "/assets/images/consultation-room.jpg",
  },
  about: {
    reception: pageAsset("about-reception"),
    sterilization: "/assets/images/equipment/sterilization-station.jpg",
    skinCare: "/assets/images/equipment/led-treatment-device.jpg",
  },
  doctors: pageAsset("doctor-consultation"),
  consultation: pageAsset("booking-consultation"),
  location: pageAsset("location-entrance"),
  directory: Object.fromEntries(
    ["eye", "nose", "contour", "lifting"].map((key) => [
      key,
      pageAsset(`directory-${key}`),
    ]),
  ),
  details: Object.fromEntries(
    ["eye", "nose", "contour", "lifting"].map((key) => [
      key,
      pageAsset(`detail-${key}`),
    ]),
  ),
  cases: Object.fromEntries(
    [
      "eye",
      "nose",
      "contour",
      "breast",
      "body",
      "skin",
      "revision",
      "male",
      "lifting",
    ].map((key) => [key, `/assets/images/cases/${key}-before-after.jpg`]),
  ),
};

export function contentImageAssignments(value = pageImages, prefix = "") {
  return Object.entries(value).flatMap(([key, item]) => {
    const slot = prefix ? `${prefix}.${key}` : key;
    return typeof item === "string"
      ? [{ slot, src: item }]
      : contentImageAssignments(item, slot);
  });
}
