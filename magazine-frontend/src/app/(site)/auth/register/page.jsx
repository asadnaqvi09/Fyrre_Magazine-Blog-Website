"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import * as z from "zod"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { register as registerThunk } from "@/features/auth/authThunks"

const schema = z.object({
  userName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters required"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match"
})

export default function RegisterPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { status } = useSelector(state => state.auth)
  const isLoading = status === "loading"

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur"
  })

  const onSubmit = async (data) => {
    const result = await dispatch(registerThunk(data))
    
    if (registerThunk.fulfilled.match(result)) {
      toast.success("Account created! Verify your email.")
      router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`)
    } else {
      toast.error(result.payload || "Registration failed")
    }
  }

  const inputStyles = (error) => `
    border-b py-4 font-bold tracking-widest outline-none transition-colors 
    ${error ? "border-red-600" : "border-black focus:border-neutral-400"}
    disabled:opacity-50
  `

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.5 }} 
      className="w-full max-w-md"
    >
      <h2 className="text-5xl font-black uppercase mb-10 tracking-tighter">Register</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {[
          { id: "userName", placeholder: "Full Name", type: "text" },
          { id: "email", placeholder: "Email", type: "email" },
          { id: "password", placeholder: "Password", type: "password" },
          { id: "confirmPassword", placeholder: "Confirm Password", type: "password" }
        ].map((field) => (
          <div key={field.id} className="flex flex-col gap-1">
            <input 
              {...register(field.id)} 
              type={field.type}
              placeholder={field.placeholder} 
              disabled={isLoading} 
              className={inputStyles(errors[field.id])} 
            />
            {errors[field.id] && (
              <span className="text-[10px] text-red-600 font-bold mt-1 italic uppercase">
                {errors[field.id].message}
              </span>
            )}
          </div>
        ))}

        <motion.button 
          whileHover={!isLoading ? { scale: 1.01, backgroundColor: "#333" } : {}} 
          whileTap={!isLoading ? { scale: 0.99 } : {}} 
          disabled={isLoading} 
          className="mt-8 bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] disabled:opacity-50 transition-all"
        >
          {isLoading ? "Creating Profile..." : "Join the Magazine"}
        </motion.button>
      </form>

      <p className="mt-12 text-[10px] uppercase font-bold tracking-widest opacity-60">
        Already registered? <Link href="/auth/login" className="underline hover:opacity-100 transition-opacity">Login</Link>
      </p>
    </motion.div>
  )
}