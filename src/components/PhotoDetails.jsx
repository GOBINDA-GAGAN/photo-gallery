

const PhotoDetails = ({ photo, onBack }) => {
  console.log(photo.name);
  
  if (!photo) {
    return (
      <div className="h-screen flex justify-center items-center text-black">
        No image found 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-10">
     
      <button
        onClick={onBack}
        className="mb-6 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        ← Back
      </button>

      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto bg-white shadow-md p-4 sm:p-6 rounded-xl border border-gray-200">
        <img
          src={photo.image}   
          alt={photo.name}
          className="w-full h-64 sm:h-72 md:h-96 lg:h-[500px] object-cover rounded-lg"
        />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mt-4">
          {photo.name}
        </h1>

        <p className="text-gray-700 mt-2 text-sm sm:text-base leading-relaxed">
          {photo.description}
        </p>
      </div>
    </div>
  );
};

export default PhotoDetails;
