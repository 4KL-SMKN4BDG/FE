import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f4ef] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="p-12 flex flex-col justify-center gap-8 bg-[#f6f4ef]">

          {/* LOGO SMK */}
          <img
            src="/src/assets/logosmk4.png"
            alt="Logo SMK"
            className="h-14 w-fit"
          />

          {/* TITLE */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-500">
              Masuk menggunakan akun Anda
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5">

            {/* NIS */}
            <input
              type="text"
              placeholder="NIS"
              className="w-full px-5 py-3 rounded-xl bg-white shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD"
                className="w-full px-5 py-3 rounded-xl bg-white shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* FORGOT PASSWORD */}
            <p className="text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              SIGN IN
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
          {/* LOGO PKI (GANTI 4KL) */}
          <div className="absolute top-6 right-6">
            <img
              src="src\assets\Logo nobg (1).png"
              alt="Logo PKI"
              className="h-12 w-auto drop-shadow-lg"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
