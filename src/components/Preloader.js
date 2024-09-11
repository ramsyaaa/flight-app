import React from "react";

function Preloader() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}

export default Preloader;
