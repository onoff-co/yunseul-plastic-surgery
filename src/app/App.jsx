import Home from "../pages/home/Home.jsx";
import ProcedureDetail from "../pages/procedures/ProcedureDetail.jsx";
import SubProcedure from "../pages/procedures/SubProcedure.jsx";
import About from "../pages/about/About.jsx";
import Procedures from "../pages/procedures/Procedures.jsx";
import Doctors from "../pages/doctors/Doctors.jsx";
import Location from "../pages/location/Location.jsx";
import Consultation from "../pages/consultation/Consultation.jsx";
import Collections from "../pages/collections/Collections.jsx";
import Cases from "../pages/collections/Cases.jsx";
import NotFound from "../pages/NotFound.jsx";
import { resolveRoute } from "./routes.mjs";
import { procedures } from "../data/procedures.mjs";
import { useEffect } from "react";
import { fromSitePath } from "./paths.mjs";

const pages = { home: Home, about: About, procedures: Procedures, doctors: Doctors, cases: Cases, reviews: Collections, pricing: Collections, notices: Collections, faq: Collections, location: Location, consultation: Consultation, privacy: Collections, terms: Collections, notFound: NotFound };

export default function App() {
  const route = resolveRoute(fromSitePath(window.location.pathname), procedures);
  useEffect(() => { document.title = `${route.title} | 윤슬성형외과`; }, [route.title]);
  if (route.page === 'procedureDetail') return <ProcedureDetail slug={route.slug} />;
  if (route.page === 'subProcedure') return <SubProcedure slug={route.slug} sub={route.sub} />;
  const Page = pages[route.page];
  return <Page kind={route.page} />;
}
