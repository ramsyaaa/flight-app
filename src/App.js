import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import FlightList from "./components/FlightList";
import FlightDetail from "./components/FlightDetail";
import Preloader from "./components/Preloader";

function App() {
  const [flights, setFlights] = useState([]);
  const [flightDate, setFlightDate] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const flightsPerPage = 10;

  const handleSearch = async (searchType, searchValue, date) => {
    setError(null);
    setFlights([]);
    setFlightDate("");
    setIsLoading(true);
    setCurrentPage(1);
    setSelectedFlight(null);

    try {
      let endpoint;
      let payload;

      if (searchType === "flight") {
        endpoint = "https://flight.apicollection.my.id/api/flightnum";
        payload = {
          fnum: searchValue,
          date: date,
        };
      } else {
        const [dep, arr] = searchValue.split("-");
        endpoint = "https://flight.apicollection.my.id/api/flightroute";
        payload = {
          dep: dep,
          arr: arr,
          date: date,
        };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.meta.status === "success") {
        setFlightDate(data.data.date);
        if (searchType === "flight") {
          setSelectedFlight(data.data.flights[0]);
        } else {
          setFlights(data.data.flights);
        }
      } else {
        setError(
          data.meta.message ||
            "Terjadi kesalahan saat mengambil data penerbangan."
        );
      }
    } catch (error) {
      setError(
        "Terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = async (flightNumber) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://flight.apicollection.my.id/api/flightnum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ fnum: flightNumber, date: flightDate }),
        }
      );

      const data = await response.json();

      if (data.meta.status === "success") {
        setSelectedFlight(data.data.flights[0]);
      } else {
        setError(
          data.meta.message ||
            "Terjadi kesalahan saat mengambil detail penerbangan."
        );
      }
    } catch (error) {
      setError(
        "Terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedFlight(null);
  };

  // Get current flights
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpeg')" }}
    >
      <div className="w-full min-h-screen bg-black bg-opacity-50">
        <div className="relative z-10">
          <SearchForm onSearch={handleSearch} />
          {isLoading && <Preloader />}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {!isLoading && !selectedFlight && flights.length > 0 && (
            <div className="w-full px-4 py-12">
              <div className="max-w-7xl mx-auto">
                <FlightList
                  flights={currentFlights}
                  currentPage={currentPage}
                  flightsPerPage={flightsPerPage}
                  totalFlights={flights.length}
                  paginate={paginate}
                  onViewDetail={handleViewDetail}
                />
              </div>
            </div>
          )}
          {!isLoading && selectedFlight && (
            <div className="w-full px-4 py-12">
              <div className="max-w-7xl mx-auto">
                {flights.length > 0 && (
                  <button
                    onClick={handleBackToList}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Kembali ke Daftar
                  </button>
                )}
                <FlightDetail flightData={selectedFlight} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
