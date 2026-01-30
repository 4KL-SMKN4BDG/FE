import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f4ef] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="p-14 flex flex-col gap-10 bg-[#f6f4ef]">

          {/* LOGO SMK */}
          <img
            src="/src/assets/logosmk4.png"
            alt="Logo SMK"
            className="h-14 w-fit"
          />

          {/* TITLE */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Riset Your Password!
            </h1>
          </div>

          {/* FORM */}
          <form className="space-y-6 max-w-sm">

            {/* NIS */}
            <input
              type="text"
              placeholder="NIS"
              className="
                w-full px-5 py-3 rounded-xl 
                bg-[#f3ede2] 
                shadow-md 
                placeholder-gray-500 
                focus:outline-none 
                focus:ring-2 focus:ring-blue-500
              "
            />

            {/* PASSWORD BARU */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD BARU"
                className="
                  w-full px-5 py-3 rounded-xl 
                  bg-[#f3ede2] 
                  shadow-md 
                  placeholder-gray-500 
                  focus:outline-none 
                  focus:ring-2 focus:ring-blue-500
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* KONFIRMASI PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="KONFIRMASI PASSWORD"
                className="
                  w-full px-5 py-3 rounded-xl 
                  bg-[#f3ede2] 
                  shadow-md 
                  placeholder-gray-500 
                  focus:outline-none 
                  focus:ring-2 focus:ring-blue-500
                "
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-32 py-2 
                bg-blue-600 
                text-white 
                rounded-full 
                shadow-md 
                hover:bg-blue-700 
                transition
              "
            >
              RISET
            </button>
          </form>
        </div>

        {/* RIGHT SECTION */}
        <div
          className="hidden md:block relative bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/fotodepansmk.jpeg')",
          }}
        >
          {/* LOGO PKI */}
          <div className="absolute top-6 right-6">
            <img
              src="/src/assets/Logo nobg (1).png"
              alt="Logo PKI"
              className="h-14 w-auto drop-shadow-lg"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResetPass;
