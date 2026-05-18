# Asset Structure

## 목적

이 문서는 시안을 실제 구현 자산으로 쪼갤 때의 책임 단위를 정의한다.
핵심은 `디자이너가 보기 좋은 보드`가 아니라 `개발자가 그대로 연결할 수 있는 구조`다.

---

## 기준 자산 폴더

### reference source

- `public/reference-design/source/reference-board-scene.svg`
- `public/reference-design/source/reference-board-turtle-ui.svg`

설명:

- 원본 보드를 보관하는 용도다.
- 개발용 최종 자산이 아니라 판단 기준이다.

### reference preview

- `public/reference-design/png/reference-board-scene.png`
- `public/reference-design/png/reference-board-turtle-ui.png`

설명:

- 빠른 시각 확인용이다.
- 구현 연결 시 이 이미지를 그대로 UI 자산처럼 쓰지는 않는다.

---

## 목표 자산 구조

### background-scene

역할:

- 앱 전체 장면의 베이스 레이어

포함:

- 하늘
- 언덕
- 길
- 꽃
- 나무

제외:

- 거북이
- 표지판
- 물그릇
- 당근
- 깃발
- UI

### scene-objects

역할:

- 경로 위 의미 오브젝트

자산 목록:

- `scene-sign-start`
- `scene-water-bowl`
- `scene-carrot`
- `scene-sign-arrow`
- `scene-flag-finish`

규칙:

- 각 자산은 독립 배치 가능해야 한다.
- 배경이 없어도 읽히되, 과하게 플랫해지면 안 된다.
- 원본 장면의 비율과 방향을 유지한다.

### turtle-states

역할:

- 세션 상태에 따라 바뀌는 메인 캐릭터

자산 목록:

- `turtle-walking`
- `turtle-resting`
- `turtle-cheerful`

규칙:

- 같은 거북이처럼 보여야 한다.
- walking을 기준 상태로 삼는다.
- resting은 낮고 편안하게 눕는다.
- cheerful은 walking 기반에서 표정만 더 밝아지는 쪽을 우선한다.
- 1.10.17의 장면 속 등껍질 디테일을 반영한다.
- 1.19.02의 얼굴과 자세 차이를 우선 참고한다.

### ui-overlays

역할:

- 장면을 보조하는 얇은 상호작용 층

구성 목록:

- `setup-time-picker`
- `focus-hud`
- `care-moments`
- `completion-overlay`

규칙:

- 장면보다 앞에 나서지 않는다.
- 거대한 카드형 박스가 되지 않는다.
- 필요할 때만 조용히 올라온다.

---

## 제작 순서

1. `background-scene`
2. `scene-objects`
3. `turtle-states`
4. `ui-overlays`
5. 실제 앱 반영

---

## 금지 사항

- 한 장짜리 보드 이미지를 그대로 구현 구조로 간주하지 않는다.
- 배경과 오브젝트를 한 파일에 다시 합치지 않는다.
- 거북이를 상태별로 다른 캐릭터처럼 새로 해석하지 않는다.
- 구현 단계에서 CSS로 캐릭터 형태를 재조립하지 않는다.
