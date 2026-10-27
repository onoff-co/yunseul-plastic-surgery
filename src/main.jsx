import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pages.css";
import "./styles/refinements.css";
import "./styles/interior.css";
import "./styles/content-guide.css";
import "./styles/clinic-polish.css";
import "./styles/treatments.css";
import "./styles/studio-design.css";
import "./styles/nana-inspired.css";
import "./styles/yunseul-redesign.css";
import "./styles/image-layout.css";
import "./styles/interaction-upgrade.css";
import "./styles/typography.css";
import "./styles/cases.css";
import "./styles/procedure-detail.css";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
