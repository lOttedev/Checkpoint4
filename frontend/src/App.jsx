/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Guitares from "./pages/Guitares";
import GuitareCustom from "./pages/GuitareCustom";
import Footer from "./components/Footer";
import ProfilPage from "./pages/ProfilPage";
import CurrentUserContextProvider from "./context/useCurrentUserContext";

function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedElem, setSelectedElem] = useState("");

  const handleImageSelect = (image, elem) => {
    setSelectedImage(image);
    setSelectedElem(elem);
  };
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/guitares" element={<Guitares />} />
          <Route
            path="/guitares/:id"
            element={<GuitareCustom onCustomSelect={handleImageSelect} />}
          />
          <Route
            path="/profil/:id"
            element={
              <ProfilPage
                selectedImage={selectedImage}
                selectedElem={selectedElem}
              />
            }
          />
        </Routes>
        <Footer />
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;
