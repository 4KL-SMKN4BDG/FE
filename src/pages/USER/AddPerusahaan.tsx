import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddPerusahaan = () => {
const navigate = useNavigate();

const [theme, setTheme] = useState<"lofi" | "night">("lofi");
const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
};

const [nama, setNama] = useState("");
const [nip, setNip] = useState("");
const [jurusan, setJurusan] = useState("");



const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
        nama,
        nip,
        jurusan,
    });

    navigate("/admin/perusahaan");
};

    return (
        <div data-theme={theme} className="min-h-screen bg-base-200">

      {/* NAVBAR */}
        <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
    <div className="relative h-56 overflow-hidden">
        <img src="/Sekolah.jpeg" alt="Header" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold tracking-widest">
            Perusahaan
        </h1>
        </div>
    </div>

      {/* CONTENT */}
    <div className="max-w-6xl mx-auto px-6 py-8">

        {/* BACK */}
        <button onClick={() => navigate("/admin/perusahaan")} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
        <ArrowLeft size={18} />Kembali</button>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-base-100 rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FOTO */}
        {/* FOTO */}
        <div className="flex justify-center">
            <div className="w-48 h-48 rounded-xl overflow-hidden shadow bg-base-200">
                <img src="" alt="Atur aja bang" className="w-full h-full object-cover"/>
</div>
</div>


          {/* INPUT */}
        <div className="md:col-span-2 flex flex-col gap-5">
            <input type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} className="input input-bordered w-full required"/>

            <input type="text" placeholder="NIP" value={nip} onChange={(e) => setNip(e.target.value)} className="input input-bordered w-full" required/>

            <select value={jurusan} onChange={(e) => setJurusan(e.target.value)} className="select select-bordered w-full" required>
            <option value="" disabled>
                JURUSAN
            </option>
            <option>Rekayasa Perangkat Lunak</option>
            <option>Desain Komunikasi Visual </option>
            <option>Teknik Komputer dan Jaringan</option>
            </select>

            <button className="btn btn-primary w-40 mt-4">
                INPUT
            </button>
            </div>
        </form>
        </div>
    </div>
);
};

export default AddPerusahaan;
