import { StrictMode } from "react";

import "regenerator-runtime";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* createBrowserRouter()  и здесь указать basename:"variant-v1" */}

    {/* <VoiceoverProvider> */}
      <App />
    {/* </VoiceoverProvider> */}
  </StrictMode>
);
