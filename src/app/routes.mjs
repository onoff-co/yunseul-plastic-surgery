export const pageRoutes = {
  '/': { page: 'home', title: '나를 이해하는 상담' },
  '/about': { page: 'about', title: '병원 소개' },
  '/procedures': { page: 'procedures', title: '시술 안내' },
  '/doctors': { page: 'doctors', title: '의료진' },
  '/cases': { page: 'cases', title: '이미지 비교' },
  '/reviews': { page: 'reviews', title: '후기' },
  '/pricing': { page: 'pricing', title: '비용 안내' },
  '/notices': { page: 'notices', title: '공지사항·이벤트' },
  '/faq': { page: 'faq', title: '자주 묻는 질문' },
  '/location': { page: 'location', title: '방문 안내' },
  '/consultation': { page: 'consultation', title: '상담 준비' },
  '/privacy': { page: 'privacy', title: '개인정보처리방침' },
  '/terms': { page: 'terms', title: '이용약관' },
};

export function resolveRoute(pathname, procedures) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (pageRoutes[path]) return pageRoutes[path];
  const match = path.match(/^\/procedures\/([^/]+)$/);
  const procedure = match && procedures.find(item => item.slug === match[1]);
  if (procedure) return { page: 'procedureDetail', title: procedure.name, slug: procedure.slug };
  return { page: 'notFound', title: '페이지를 찾을 수 없습니다' };
}
