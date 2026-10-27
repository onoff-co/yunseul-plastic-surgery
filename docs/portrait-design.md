# 인물 이미지와 상세페이지

## 참고 구성

- https://www.k-wonjin.co.kr/landing/common_event : 분야별 프로그램 탐색 및 상담 진입을 참고했다. 가격이나 후기 원문은 가져오지 않았다.
- https://daprs.com/eye/semiout.php : 인물 중심 소개, 설명, 회복 정보, FAQ의 콘텐츠 계층을 참고했다.
- https://daprs.com/nose/cartilage.php : 분야별 설명과 상담에 이르는 긴 상세페이지 구성을 참고했다. 수술법·성과 주장은 복제하지 않았다.

윤슬 구현: 분야 전환, 고정 목차, 고민 항목, 상담 기준, 회복 안내, FAQ, 상담 양식. 확인되지 않은 의료진 정보·비용·후기는 게시하지 않는다. 하단 상담 링크는 선택한 진료 분야를 상담 페이지에 전달한다.
기존 editorial-report 방향과 색상, 메인 좌측 스크롤 연동은 유지했다.

## 생성 에셋

Built-in image_gen 사용. 실제 인물·환자·의료진이 아닌 AI 생성 인물 이미지다. 실제 전후 비교 자료로 사용하지 않는다.
- public/assets/images/model-front.png: 메인, 눈 성형, 윤곽, 진료 목록.
- public/assets/images/model-profile.png: 메인 시술 탐색 장면, 코 성형, 리프팅, 진료 목록.

## 최종 프롬프트

### 정면

Use case: photorealistic-natural. Asset: portrait for Korean aesthetic clinic website Yunseul. Create a premium editorial studio photograph of one fictional Korean woman age 28, natural subtle makeup, realistic skin texture, calm confident gentle expression, dark hair tucked behind ears, wearing a modest ivory sleeveless high-neck top. Head and shoulders to mid chest, full head visible with generous margin above and at both sides, looking toward camera with slight three-quarter turn. Vertical 2:3 composition. Soft warm window light, matte pale warm grey background, restrained ivory and navy brand atmosphere. Facial proportions natural, no excessive retouching, no hands, no text, no watermark, no medical equipment. This is a fictional advertising model, not a patient, no before-after comparisons.

### 측면

Use case: photorealistic-natural. Asset: facial profile editorial portrait for Korean aesthetic clinic Yunseul nose/contour/lifting detail pages. One fictional Korean woman age 42, graceful natural expression, realistic skin with subtle age-appropriate fine lines, dark hair loosely tied back, ivory linen boat-neck top. Three-quarter side profile facing left, whole head, neck and upper torso visible, head at center with generous empty margins, vertical 2:3 composition. Pale warm stone-grey studio background and soft diffused window light, elegant natural makeup, premium restrained beauty editorial, warm neutral tones. Do not imitate a celebrity. No hands, no text, no logos, no surgical markings or before/after, no medical result claims.

## 확인되지 않은 데이터

이전에 작성한 미확인 가격·후기·성과 데이터는 삭제했다. 검증된 병원 가격·후기·통계가 확보되기 전에는 공개하지 않는다.

## 검증 범위

빌드와 경로 테스트, 에셋 존재, 진료 선택 검증, 실제 브라우저의 상세 이동·비용 목차·상담 선택 전달·모바일 레이아웃을 확인한다. 접수 백엔드는 연결되어 있지 않으며 입력 정보는 전송·저장되지 않는다.
