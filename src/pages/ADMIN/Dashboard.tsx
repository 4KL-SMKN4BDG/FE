import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Building2, Users, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
    const navigate = useNavigate();

  // 🌗 theme state
    const [theme, setTheme] = useState<"lofi" | "night">("lofi");
    
    const toggleTheme = () => {
    setTheme(prev => (prev === "lofi" ? "night" : "lofi"));
    };

    const cards = [
    {
        title: "Perusahaan",
        description:
        "Kelola data perusahaan tempat siswa melaksanakan Praktik Kerja Lapangan.",
        icon: <Building2 size={40} />,
        path: "/admin/perusahaan",
    },
    {
        title: "Guru Pembimbing",
        description:
        "Kelola data guru pembimbing yang bertanggung jawab selama PKL.",
        icon: <Users size={40} />,
        path: "/admin/guru",
    },
    {
        title: "Siswa",
        description:
        "Kelola data siswa yang mengikuti Praktik Kerja Lapangan.",
        icon: <GraduationCap size={40} />,
        path: "/admin/siswa",
    },
    ];

    return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
        
      {/* 🔝 NAVBAR */}
        <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
        <div className="relative h-56 overflow-hidden">
        <img src="/Sekolah.jpeg" alt="Header" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold tracking-widest">Dashboard Admin</h1>
        </div>
        </div>

      {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
            <div
            key={i}
            className="bg-base-200 rounded-2xl shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition"
            > 
            <div>
                <div className="text-gray-400 mb-4" color="">
                {card.icon}
                </div>

                <h2 className="text-2xl text-gray-400 font-bold mb-3">
                {card.title}
                </h2>

                <p className="text-base-content/70 text-gray-400 text-sm">
                {card.description}
                </p>
            </div>

            <button
                onClick={() => navigate(card.path)}
                className="mt-6 btn btn-primary w-max"
            >
                VIEW
            </button>
            </div>
        ))}
        </div>
    </div>
    );
};

export default DashboardAdmin;
