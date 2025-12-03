import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";


import GalleryPage from "./pages/GalleryPage";
import UploadPage from "./pages/UploadPage";
import PhotoDetails from "./components/PhotoDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/upload-photo" index element={<UploadPage />} />
         <Route path="/photo/:id" element={<PhotoDetails />} />
      </Routes>
      ;
    </BrowserRouter>
  );
}

export default App;
