import React from "react";
import { FaClock, FaRuler, FaPlane } from "react-icons/fa";

function FlightDetail({ flightData }) {
  if (!flightData) return null;

  return (
    <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#205684]">
        {flightData.FlightCompany} {flightData.FlightNo}
      </h2>
      <p className="text-lg mb-6 text-center">
        <span
          className={`px-4 py-2 rounded-full ${getStatusColor(
            flightData.FlightState
          )}`}
        >
          {getStatusText(flightData.FlightState)}
        </span>
      </p>

      <div className="flex justify-between items-center mb-8">
        <div className="text-center w-1/4">
          <p className="text-4xl font-bold">{flightData.FlightDepcode}</p>
          <p className="text-lg">{flightData.FlightDep}</p>
          <p className="text-sm text-gray-500">
            {flightData.FlightDeptimePlanDate}
          </p>
        </div>
        <div className="flex-1 px-4 relative h-24">
          <div className="absolute w-full top-1/2 border-t-2 border-gray-300"></div>
          <div className="absolute w-full h-full flex items-center justify-center">
            <FaPlane className="text-[#205684] text-6xl animate-flight" />
          </div>
        </div>
        <div className="text-center w-1/4">
          <p className="text-xl font-bold">{flightData.FlightArrcode}</p>
          <p className="text-lg">{flightData.FlightArr}</p>
          <p className="text-sm text-gray-500">
            {flightData.FlightArrtimePlanDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Keberangkatan</h3>
          <p>Terminal: {flightData.FlightHTerminal}</p>
          <p>Check-in Counter: {flightData.CheckinTable}</p>
          <p>Boarding Gate: {flightData.BoardGate}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Kedatangan</h3>
          <p>Terminal: {flightData.FlightTerminal}</p>
          <p>Baggage Claim: {flightData.BaggageID}</p>
          <p>Arrival Gate: {flightData.ArrivalGate || "--"}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-lg">
          <FaRuler className="text-2xl text-blue-500 mx-auto mb-2" />
          <p className="font-semibold">Jarak Penerbangan</p>
          <p>{flightData.distance} KM</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <FaClock className="text-2xl text-green-500 mx-auto mb-2" />
          <p className="font-semibold">Durasi Penerbangan</p>
          <p>
            {Math.floor(flightData.FlightDuration / 60)}h{" "}
            {flightData.FlightDuration % 60}m
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="font-semibold">Ketepatan Waktu</p>
          <p>{flightData.OntimeRate}</p>
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

export default FlightDetail;
