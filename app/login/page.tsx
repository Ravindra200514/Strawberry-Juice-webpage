import { login, signup } from './actions'
import Link from 'next/link'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-white font-bold tracking-[0.4em] uppercase text-sm hover:text-primary transition-colors flex items-center gap-3">
        <div className="w-[6px] h-[6px] bg-primary rounded-full shadow-[0_0_10px_rgba(255,23,68,0.8)]"></div>
        Pure
      </Link>
      
      <div className="w-full max-w-md bg-[#0a0a0a] border border-[#1a1a1a] rounded-[2rem] p-10 shadow-[0_0_50px_rgba(255,23,68,0.05)] flex flex-col relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>

        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm mb-8 font-light">Enter your details to access your premium account.</p>

        <form className="flex-1 flex flex-col w-full gap-5 text-white">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium ml-1" htmlFor="email">
              Email
            </label>
            <input
              className="bg-[#111] border border-[#222] rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(255,23,68,0.2)] transition-all font-light"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-medium ml-1" htmlFor="password">
              Password
            </label>
            <input
              className="bg-[#111] border border-[#222] rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(255,23,68,0.2)] transition-all font-light"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <button
              formAction={login}
              className="w-full bg-primary text-background font-bold py-3 rounded-xl uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,23,68,0.4)] transition-all transform hover:scale-[1.02]"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="w-full bg-transparent border border-gray-700 text-white font-medium py-3 rounded-xl uppercase tracking-widest hover:border-primary hover:text-primary transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Create Account</span>
            </button>
          </div>

          {searchParams?.message && (
            <p className="mt-6 p-4 bg-primary/10 border border-primary/30 text-primary text-center text-sm rounded-xl">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
