import { useEffect, useRef } from "react";

// 가로로 스크롤되는 목록에서 현재 항목(aria-current)이 화면 안에 보이도록 맞춘다.
// 페이지 세로 스크롤은 건드리지 않는다.
export default function useCurrentInView() {
  const listRef = useRef(null);
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector("[aria-current]");
    if (!list || !current || list.scrollWidth <= list.clientWidth) return;
    list.scrollLeft = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
  }, []);
  return listRef;
}

