import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PhotoDetails from "../components/PhotoDetails"; 

const GalleryPage = () => {
  const [data, setData] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const gallery = JSON.parse(localStorage.getItem("gallery") || "[]");
    setData(gallery);
  }, []);

  const handleBack = () => {
    setSelectedPhoto(null);
  };


  if (selectedPhoto) {
    return <PhotoDetails photo={selectedPhoto} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white">
  
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-black">Gallery</h1>

        <Link to="/upload-photo">
          <button className="px-4 py-2 bg-black text-white flex items-center gap-2 font-semibold rounded-md hover:bg-gray-900 transition">
            <span>Upload</span>
            <IoCloudUploadOutline size={20} />
          </button>
        </Link>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.length === 0 && <p>No photos uploaded yet.</p>}

        {data.map((item) => (
          <div
  key={item.id}
  onClick={() => setSelectedPhoto(item)}
  className="cursor-pointer border border-gray-300 rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md"
>
  <div className="w-full h-40 sm:h-44 md:h-48 flex items-center justify-center bg-gray-100">
    <img
      src={item.image}
      alt={item.title}
      className="max-w-full max-h-full object-contain"
    />
  </div>
  <p className="text-center mt-2 text-black font-medium text-sm sm:text-base">
    {item.title}
  </p>
</div>

        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
