// 윤슬(물 위에 반짝이는 빛)을 그린 장식. 햇빛이 수면에 만드는 세로 빛길을 따라
// 빛조각이 모이고, 가까운 쪽(아래)일수록 길고 밝다. 같은 seed는 같은 무늬를 만든다.
function pattern(seed, count) {
  let state = seed * 9973 + 1;
  const random = () => (state = (state * 16807) % 2147483647) / 2147483647;
  const gaussian = () => (random() + random() + random() - 1.5) / 1.5;
  const center = 1440 * (0.38 + random() * 0.24);
  const flecks = Array.from({ length: count }, (_, index) => {
    const scattered = index % 4 === 0;
    const depth = random();
    const y = 30 + depth * 360;
    const x = scattered ? random() * 1440 : center + gaussian() * (90 + depth * 420);
    const closeness = 1 - Math.min(1, Math.abs(x - center) / (140 + depth * 460));
    return {
      x,
      y,
      length: 3 + depth * (8 + random() * 44) * (scattered ? 0.5 : 1),
      width: 0.8 + depth * 1.4,
      opacity: scattered ? 0.12 + random() * 0.2 : 0.25 + closeness * 0.65 * (0.5 + random() * 0.5),
      delay: random() * 7,
      duration: 3 + random() * 5,
    };
  });
  return { center, flecks };
}

export default function YunseulLight({ seed = 7, count = 170, className = "" }) {
  const { center, flecks } = pattern(seed, count);
  const glow = `yunseul-glow-${seed}`;
  return (
    <svg
      className={`yunseul-light ${className}`.trim()}
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={glow} cx="50%" cy="100%" r="50%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={center} cy="400" rx="620" ry="380" fill={`url(#${glow})`} stroke="none" />
      {flecks.map((fleck, index) => (
        <line
          key={index}
          x1={fleck.x}
          x2={fleck.x + fleck.length}
          y1={fleck.y}
          y2={fleck.y}
          strokeWidth={fleck.width}
          style={{
            "--fleck-opacity": fleck.opacity.toFixed(2),
            animationDelay: `${fleck.delay.toFixed(2)}s`,
            animationDuration: `${fleck.duration.toFixed(2)}s`,
          }}
        />
      ))}
    </svg>
  );
}
