import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hook/useAuth";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import AuthError from "../components/AuthError";
import { registerSchema } from "../validator/auth.validator";
import useToast from "../../../shared/toast/useToast";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, error } = useAuth();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const res = await registerUser(data);
    if (res?.success) {
      toast.success( res.message || "Account created! Please Verify Email before Login.");
      navigate("/login");
    } else {
      toast.error(res?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Enter your details to register a new account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <AuthError message={error} />

        <AuthInput
          label="Username"
          placeholder="Enter your username"
          type="text"
          {...register("username")}
          error={errors.username?.message}
        />

        <AuthInput
          label="Email"
          placeholder="Enter your email address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <div className="flex flex-col space-y-2">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <div className="pt-4">
          <AuthButton type="submit" loading={loading}>
            Register
          </AuthButton>
        </div>

        <div className="text-center text-sm text-on-surface-variant pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-primary-glow transition-colors font-semibold">
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
