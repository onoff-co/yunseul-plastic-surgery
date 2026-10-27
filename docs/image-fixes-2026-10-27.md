# 페이지별 이미지 잘림·중복 수정

## 적용 내용

- 콘텐츠 이미지 41개 슬롯을 `src/data/pageImages.mjs`에서 분리 배정했다. 로고는 공통 브랜드 자산이므로 예외다.
- 새 이미지 21장을 내장 이미지 생성 도구로 제작했다. 원본은 `public/assets/images/pages/*.png`, 웹용 파일은 같은 폴더의 `*.jpg`에 저장했다. 기존 원본은 삭제하지 않았다.
- `ContentImage.jsx`가 실제 이미지 크기를 사용해 로딩 전부터 원본 비율을 확보한다. `imageSizes.mjs`에 41개 이미지의 실제 너비와 높이를 기록했다.
- `image-layout.css`에서 사진을 고정 프레임에 확대하던 스타일을 해제했다. `object-fit: contain`, 실제 비율, 자동 높이를 사용하며 이미지 위의 캡션도 분리했다.
- 이미지가 잘리는 확대 호버는 밝기 변화로 교체했다. 버튼·텍스트 링크 동작은 유지했다.
- 모바일 메인은 별도 세로 이미지를 `<picture>`로 선택한다. 데스크톱 가로 이미지를 잘라 확대하지 않는다.
- 메인의 촬영 각도 이미지와 비교 페이지의 AI 생성 이미지는 서로 다르다. 각도 이미지는 전후 결과로 표현하지 않는다.
- 반복 시설 갤러리는 홈의 공간 미리보기로 연결하고, 시술 상세의 반복 장비 갤러리는 병원 소개의 장비 안내로 연결했다.

## 페이지 배정

| 페이지·영역 | 이미지 |
| --- | --- |
| 홈 메인 | 기존 가로 비주얼 + 모바일 전용 `hero-mobile`, 공간 슬라이드는 `clinic-lounge` |
| 홈 진료 선택 | 눈·코 기존 이미지 각 1장, 윤곽·리프팅 전용 이미지 각 1장 |
| 홈 사례 미리보기 | `home-case-eye`, `home-case-nose`, `home-case-contour`, `home-case-lifting` |
| 홈 읽을거리 | `journal-eye`, `journal-nose`, 피부 분석 장비 |
| 홈 공간·진료 과정 | 기존 상담실·시술실·회복실·진료실 사진을 각 영역에서 한 번씩 사용 |
| 병원 소개 | `about-reception`, 멸균 장비, 피부 관리 장비 |
| 의료진 | `doctor-consultation` AI 생성 상담 장면 |
| 진료 목록 | `directory-eye`, `directory-nose`, `directory-contour`, `directory-lifting` |
| 진료 상세 | `detail-eye`, `detail-nose`, `detail-contour`, `detail-lifting` |
| 상담 예약 | `booking-consultation` |
| 방문 안내 | `location-entrance` AI 생성 외관 이미지 |
| 이미지 비교 페이지 | 부위별 AI 생성 이미지 9장, 다른 영역에 재사용하지 않음 |

동일 슬롯의 반응형 `<picture>` 소스와 영상 포스터는 해당 비주얼의 표현 방식이다. 별도 섹션에 같은 콘텐츠 사진을 반복 배치하지 않는다.

## 생성 프롬프트 세트

방식: 내장 image generation. 외부 병원의 이미지나 영상을 가져오지 않았다. 프롬프트 공통 조건은 다음과 같다.

> Single photorealistic editorial photograph for a Korean plastic surgery information website. Warm ivory, sand, walnut and soft natural daylight. Natural skin texture and modest fully clothed styling. Entire head, hair, chin, neck and shoulders inside the frame with generous safety margins. No readable text, labels, logos, watermark, before/after result claims or collage.

아래 개별 용도·구도 조건을 공통 조건에 추가했다.

