import ContentSections from "../../components/shared/ContentSections.jsx";
import { pageContent } from "../../data/pageContent.mjs";
import PageLayout from "../../components/layout/PageLayout.jsx";
import LocationSection from "../../components/home/LocationSection.jsx";

export default function Location() {
  return (
    <PageLayout title="방문 안내">
      <LocationSection />
      <ContentSections
        title="방문을 준비하는 순서"
        items={pageContent.location}
      />
    </PageLayout>
  );
}
