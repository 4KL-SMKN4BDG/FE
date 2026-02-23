import React, { useState } from "react";
import Navbar from "@/components/Navbar";

type StatusType = "pending" | "accepted" | "rejected";

interface RequestData {
  id: number;
  name: string;
  kelas: string;
  nis: string;
  jurusan: string;
  status: StatusType;
}

const requests: RequestData[] = [
  {
    id: 1,
    name: "Muhammad Mughni Hasbillah",
    kelas: "XII RPL 2",
    nis: "2324120095",
    jurusan: "RPL",
    status: "pending",
  },
  {
    id: 2,
    name: "Muhammad Mughni Hasbillah",
    kelas: "XII RPL 2",
    nis: "2324120095",
    jurusan: "RPL",
    status: "accepted",
  },
  {
    id: 3,
    name: "Muhammad Mughni Hasbillah",
    kelas: "XII RPL 2",
    nis: "2324120095",
    jurusan: "RPL",
    status: "rejected",
  },
];

const statusStyle: Record<StatusType, string> = {
  pending: "bg-orange-100 text-orange-600",
  accepted: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-600",
};

const RequestPage: React.FC = () => {
  const [theme, setTheme] = useState<"lofi" | "night">("lofi");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
  };

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <div className="max-w-7xl mx-auto p-8">
        
        {/* GRID 2 BARIS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-8">

          {/* ===== ROW 1 LEFT (LOGO) ===== */}
          <div className="h-80 rounded-2xl border bg-white flex items-center justify-center shadow">
            <img src="/logo.png" alt="Eflow Logo" className="w-32" />
          </div>

          {/* ===== ROW 1 RIGHT (TITLE) ===== */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-base-content">
              Eflow Baraya Multika
            </h1>

            <p className="mt-3 text-sm text-base-content/70 leading-relaxed max-w-2xl">
              <span className="font-semibold">Deskripsi:</span>
              <br />
              Eflow Baraya Multika adalah perusahaan yang bergerak di bidang
              pengembangan sistem dan solusi digital yang berfokus pada inovasi
              dan profesionalitas.
            </p>
          </div>

          {/* ===== ROW 2 LEFT (MAP) ===== */}
          <div className="h-80 rounded-2xl overflow-hidden shadow">
            <iframe
              title="map"
              className="w-full h-full"
              src="https://maps.google.com/maps?q=-6.9175,107.6191&z=15&output=embed"
            />
          </div>

          {/* ===== ROW 2 RIGHT (TABLE) ===== */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="border-2 border-blue-400 rounded-2xl overflow-hidden bg-base-100 shadow-lg">
              <table className="w-full text-sm">
                <thead className="bg-blue-200 text-gray-800">
                  <tr>
                    <th className="p-4 text-left">Nama</th>
                    <th className="p-4 text-center">Kelas</th>
                    <th className="p-4 text-center">NIS</th>
                    <th className="p-4 text-center">Jurusan</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-base-200 transition">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#C1C8FF]" />
                        <span>{item.name}</span>
                      </td>

                      <td className="p-4 text-center">{item.kelas}</td>
                      <td className="p-4 text-center">{item.nis}</td>
                      <td className="p-4 text-center">{item.jurusan}</td>

                      <td className="p-4 text-center">
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="px-12 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300 w-fit">
              REQ
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RequestPage;