| 최종 파일명 (`public/assets/images/pages/`) | 개별 프롬프트 조건 |
| --- | --- |
| `directory-eye.png` / `.jpg` | 4:3 landscape, Korean woman around 28, straight shoulder-length hair, relaxed eyes looking at camera, ivory top, full head and shoulders. |
| `directory-nose.png` / `.jpg` | 4:3 landscape, Korean woman around 32 with short dark bob, three-quarter profile facing left, beige crew-neck top, entire profile inside safe margins. |
| `directory-contour.png` / `.jpg` | 4:3 landscape, Korean woman around 30, hair tied back, front view, sand blouse, natural facial proportions, full jaw and ears. |
| `directory-lifting.png` / `.jpg` | 4:3 landscape, Korean woman around 50 with neat short hair, normal fine lines, gentle smile and ivory blouse, no age transformation. |
| `detail-eye.png` / `.jpg` | 4:3 landscape, different woman around 34 with softly wavy medium hair and cream crew-neck blouse, warm grey backdrop, full upper torso. |
| `detail-nose.png` / `.jpg` | 4:3 landscape, woman around 29 with hair tucked behind ears, complete side profile toward right, pale ivory backdrop, full head and upper torso. |
| `detail-contour.png` / `.jpg` | 4:3 landscape, woman around 38 with low bun and cream linen shirt, three-quarter view, natural jawline and full shoulders. |
| `detail-lifting.png` / `.jpg` | 4:3 landscape, woman around 56 with shoulder-length hair and slight greying, natural fine lines, ivory shirt, no rejuvenation comparison. |
| `home-contour.png` / `.jpg` | 4:3 landscape, woman around 26 with long straight dark hair behind ears, three-quarter pose left, sand top and full head. |
| `home-lifting.png` / `.jpg` | 4:3 landscape, woman around 47 with dark bob and normal fine lines, taupe shirt, full head and upper torso. |
| `journal-eye.png` / `.jpg` | 4:3 clinical still life, walnut desk, hand mirror, eye line drawing, pen and spectacles; clinician's hands pointing to paper, no readable text or faces cut at the edge. |
| `journal-nose.png` / `.jpg` | 4:3 clinical still life, complete matte ivory anatomical head teaching model in profile, unbranded caliper and blank notebook on walnut desk. |
| `about-reception.png` / `.jpg` | 16:9 architectural reception lobby, complete limestone desk and waiting bench, ivory plaster, walnut cabinetry and daylight, no signage or people. |
| `doctor-consultation.png` / `.jpg` | 4:3 fictional female physician and adult visitor at a walnut consultation desk, both complete heads and upper bodies visible, no procedure occurring, no real doctor's likeness. |
| `booking-consultation.png` / `.jpg` | 4:3 private consultation table, two cream chairs, blank clipboard, pen and water glass, complete table and chairs visible, no people. |
| `location-entrance.png` / `.jpg` | 16:9 anonymous fictional Seoul commercial building entrance, glass doors, ivory stone surround, complete canopy and sidewalk, no real business identifiers. |
| `home-case-eye.png` / `.jpg` | 16:9 two equal panels, same fictional woman around 31, front and slight three-quarter consultation views, entire heads; no anatomical change or before/after claim. |
| `home-case-nose.png` / `.jpg` | 16:9 two equal panels, same woman around 36 with tied hair, front and complete side profile, same natural nose in both. |
| `home-case-contour.png` / `.jpg` | 16:9 two equal panels, same woman around 29 with bob, front and three-quarter views, same facial proportions in both. |
| `home-case-lifting.png` / `.jpg` | 16:9 two equal panels, same woman around 53, front and three-quarter views, identical age and natural fine lines in both. |
| `hero-mobile.png` / `.jpg` | Edit companion of existing AI hero: preserve identity, dark hair, ivory blouse and daylight; recompose/extend to vertical 4:5 with complete head, chin, shoulders and upper torso, safe margin on every side. |

## 주요 변경 파일

- `src/data/pageImages.mjs`: 슬롯별 이미지 소유와 중복 방지.
- `src/data/imageSizes.mjs`: 원본 크기.
- `src/components/shared/ContentImage.jsx`: 실제 크기와 비율을 반영하는 이미지.
- `src/styles/image-layout.css`: 페이지별 잘림 방지, 모바일·데스크톱 이미지 레이아웃.
- 홈 섹션, 진료 목록·상세, 병원 소개·의료진·상담·위치·사례 페이지: 전용 이미지 연결.
- `tests/images.test.mjs`: 경로·크기 메타데이터·중복 URL·동일 파일 복사·분야별 분리 검사.

## 검증

- 테스트 12건 통과.
- 실브라우저 17개 경로 × 1440·768·390px = 51개 화면 검사.
- 검사 결과: 잘림·상위 컨테이너 클리핑·이미지 깨짐·동일 페이지 중복·가로 넘침·브라우저 예외 없음.
- 콘텐츠 41개 슬롯의 URL과 SHA-256 파일 해시가 각각 고유함을 확인했다. 서로 다른 파일명으로 동일 파일을 복사한 경우도 테스트가 실패한다.
- 스크린샷: `.taste-skill/image-audit/`. 생성 이미지 검토: `.taste-skill/image-proof.jpg`.
- 메인 진료·사례·공간 선택에서도 전용 이미지가 바뀌고 영상이 정상 재생·일시정지되는 것을 확인했다.
- 설치 의존성은 추가하지 않았다. 실행 `npm.cmd run dev`, 검증 `npm.cmd test`, 빌드 `npm.cmd run build`.

이미지는 AI 생성 콘셉트로 제작했다. 실제 의료진·건물·환자 사진이나 실제 시술 결과로 표시하지 않는다.
