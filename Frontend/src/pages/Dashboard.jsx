import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
      </div>

      {/* Welcome Card */}
      <Card className="bg-slate-800 text-white mb-6">
        <CardContent className="py-4 px-6">
          <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
          <p className="text-lg">{user?.email}</p>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 text-white">
          <CardContent className="py-6 px-6">
            <h3 className="text-md text-slate-400">Total Posts</h3>
            <p className="text-2xl font-bold mt-1">5</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 text-white">
          <CardContent className="py-6 px-6">
            <h3 className="text-md text-slate-400">Followers</h3>
            <p className="text-2xl font-bold mt-1">18</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 text-white">
          <CardContent className="py-6 px-6">
            <h3 className="text-md text-slate-400">Following</h3>
            <p className="text-2xl font-bold mt-1">12</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
