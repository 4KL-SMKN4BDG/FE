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
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required('email required')
          .email('email invalid format'),
        password: yup.string().required('password required'),
      })
    ),
  });

  // Auto-redirect session
  useEffect(() => {
    if (session) navigate(listed.dashboard);
    else navigate(listed.signin);
  }, [session, navigate]);

  // Error popup
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error,
      });
    }
  }, [error]);

  // Redirect after success
  useEffect(() => {
    if (user) navigate(listed.dashboard);
  }, [user, navigate]);

  const onSubmit = async (formData: SignIn) => {
    await login(formData);
    localStorage.setItem('userId', user?.id || '');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 
                 bg-gradient-to-b from-red-600 to-white"
      data-theme="light"
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden relative">

        {/* Decorative Indonesian Flag Circle */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-red-600 opacity-30 blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-red-400 opacity-30 blur-xl" />

        <div className="grid md:grid-cols-2 gap-8 p-8">

          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">

              {/* Simple Red-White Flag Banner */}
              <div className="w-24 h-6 flex border rounded overflow-hidden shadow">
                <div className="w-1/2 bg-red-600" />
                <div className="w-1/2 bg-white" />
              </div>

              <h1 className="text-4xl font-extrabold text-red-700 tracking-tight">
                Selamat Datang
              </h1>
            </div>

            {/* Decorative stripes */}
            <div className="mt-6">
              <div className="h-2 w-32 bg-red-600 rounded-full mb-2" />
              <div className="h-2 w-20 bg-red-400 rounded-full" />
            </div>
          </div>

          {/* RIGHT SIDE – LOGIN FORM */}
          <div className="flex flex-col justify-center space-y-6 bg-red-50 p-6 rounded-xl shadow-inner">

            <div className="mb-2">
              <h2 className="text-2xl font-bold text-red-700">
                Login Akun
              </h2>
              <p className="text-gray-600 text-sm">
                Masukkan email dan password untuk melanjutkan.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1">
                <label htmlFor="email" className="font-medium">Email</label>
                <Input
                  type="text"
                  placeholder="Email"
                  error={errors?.email}
                  {...register('email')}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    error={errors?.password}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2 
                           bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Login
                <ArrowRight className="w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
