import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Layout from "./components/Layout";
import NoMatch from "./components/NoMatch";
import config from "../config.json";
import "./styles/index.css";
import UrlDrive from "./pages/UrlDrive";
import RedirectToMyDrive from "./pages/Drive/RedirectToMyDrive";

const publishableKey = config.CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RedirectToMyDrive />} />
            <Route path="/drive" element={<RedirectToMyDrive />} />
            <Route path="/drive/:id" element={<UrlDrive />} />
            <Route path="/short-url" element={<App/>}/>
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
