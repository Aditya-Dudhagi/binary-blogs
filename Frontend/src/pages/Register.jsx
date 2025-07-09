import { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HandCoins, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

function Register() {
  
  const navigate = useNavigate();
  const { login } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData)
      console.log("Registered: ", res.data);

    
      
      console.log(res.data.token, "tttt");
      
      login(res.data.token)
      navigate('/dashboard')

    } catch (err) {
      console.error("Error: ", err.response?.data || err.message);
    }

  }


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Username
          </Label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <input
            name="password"
            type="password"
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" >
            Register
        </Button>
      </form>
    </>
  );
}

export default Register;
