import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import Navbar from "@/components/Navbar";

const ViewPerusahaan = () => {

const navigate = useNavigate();

const [theme, setTheme] = useState<"lofi" | "night">("lofi");

const toggleTheme = () => {
  setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
};

const [siswa, setSiswa] = useState<any[]>([]); // kosong dulu

return (
<div data-theme={theme} className="min-h-screen bg-base-200">

<Navbar toggleTheme={toggleTheme} theme={theme} />

<div className="max-w-6xl mx-auto px-6 py-8">

{/* HEADER */}
<div className="flex justify-between items-center mb-6">

<button
onClick={()=>navigate(-1)}
className="flex items-center gap-2 text-gray-600 hover:underline"
>
<ArrowLeft size={18}/>
Kembali
</button>

<h1 className="text-2xl font-bold">
Eflow Baraya Multika
</h1>

</div>

{/* TABLE */}
<div className="bg-base-100 rounded-xl shadow overflow-hidden">

{/* HEADER TABLE */}
<div className="grid grid-cols-6 bg-[#4E7DB8] text-white font-semibold px-6 py-3 items-center">

<div className="flex justify-center">
<User size={20}/>
</div>

<div>Nama</div>
<div>Kelas</div>
<div>NIS</div>
<div>Jurusan</div>
<div>Status</div>

</div>

{/* DATA */}
{siswa.length === 0 ? (

<div className="h-72 flex items-center justify-center text-gray-400">
Belum ada data siswa
</div>

) : (

siswa.map((item:any) => (

<div
key={item.id}
className="grid grid-cols-6 items-center px-6 py-4 border-b"
>

{/* FOTO */}
<div>
<img
src={item.foto}
className="w-12 h-12 rounded-lg object-cover"
/>
</div>

{/* NAMA */}
<div>{item.nama}</div>

{/* KELAS */}
<div>{item.kelas}</div>

{/* NIS */}
<div>{item.nis}</div>

{/* JURUSAN */}
<div>{item.jurusan}</div>

{/* STATUS */}
<div className="flex gap-2">

<button className="bg-green-600 text-white px-4 py-1 rounded-full">
Accept
</button>

<button className="bg-red-600 text-white px-4 py-1 rounded-full">
Reject
</button>

</div>

</div>

))

)}

</div>

</div>

</div>
);
};

export default ViewPerusahaan;