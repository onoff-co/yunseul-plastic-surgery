import PageLayout from "../components/layout/PageLayout.jsx";
export default function NotFound() {
  return (
    <PageLayout
      title="페이지를 찾을 수 없습니다."
      description="주소를 확인하거나 아래 메뉴에서 원하는 페이지를 찾아주세요."
    >
      <div className="interior-actions">
        <a className="button button-dark" href="/">
          홈으로
        </a>
        <a className="text-link" href="/procedures">
          시술 안내
        </a>
      </div>
    </PageLayout>
  );
}
