// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Route } from "react-router-dom";

import "./App.scss";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
