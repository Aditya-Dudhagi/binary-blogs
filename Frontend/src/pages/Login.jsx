import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);

  const handLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true)


    try {
      
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend error response:", data);
        setError(data.message || "Login failed");
        setLoading(false)
        return;
      }

      // save token and redirect
     login(data.token);

     // Optional: wait 500ms to show spinner before redirect
     setTimeout(() => {
       navigate("/dashboard");
     }, 500);

    } catch (err) {
      console.error(err);
      setError("something went wrong.");
      setLoading(false)
    }
  };


    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <Card className="w-full max-w-sm border border-slate-700 shadow-2xl rounded-2xl bg-slate-900/90 backdrop-blur-md">
          <CardContent className="py-8 px-6 space-y-6">
            {/* App Title / Logo */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                MyBlog
              </h1>
              <p className="text-slate-400 text-sm mt-1">Welcome back 👋</p>
            </div>

            <form onSubmit={handLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className={`px-4 py-2 rounded-md text-white font-medium w-full hover:cursor-pointer transition-all ${loading ? "bg-gray-700" : "bg-blue-700"}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2 ">
                    <Loader2 className="w-4 h-4 animate-spin " />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="text-sm text-center text-slate-400">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    );
}
