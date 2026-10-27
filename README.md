# Yunseul Plastic Surgery

성형외과 웹사이트 작업 폴더입니다.

## 현재 구현

- React 19 + Vite 기반 홈 및 독립 상세페이지
- 전체 폭 메인 이미지, 진료 선택 패널, 분야별 이미지 비교와 공간 영상
- 병원 소개, 시술 안내, 의료진 정보, 이미지 비교, FAQ, 상담 양식, 방문 안내
- 상담 폼의 필드별 오류 안내, 모바일 메뉴, PC 호버·키보드 하위 메뉴
- 헤더 메뉴는 독립 URL로 이동하며, 1024px 이상에서 메뉴를 나열
- 경로 설정과 해석: `src/app/routes.mjs`

현재 확인되지 않은 주소·연락처·진료시간·의료진 경력·가격·후기는 게시하지 않습니다. AI 생성 이미지는 실제 환자 사진이나 시술 결과로 표시하지 않습니다. 상담 양식은 입력 내용을 확인하며 전송·저장하지 않습니다.

최신 UI 변경 파일, 참고 사이트 분석, 검증 결과와 제작된 영상은 [리디자인 기록](docs/redesign-2026-10.md)에 정리했습니다.

페이지별 이미지 잘림 수정과 전용 이미지 21장, 중복 방지 검증은 [이미지 수정 기록](docs/image-fixes-2026-10-27.md)을 확인하세요.

반투명 메뉴, 상세페이지 개편, 사진 드래그 비교와 3×3 앨범은 [인터랙션 개선 기록](docs/interaction-upgrade-2026-10-27.md)에 정리했습니다.

전체 페이지의 한국어 줄바꿈과 읽기 너비, 화면별 검증 결과는 [타이포그래피 수정 기록](docs/typography-2026-10-27.md)을 확인하세요.

## 디렉터리

```text
src/
  app/                 # 앱 진입 컴포넌트와 URL 매칭
  pages/
    home/
    about/
    procedures/        # 시술 목록과 분야별 상세
    doctors/
    location/
    consultation/
    NotFound.jsx
  components/
    layout/            # 헤더, 푸터, 공통 상세페이지 레이아웃
    shared/            # 아코디언, 상담 폼
    home/              # 메인 섹션과 스크롤 비주얼
  data/                # 메뉴, 병원, 시술, 의료진, FAQ
  styles/              # 공통 및 페이지 스타일
  main.jsx
public/assets/images/  # 원본 PNG와 최적화한 웹용 JPEG
public/assets/video/   # 이미지 기반 상담 공간 영상
scripts/               # 이미지 최적화와 공간 영상 생성
tests/                 # URL 매칭 및 탐색 테스트
docs/                  # 사이트맵, 이미지 생성 기록
```

## 페이지 이동과 배포

메뉴 이동은 일반 링크로 독립 URL을 엽니다. 브라우저 뒤로가기와 새로고침을 지원하며, 페이지별 제목을 설정합니다.
GitHub Pages는 저장소 경로 `/yunseul-plastic-surgery/` 아래에 배포합니다. `.github/workflows/deploy-pages.yml`이 `main` 푸시 시 테스트·빌드 후 `dist`를 배포합니다. 저장소 설정의 Pages 배포 소스는 **GitHub Actions**로 선택해야 합니다. 상세 URL 직접 접근은 `public/404.html`이 홈으로 전달한 뒤 원래 경로를 복원합니다.

## 실행

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd test
```

개발 서버: `http://127.0.0.1:5173/yunseul-plastic-surgery/`

