import React from "react";

function FlightList({
  flights,
  currentPage,
  flightsPerPage,
  totalFlights,
  paginate,
  onViewDetail,
}) {
  if (!flights || flights.length === 0) {
    return (
      <p className="text-center text-white text-xl">
        Tidak ada penerbangan ditemukan.
      </p>
    );
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFlights / flightsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Hitung indexOfFirstFlight dan indexOfLastFlight
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;

  return (
    <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#205684] text-white">
              <th className="py-3 px-4 text-left">Maskapai</th>
              <th className="py-3 px-4 text-left">Nomor Penerbangan</th>
              <th className="py-3 px-4 text-left">Keberangkatan</th>
              <th className="py-3 px-4 text-left">Kedatangan</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Durasi</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-4 px-4 border-b">
                  <div className="flex items-center">
                    <span>{flight.FlightCompany}</span>
                  </div>
                </td>
                <td className="py-4 px-4 border-b font-medium">
                  {flight.FlightNo}
                </td>
                <td className="py-4 px-4 border-b">
                  <div className="font-medium">
                    {flight.FlightDep} ({flight.FlightDepcode})
                  </div>
                  <div className="text-sm text-gray-500">
                    {flight.FlightDeptimeDate}
                  </div>
                </td>
                <td className="py-4 px-4 border-b">
                  <div className="font-medium">
                    {flight.FlightArr} ({flight.FlightArrcode})
                  </div>
                  <div className="text-sm text-gray-500">
                    {flight.FlightArrtimeDate}
                  </div>
                </td>
                <td className="py-4 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      flight.FlightState
                    )}`}
                  >
                    {getStatusText(flight.FlightState)}
                  </span>
                </td>
                <td className="py-4 px-4 border-b">
                  {Math.floor(flight.FlightDuration / 60)}h{" "}
                  {flight.FlightDuration % 60}m
                </td>
                <td className="py-4 px-4 border-b">
                  <button
                    onClick={() => onViewDetail(flight.FlightNo)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalFlights / flightsPerPage)}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{indexOfFirstFlight + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(indexOfLastFlight, totalFlights)}
              </span>{" "}
              of <span className="font-medium">{totalFlights}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === number
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "arrival":
      return "bg-green-100 text-green-800";
    case "departure":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusText(status) {
  switch (status.toLowerCase()) {
    case "arrival":
      return "Tiba";
    case "departure":
      return "Berangkat";
    default:
      return status;
  }
}

export default FlightList;
