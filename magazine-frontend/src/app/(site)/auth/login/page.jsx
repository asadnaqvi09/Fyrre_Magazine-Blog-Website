"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import * as z from "zod"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { login } from "@/features/auth/authThunks"

const schema = z.object({
    email: z.string().email("A valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { status, error: serverError } = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ 
        resolver: zodResolver(schema),
        mode: "onBlur"
    })
    const onSubmit = async (data) => {
        const result = await dispatch(login(data));

        if (login.fulfilled.match(result)) {
            toast.success("Welcome back!");
            const userRole = result.payload.user.role;
            if (userRole === "Admin") {
                router.push("/dashboard/admin");
            } else if (userRole === "Author") {
                router.push("/dashboard/author");
            } else {
                router.push("/");
            }
        } else {
            toast.error(result.payload || "Authentication failed");
        }
    }
    const isLoading = status === "loading";
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <h2 className="text-5xl font-black uppercase mb-10 tracking-tighter">
                Sign In
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <input
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        disabled={isLoading}
                        className={`border-b py-4 font-bold tracking-widest outline-none transition-colors ${
                            errors.email ? "border-red-600" : "border-black focus:border-neutral-400"
                        }`}
                    />
                    {errors.email && (
                        <span className="text-[10px] text-red-600 font-bold mt-1 italic">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <input
                        {...register("password")}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        disabled={isLoading}
                        className={`border-b py-4 font-bold tracking-widest outline-none transition-colors ${
                            errors.password ? "border-red-600" : "border-black focus:border-neutral-400"
                        }`}
                    />
                    {errors.password && (
                        <span className="text-[10px] text-red-600 font-bold mt-1 italic">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <motion.button
                    whileHover={!isLoading ? { scale: 1.01, backgroundColor: "#333" } : {}}
                    whileTap={!isLoading ? { scale: 0.99 } : {}}
                    disabled={isLoading}
                    className="mt-8 bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isLoading ? "Authenticating..." : "Enter Magazine"}
                </motion.button>
            </form>
            <div className="mt-12 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                <p className="opacity-60">
                    No account? <Link href="/auth/register" className="underline hover:opacity-100 transition-opacity">Register</Link>
                </p>
                <Link href="/auth/forgot-password" title="Coming soon" className="opacity-40 cursor-not-allowed">
                    Forgot Password?
                </Link>
            </div>
        </motion.div>
    )
}