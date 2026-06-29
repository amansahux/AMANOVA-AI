import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hook/useAuth";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthError from "../components/AuthError";
import { loginSchema } from "../validator/auth.validator";

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.identifier);
    const payload = isEmail
      ? { email: data.identifier, password: data.password }
      : { username: data.identifier, password: data.password };

    const res = await login(payload);
    if (res?.success) {
    navigate("/dashboard")
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access your account."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <AuthError message={error} />

        <AuthInput
          label="Email or Username"
          placeholder="Email or Username"
          type="text"
          {...register("identifier")}
          error={errors.identifier?.message}
        />

        <div className="flex flex-col space-y-2">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />
          <div className="flex justify-end">
            <Link
              to="#"
              className="text-sm font-medium text-primary hover:text-primary-glow transition-colors duration-300"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className="pt-4">
          <AuthButton type="submit" loading={loading}>
            Login
          </AuthButton>
        </div>

        <div className="text-center text-sm text-on-surface-variant pt-2">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary-glow transition-colors font-semibold"
          >
            Register
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
