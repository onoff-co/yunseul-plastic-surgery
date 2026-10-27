# 페이지 콘텐츠 작성 근거

## 확인한 참고 자료

- 사용자 제공 게시물: https://hershe9.com/index.php/board/view/focus/35/135426/cpage/1
  - 어깨필러 홍보 게시물. 이미지 중심의 설명, 분야별 탐색, 상담 연결을 참고.
- 병원 소개: https://hershe9.com/Introduction/hershe-plastic-surgery-kr-pc
  - 진료 철학과 상담 경험을 소개하는 구성 참고.
- 눈 성형: https://hershe9.com/eyes/double-eyelid-surgery-kr-pc
  - 개요, 상담 고민, 분야별 설명, 회복 질문이라는 정보 순서 참고.
- 코 성형: https://hershe9.com/plasticsurgery/rhinoplasty-kr-pc
  - 세부 고민을 구분하여 안내하는 구성 참고.
- 리프팅: https://hershe9.com/lift/dualplane-lift-kr-pc
  - 고민 부위, 상담 항목, 계획과 회복 설명의 연결 참고.
- 에이비성형외과 안면윤곽: https://www.abps.co.kr/page/safety_contour
  - 세부 메뉴, 구조 설명, 안전·회복·상담으로 이어지는 상세페이지 순서 참고.
- 에이비성형외과 눈·코·윤곽·가슴 대표 페이지:
  - https://www.abps.co.kr/page/double_eyelid
  - https://www.abps.co.kr/page/nose_revision
  - https://www.abps.co.kr/page/contour
  - https://www.abps.co.kr/page/abcde_breast
  - 시술 유형을 나누고 질문·과정·이미지로 설명하는 방식 참고. 고유 문구와 환자 자료는 사용하지 않음.
- 미국성형외과학회(ASPS):
  - https://www.plasticsurgery.org/cosmetic-procedures/rhinoplasty/procedure
  - https://www.plasticsurgery.org/cosmetic-procedures/eyelid-surgery/recovery
  - https://www.plasticsurgery.org/cosmetic-procedures/facelift/safety
  - 방법·회복·위험에 관한 일반 안내를 확인하는 데 사용.

소개·시술 페이지는 웹 검색 도구의 직접 수집이 실패하여 실제 브라우저로 열어 본문을 확인했다.

## 적용 범위

윤슬의 기존 메뉴와 네 시술 카테고리를 유지했다. 원문을 전재하지 않고 상담 준비를 돕는 독자적인 문장으로 작성했다.
어깨필러·바디성형 서비스, 타 병원의 고유 시술명, 연혁, 전문의 경력, 장비 보유, 인증, 통계, 가격, 시술시간 및 효과 지속기간을 윤슬의 사실로 옮기지 않았다.
안면 윤곽은 참고 사이트에서 동일한 카테고리를 검증하지 않았으므로, 기존 윤슬 카테고리에 맞춘 상담 질문 중심의 신규 초안이다.
사진과 환자 사례는 참고 사이트에서 가져오지 않았다.

## 수정 위치

| 내용 | 파일 |
| --- | --- |
| 소개·의료진·방문·상담 안내 문구 | src/data/pageContent.mjs |
| 시술별 고민·상담 항목·회복 질문 | src/data/procedureDetails.mjs |
| 홈·상담 페이지 공통 FAQ | src/data/faq.mjs |
| 공통 본문 출력 | src/components/shared/ContentSections.jsx |
| 눈·코·윤곽·리프팅 세부 진료 항목과 상담 흐름 | src/data/procedureGuides.mjs |
| 상세페이지 이미지 및 세부 진료 배치 | src/pages/procedures/ProcedureDetail.jsx, src/styles/procedure-guide.css |

## 새 교육용 이미지

`public/assets/images/education/`의 `eye-structure.png`, `nose-structure.png`, `contour-structure.png`, `lifting-layers.png`를 기본 제공 이미지 생성 도구로 제작했다. 앞의 세 장은 해당 부위의 구조를 설명하는 삽화이며 마지막 장은 피부 지지층을 연상시키는 추상 이미지다. 실제 환자·수술 결과·병원 시설을 나타내지 않는다. 생성 프롬프트는 각각 눈꺼풀 층과 눈 뜨는 움직임, 콧대·코끝·비중격, 광대·턱각·턱끝, 탄력과 지지층을 주제로 했으며 공통으로 아이보리 배경, 절제된 금색, 문자·로고·전후 비교 제외를 지정했다.

## 실제 운영 정보 확인 필요

- 의료진 이름·자격·학력·경력은 검증 가능한 자료를 확보하기 전 게시하지 않는다.
- 전화번호·주소·진료시간은 확인된 정보가 없어 현재 게시하지 않는다.
- 이동 시간은 위치가 확인된 뒤 검증할 수 있다.
- 상담 양식은 서버에 전송되지 않는다. 예약 확정이나 정상 접수로 안내하지 않는다.
- 진료 범위와 의료 설명은 실제 담당 의료진이 최종 확인해야 한다. 특정 결과나 회복 기간은 보장하지 않았다.
