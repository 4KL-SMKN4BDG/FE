import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import fotoDepan from "../../assets/fotodepansmk.jpeg";

const AddPerusahaan = () => {
const navigate = useNavigate();

const [theme, setTheme] = useState<"lofi" | "night">("lofi");
const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
};

const [namaPerusahaan, setNamaPerusahaan] = useState("");
const [deskripsi, setDeskripsi] = useState("");
const [alamat, setAlamat] = useState("");
const [kapasitas, setKapasitas] = useState("");

const [foto, setFoto] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);

const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setFoto(file);
        setPreview(URL.createObjectURL(file));
    }
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
        namaPerusahaan,
        deskripsi,
        alamat,
        kapasitas,
        foto
    });

    navigate("/admin/perusahaan");
};

    return (
        <div data-theme={theme} className="min-h-screen bg-base-200">

      {/* NAVBAR */}
        <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
    <div className="relative h-56 overflow-hidden">
        <img src={fotoDepan} alt="Header" className="w-full h-full object-cover" />
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
            <button onClick={() => navigate(listed.PerusahaanPage)} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
            <ArrowLeft size={18} />Kembali</button>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-base-100 rounded-xl shadow p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
                >

                {/* FOTO */}
                <div className="flex flex-col items-center justify-center gap-3 h-full">

                    <div className="w-48 h-48 rounded-xl overflow-hidden shadow bg-base-200 flex items-center justify-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-400 text-sm">
                                Pilih Foto Perusahaan
                            </span>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        className="file-input file-input-bordered file-input-sm max-w-xs mx-auto mt-4"
                    />

                </div>

                {/* INPUT */}
                <div className="md:col-span-2 flex flex-col gap-4">

                    {/* Nama Perusahaan */}
                    <div>
                        <label className="text-sm font-semibold">
                            Nama Perusahaan
                        </label>
                        <input
                            type="text"
                            value={namaPerusahaan}
                            onChange={(e) => setNamaPerusahaan(e.target.value)}
                            className="input input-bordered w-full mt-1"
                            required
                        />
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="text-sm font-semibold">
                            Deskripsi
                        </label>
                        <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            className="textarea textarea-bordered w-full mt-1 h-24"
                        />
                    </div>

                    {/* Row bawah */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* Alamat */}
                        <div>
                            <label className="text-sm font-semibold">
                                Alamat / Link
                            </label>
                            <input
                                type="text"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                        {/* Kapasitas */}
                        <div>
                            <label className="text-sm font-semibold">
                                Kapasitas
                            </label>
                            <input
                                type="number"
                                value={kapasitas}
                                onChange={(e) => setKapasitas(e.target.value)}
                                className="input input-bordered w-full mt-1"
                            />
                        </div>

                    </div>

                    <button className="btn btn-primary w-40 mt-2">
                        Simpan
                    </button>

                </div>

                </form>
        </div>
    </div>
);
};

export default AddPerusahaan;
