import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listed } from "@/constant/listed";


const schema = yup.object({
  nis: yup.string().required("NIS wajib diisi"),
  password: yup.string().required("Password baru wajib diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});

type ResetPassFormData = {
  nis: string;
  password: string;
  confirmPassword: string;
};

export const ResetPass = () => {
  const navigate = useNavigate();
  const session = localStorage.getItem("refresh");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPassFormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      nis: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (session) navigate(listed.dashboard);
  }, [session, navigate]);

  useEffect(() => {
    if (success) navigate(listed.signin);
  }, [success, navigate]);

  const onSubmit = (data: ResetPassFormData) => {
    console.log("DATA RESET:", data);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f6f4ef]">
      {/* LOGO */}
      <div className="absolute top-6 left-6">
        <img
          src="/src/assets/logosmkn4.png"
          alt="Logo SMK"
          className="h-15 w-auto drop-shadow-lg"
        />
      </div>

      {/* LEFT SECTION - FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-12 bg-[#f6f4ef]">
        <div className="w-full max-w-md flex flex-col gap-8">

          {/* TITLE */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Reset Your Password
            </h1>
            <p className="text-sm text-gray-500">
              Masukkan NIS dan password baru Anda
            </p>
          </div>

          {/* FORM */}
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* NIS */}
            <input
              type="text"
              placeholder="NIS"
              {...register("nis")}
              className="
                w-full px-5 py-3 rounded-xl
                bg-white shadow-md
                placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
            <p className="text-sm text-red-500">{errors.nis?.message}</p>

            {/* PASSWORD BARU */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD BARU"
                {...register("password")}
                className="
                  w-full px-5 py-3 rounded-xl
                  bg-white shadow-md
                  placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-sm text-red-500">{errors.password?.message}</p>

            {/* KONFIRMASI PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="KONFIRMASI PASSWORD"
                {...register("confirmPassword")}
                className="
                  w-full px-5 py-3 rounded-xl
                  bg-white shadow-md
                  placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={!isValid}
              className={`
                w-32 py-2 rounded-full shadow-md transition
                ${isValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"}
              `}
            >
              RISET
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SECTION - IMAGE */}
      <div
        className="hidden md:block w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/fotodepansmk.jpeg')" }}
      >
        <div className="absolute top-6 right-6">
          <img
            src="/src/assets/Logo nobg (1).png"
            alt="Logo PKI"
            className="h-12 w-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
