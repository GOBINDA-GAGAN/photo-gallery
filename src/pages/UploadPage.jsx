import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiArrowLeft } from "react-icons/fi";

const UploadPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image || !formData.name) {
      alert("Please enter a name and select an image");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageBase64 = reader.result;

      const newPhoto = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        image: imageBase64,
      };

      const existing = JSON.parse(localStorage.getItem("gallery") || "[]");
      existing.push(newPhoto);
      localStorage.setItem("gallery", JSON.stringify(existing));

      alert("Photo uploaded successfully!");
      navigate("/"); 
    };

    reader.readAsDataURL(formData.image);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white border border-gray-200 shadow-sm p-6 rounded-2xl relative"
      >

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-1 text-gray-700 hover:text-black"
        >
          <FiArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
          Upload Photo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-4">
              <span className="text-gray-800 font-medium">Title</span>
              <input
                type="text"
                name="name"
                placeholder="Enter title"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-300 focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-gray-800 font-medium">Description</span>
              <textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-gray-300 focus:outline-none"
              />
            </label>
          </div>

          <div
            className="border-2 border-dashed rounded-xl p-4 flex flex-col justify-center items-center cursor-pointer hover:border-black hover:bg-gray-100"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="fileInput"
            />

            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center flex flex-col items-center gap-2">
                <FiUpload size={40} className="text-gray-500" />
                <p className="text-gray-700 font-medium">
                  Drag & Drop Image Here
                </p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
            )}
          </div>
        </div>


        <button
          type="submit"
          className="w-full mt-6 bg-gray-900 text-white py-2 rounded-md hover:bg-black transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
