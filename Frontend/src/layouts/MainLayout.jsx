import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header"

export default function MainLayout() {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Header /> {/* Render the header at the top */}
        <main className="p-4 max-w-4xl mx-auto">
          <Outlet /> {/* Render the active route's component */}
        </main>
      </div>
    );
}