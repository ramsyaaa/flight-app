import React, { useState, useEffect } from "react";

function SearchForm({ onSearch }) {
  const [searchType, setSearchType] = useState("route");
  const [flightNumber, setFlightNumber] = useState("");
  const [dep, setDep] = useState("");
  const [arr, setArr] = useState("");
  const [date, setDate] = useState("");

  // Daftar bandara contoh, ganti dengan daftar sebenarnya dari API
  const airports = [
    { code: "CGK", name: "Jakarta (Soekarno-Hatta)" },
    { code: "DPS", name: "Bali (Ngurah Rai)" },
    { code: "SUB", name: "Surabaya (Juanda)" },
    { code: "UPG", name: "Makassar (Sultan Hasanuddin)" },
    { code: "BDO", name: "Bandung (Husein Sastranegara)" },
    { code: "JOG", name: "Yogyakarta (Adisucipto)" },
    { code: "DJJ", name: "Jayapura (Sentani)" },
    { code: "PKU", name: "Pekanbaru (Sultan Syarif Kasim II)" },
    { code: "PLM", name: "Palembang (Sultan Mahmud Badaruddin II)" },
    { code: "PNK", name: "Pontianak (Supadio)" },
    { code: "BPN", name: "Balikpapan (Sultan Aji Muhammad Sulaiman)" },
    { code: "MDC", name: "Manado (Sam Ratulangi)" },
    { code: "AMQ", name: "Ambon (Pattimura)" },
    { code: "KNO", name: "Medan (Kualanamu)" },
  ];

  useEffect(() => {
    // Set tanggal hari ini sebagai nilai default
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchType === "route") {
      onSearch(searchType, `${dep}-${arr}`, date);
    } else {
      onSearch(searchType, flightNumber, date);
    }
  };

  return (
    <div className="w-full px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Pencarian Penerbangan
        </h1>
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden p-8">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-3 px-6 text-center ${
                searchType === "flight"
                  ? "bg-[#205684] text-white"
                  : "bg-gray-200 text-[#205684]"
              } rounded-l-full focus:outline-none transition duration-300 font-semibold`}
              onClick={() => setSearchType("flight")}
            >
              <i className="fas fa-plane-departure mr-2"></i> Nomor Penerbangan
            </button>
            <button
              className={`flex-1 py-3 px-6 text-center ${
                searchType === "route"
                  ? "bg-[#205684] text-white"
                  : "bg-gray-200 text-[#205684]"
              } rounded-r-full focus:outline-none transition duration-300 font-semibold`}
              onClick={() => setSearchType("route")}
            >
              <i className="fas fa-route mr-2"></i> Rute
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {searchType === "flight" ? (
              <div className="relative">
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) =>
                    setFlightNumber(e.target.value.toUpperCase())
                  }
                  className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#205684] pl-12"
                  placeholder="Masukkan nomor penerbangan"
                />
                <i className="fas fa-plane absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            ) : (
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <select
                    value={dep}
                    onChange={(e) => setDep(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#205684] pl-12 appearance-none"
                  >
                    <option value="">Pilih Keberangkatan</option>
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.name} ({airport.code})
                      </option>
                    ))}
                  </select>
                  <i className="fas fa-plane-departure absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <div className="relative flex-1">
                  <select
                    value={arr}
                    onChange={(e) => setArr(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#205684] pl-12 appearance-none"
                  >
                    <option value="">Pilih Kedatangan</option>
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.name} ({airport.code})
                      </option>
                    ))}
                  </select>
                  <i className="fas fa-plane-arrival absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            )}
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#205684] pl-12"
              />
              <i className="fas fa-calendar-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <button
              type="submit"
              className="w-full bg-[#205684] text-white py-4 px-6 rounded-full hover:bg-[#1a4a6f] transition duration-300 font-bold text-lg shadow-lg"
            >
              Cari Penerbangan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
