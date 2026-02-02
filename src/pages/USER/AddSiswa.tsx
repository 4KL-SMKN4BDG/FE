import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddSiswa = () => {
const navigate = useNavigate();
const [theme, setTheme] = useState<"lofi" | "night">("lofi");

const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
};

const [nama, setNama] = useState("");
const [nis, setNis] = useState("");

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ nama, nis });

    // nanti kirim ke backend
    navigate("/admin/siswa");
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
            TAMBAH SISWA
        </h1>
        </div>
    </div>

      {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-6 py-8">

        {/* BACK BUTTON */}
        <button onClick={() => navigate("/admin/siswa")} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
        <ArrowLeft size={18} />Kembali</button>

        {/* FORM */}
        <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">
            REGISTER STUDENT’S ACCOUNT
        </h2>
        <p className="text-sm text-base-content/60 mb-10 text-center">
            Akun siswa akan dibuat berdasarkan Nama dan NIS yang terdaftar di sekolah
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {/* NAMA */}
            <div className="bg-base-100 rounded-xl shadow p-6">
            <label className="block text-sm font-semibold mb-2">Nama Lengkap</label>
            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan nama lengkap" className="input input-bordered w-full" required/>
        </div>

            {/* NIS */}
            <div className="bg-base-100 rounded-xl shadow p-6">
            <label className="block text-sm font-semibold mb-2">
                Nomor Induk Siswa (NIS)
            </label>
            <input type="text" value={nis} onChange={(e) => setNis(e.target.value)} placeholder="Masukkan NIS" className="input input-bordered w-full" required />
            <p className="text-xs text-base-content/60 mt-2">
                NIS digunakan sebagai identitas akun siswa
            </p>
            </div>

            {/* BUTTON */}
        <div className="md:col-span-2 flex justify-center mt-6">
            <button type="submit" className="btn btn-primary px-12">
                REGIST
            </button>
        </div>
    </form>
</div>

</div>
</div>
);
};

export default AddSiswa;
