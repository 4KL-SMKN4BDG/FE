import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { SignIn } from '@/type/sign';
import Input from '@/components/ui/InputField';
import useAuthStore from '../store/auth.store';
import { useNavigate } from 'react-router-dom';
import { listed } from '@/constant/listed';

const Login = () => {
  const session = localStorage.getItem('refresh');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, user } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: {
      email: '', // digunakan sebagai NIS
      password: '',
    },
    resolver: yupResolver(
      yup.object({
        email: yup.string().required('NIS wajib diisi'),
        password: yup.string().required('Password wajib diisi'),
      })
    ),
  });

  useEffect(() => {
    if (session) navigate(listed.dashboard);
    else navigate(listed.signin);
  }, [session, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (user) navigate(listed.dashboard);
  }, [user, navigate]);

  const onSubmit = async (data: SignIn) => {
    await login(data);
    localStorage.setItem('userId', user?.id || '');
  };

  return (
    <div
      className="min-h-screen flex"
      data-theme="dark"
    >
      {/* LEFT – LOGIN FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center
                      bg-gradient-to-b from-[#ffffff] to-[#dbdffc] p-8">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

          <h2 className="text-3xl font-bold text-[#497EC0]">
            Login Akun
          </h2>
          <p className="text-gray-600 text-sm mt-1 mb-6">
            Masukkan NIS dan password untuk melanjutkan
          </p>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* NIS */}
            <div>
              <label className="font-medium text-gray-700">
                NIS
              </label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Masukkan NIS"
                error={errors?.email}
                {...register('email')}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  error={errors?.password}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                            text-gray-500 hover:text-[#497EC0]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 text-lg
                        bg-[#497EC0] text-white rounded-xl
                        hover:bg-[#3A67A3] transition"
            >
              Login
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT – IMAGE */}
      <div
        className="hidden md:block w-1/2 relative"
        style={{
          backgroundImage: "url('/Sekolah.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-[#497EC0]/50" /> */}

        <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
          <h1 className="text-4xl font-extrabold">
            Selamat Datang!
          </h1>
          <p className="mt-3 opacity-90 text-lg">
            Sistem Informasi Praktik Kerja Lapangan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
