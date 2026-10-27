import { findSubProcedure } from '../data/subProcedures.mjs';

export const pageRoutes = {
  '/': { page: 'home', title: '나를 이해하는 상담' },
  '/about': { page: 'about', title: '병원 소개', english: 'About Yunseul' },
  '/procedures': { page: 'procedures', title: '시술 안내', english: 'Procedures' },
  '/doctors': { page: 'doctors', title: '의료진', english: 'Doctors' },
  '/cases': { page: 'cases', title: '이미지 비교', english: 'Image Guide' },
  '/reviews': { page: 'reviews', title: '후기', english: 'Reviews' },
  '/pricing': { page: 'pricing', title: '비용 안내', english: 'Pricing' },
  '/notices': { page: 'notices', title: '공지사항·이벤트', english: 'Notice' },
  '/faq': { page: 'faq', title: '자주 묻는 질문', english: 'FAQ' },
  '/location': { page: 'location', title: '방문 안내', english: 'Location' },
  '/consultation': { page: 'consultation', title: '상담 준비', english: 'Consultation' },
  '/privacy': { page: 'privacy', title: '개인정보처리방침', english: 'Privacy' },
  '/terms': { page: 'terms', title: '이용약관', english: 'Terms' },
};

export function resolveRoute(pathname, procedures) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (pageRoutes[path]) return pageRoutes[path];
  const match = path.match(/^\/procedures\/([^/]+)(?:\/([^/]+))?$/);
  const procedure = match && procedures.find(item => item.slug === match[1]);
  if (procedure && !match[2]) return { page: 'procedureDetail', title: procedure.name, slug: procedure.slug };
  const sub = procedure && findSubProcedure(procedure.slug, match[2]);
  if (sub) return { page: 'subProcedure', title: sub.name, slug: procedure.slug, sub: sub.slug };
  return { page: 'notFound', title: '페이지를 찾을 수 없습니다' };
}
