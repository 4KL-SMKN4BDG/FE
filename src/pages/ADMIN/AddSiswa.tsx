import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { listed } from "@/constant/listed";
import { UserCreateAPI } from "@/restApi/user.api"; // Sesuaikan path ini
import fotoDepan from "../../assets/fotodepansmk.jpeg";

const AddSiswa = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState<"lofi" | "night">("lofi");
    
    // State untuk input (Gunakan nama sesuai Interface API)
    const [name, setName] = useState("");
    const [nomorInduk, setNomorInduk] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Buat objek sesuai interface UserCreate
        const payload = {
            role: "STUDENT", // Ganti dengan role yang sesuai di DB
            newUsers: [
                {
                    name: name, 
                    nomorInduk: nomorInduk 
                }
            ]
        };

        const response = await UserCreateAPI(payload);

        if (response.status) {
            alert("Siswa berhasil terdaftar!");
            navigate(listed.SiswaPage);
        }
    } catch (error: any) {
        console.error("Error Detail:", error.response?.data);
        const serverMessage = error.response?.data?.errors?.error?.message;
        alert("Gagal mendaftar: " + (serverMessage || "Internal Server Error"));
    } finally {
        setLoading(false);
    }
};

    return (
        <div data-theme={theme} className="min-h-screen bg-base-200">
            <Navbar toggleTheme={toggleTheme} theme={theme} />

            <div className="relative h-56 overflow-hidden">
                <img src={fotoDepan} alt="Header" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl font-bold tracking-widest">TAMBAH SISWA</h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <button onClick={() => navigate(listed.SiswaPage)} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:underline">
                    <ArrowLeft size={18} />Kembali
                </button>

                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2">REGISTER STUDENT’S ACCOUNT</h2>
                    <p className="text-sm text-base-content/60 mb-10 text-center">
                        Akun siswa akan dibuat berdasarkan Nama dan NIS yang terdaftar
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                        <div className="bg-base-100 rounded-xl shadow p-6">
                            <label className="block text-sm font-semibold mb-2">Nama Lengkap</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Masukkan nama lengkap" 
                                className="input input-bordered w-full" 
                                required 
                            />
                        </div>

                        <div className="bg-base-100 rounded-xl shadow p-6">
                            <label className="block text-sm font-semibold mb-2">Nomor Induk Siswa (NIS)</label>
                            <input 
                                type="text" 
                                value={nomorInduk} 
                                onChange={(e) => setNomorInduk(e.target.value)} 
                                placeholder="Masukkan NIS" 
                                className="input input-bordered w-full" 
                                required 
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-center mt-6">
                            <button type="submit" disabled={loading} className={`btn btn-primary px-12 ${loading ? 'loading' : ''}`}>
                                {loading ? "SAVING..." : "REGIST"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSiswa;