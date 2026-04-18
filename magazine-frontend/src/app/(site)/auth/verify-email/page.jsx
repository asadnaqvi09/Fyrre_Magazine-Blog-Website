"use client"
import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"
import * as authRepo from "@/lib/repositories/authRepo"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  const [status, setStatus] = useState("loading")

  const handleVerification = useCallback(async () => {
    if (!token) {
      if (email) {
        setStatus("pending")
      } else {
        setStatus("error")
        toast.error("Invalid verification request")
      }
      return
    }

    try {
      await authRepo.verifyEmail(token)
      setStatus("success")
      toast.success("Email verified successfully")
      setTimeout(() => router.push("/auth/login"), 2000)
    } catch (error) {
      setStatus("error")
      toast.error(error?.response?.data?.message || "Verification failed")
    }
  }, [token, email, router])

  useEffect(() => {
    handleVerification()
  }, [handleVerification])

  const resendEmail = async () => {
    try {
      await authRepo.resendVerification(email)
      toast.success("Verification email sent")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend email")
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.5 }} 
      className="w-full max-w-md text-center"
    >
      {status === "loading" && (
        <>
          <h2 className="text-5xl font-black uppercase mb-6 tracking-tighter">Verifying</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-60">Please wait while we verify your email</p>
        </>
      )}

      {status === "success" && (
        <>
          <h2 className="text-5xl font-black uppercase mb-6 tracking-tighter">Verified</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-60">Redirecting to login…</p>
        </>
      )}

      {status === "pending" && (
        <>
          <h2 className="text-5xl font-black uppercase mb-6 tracking-tighter">Almost There</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-4">
            Check your email ({email}) for the verification link.
          </p>
          <button onClick={resendEmail} className="text-[10px] uppercase font-black tracking-widest underline">
            Resend Email
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h2 className="text-5xl font-black uppercase mb-6 tracking-tighter">Failed</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-60 mb-8">Verification link is invalid or expired</p>
          <Link href="/auth/register" className="text-[10px] uppercase font-black tracking-widest underline">
            Go to Register
          </Link>
        </>
      )}
    </motion.div>
  )
}