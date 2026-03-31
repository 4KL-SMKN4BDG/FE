import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, User, Check, Trash2, Activity, Database } from "lucide-react";
import Navbar from "@/components/Navbar";
import userStore from "@/store/user.store";
import { listed } from "@/constant/listed";

const ViewPerusahaan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { create, isLoading } = userStore();
  const [theme, setTheme] = useState<"lofi" | "night">("lofi");

  // State data review
  const [reviewData, setReviewData] = useState<any>(null);

  const isNight = theme === "night";

  // Konfigurasi style
  const styles = {
    bg: isNight ? "bg-[#050B14]" : "bg-slate-50",
    card: isNight ? "bg-slate-900/60 border-cyan-500/20 backdrop-blur-xl" : "bg-white border-slate-200 shadow-xl",
    textMain: isNight ? "text-white" : "text-slate-900",
    textSub: isNight ? "text-slate-500" : "text-slate-400",
    accent: isNight ? "text-cyan-400" : "text-blue-600",
    accentBg: isNight ? "bg-cyan-500" : "bg-blue-600",
  };

  useEffect(() => {
    if (location.state?.reviewData) {
      setReviewData(location.state.reviewData);
    }
  }, [location.state]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "lofi" ? "night" : "lofi"));
  };

  const handleRemoveItem = (index: number) => {
    if (!reviewData) return;
    const updatedUsers = reviewData.newUsers.filter((_: any, i: number) => i !== index);
    setReviewData({ ...reviewData, newUsers: updatedUsers });
  };

  const handleConfirmAll = async () => {
    if (!reviewData || reviewData.newUsers.length === 0) return;
    try {
      await create(reviewData);
      const targetRole = reviewData.role.toLowerCase();
      navigate(`${listed.UserPage}?role=${targetRole}`);
    } catch (error) {
      console.error("Gagal kirim bos:", error);
    }
  };

  return (
    <div data-theme={theme} className={`min-h-screen ${styles.bg} ${styles.textMain} transition-colors duration-500 overflow-x-hidden text-left`}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col items-start text-left">
        <button 
          onClick={() => navigate(-1)} 
          className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${styles.textSub} hover:${styles.textMain} transition-all mb-4`}
        >
          <ArrowLeft size={16} /> Edit Data Lagi
        </button>
        
        <div className="flex items-center gap-3 mb-2">
            <Activity size={18} className={styles.accent} />
            <p className={`${styles.textSub} font-mono text-[10px] tracking-[0.4em] uppercase`}>Verification_Step // Phase_02</p>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
          REVIEW <span className={styles.accent}>REGISTRASI</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20 text-left">
        {/* TABEL UTAMA */}
        <div className={`${styles.card} rounded-xl overflow-hidden border text-left shadow-2xl`}>
          {/* Header Tabel */}
          <div className={`grid grid-cols-6 ${isNight ? 'bg-cyan-950/50' : 'bg-[#4E7DB8]'} text-white font-black px-6 py-4 items-center text-[10px] uppercase tracking-widest text-left`}>
            <div className="flex items-center gap-2 text-left"><User size={14}/> No</div>
            <div className="text-left">Nama Lengkap</div>
            <div className="text-left">Nomor Induk</div>
            <div className="text-left">Role</div>
            <div className="text-left">Status</div>
            <div className="text-left">Opsi</div>
          </div>

          <div className="text-left">
            {!reviewData || reviewData.newUsers.length === 0 ? (
              <div className="h-64 flex items-center px-6 text-gray-400 italic text-left font-mono text-xs uppercase">
                Data_Empty: Silakan balik ke form sebelumnya_
              </div>
            ) : (
              reviewData.newUsers.map((item: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-6 items-center px-6 py-4 border-b border-base-300 hover:bg-black/5 transition-colors text-left group"
                >
                  {/* Kolom No */}
                  <div className={`font-mono text-sm opacity-30 text-left font-bold ${styles.textMain}`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Kolom Nama */}
                  <div className="font-black uppercase text-sm pr-4 truncate text-left tracking-tight">
                    {item.name}
                  </div>

                  {/* Kolom NIS/NIP */}
                  <div className="font-mono text-xs text-gray-500 text-left tracking-tighter">
                    {item.nomorInduk}
                  </div>

                  {/* Kolom Role */}
                  <div className="text-left">
                    <span className={`badge border-none rounded-none font-black text-[9px] uppercase py-3 px-3 ${isNight ? 'bg-cyan-900/50 text-cyan-400' : 'bg-slate-100 text-slate-600'}`}>
                      {reviewData.role}
                    </span>
                  </div>

                  {/* Kolom Status */}
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      <span className="text-[9px] font-black uppercase opacity-60">Reviewing</span>
                    </div>
                  </div>

                  {/* Kolom Aksi */}
                  <div className="text-left">
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 font-black text-[10px] uppercase hover:underline flex items-center gap-1 transition-transform active:scale-95"
                    >
                      <Trash2 size={12} /> Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* TOMBOL KONFIRMASI */}
        {reviewData && reviewData.newUsers.length > 0 && (
          <div className="mt-10 flex flex-col items-start gap-4 text-left">
            <div className="flex items-center gap-3 mb-2">
              <Database size={16} className={styles.accent} />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">Ready_To_Deploy: {reviewData.newUsers.length} Entities</span>
            </div>

            <button 
              onClick={handleConfirmAll} 
              disabled={isLoading}
              className={`btn btn-lg rounded-none border-none px-12 italic font-black shadow-2xl transition-all hover:brightness-110 active:scale-95 ${isNight ? 'bg-cyan-500 text-black shadow-cyan-500/20' : 'bg-blue-600 text-white'}`}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <div className="flex items-center gap-3 text-left">
                  <Check size={24} strokeWidth={3}/>
                  DAFTARIN SEMUA SEKARANG
                </div>
              )}
            </button>
            
            <p className="text-[9px] font-mono opacity-40 italic text-left uppercase tracking-widest">
              *Pastikan semua data di atas sudah valid sebelum melakukan injeksi database_
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPerusahaan;