
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="h-18 fixed bottom-0 w-full flex justify-around items-center px-4 py-3"
      style={{
        background: 'hsl(var(--card) / 0.9)',
        borderTop: '1px solid hsl(var(--border) / 0.5)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div 
        className="flex flex-col items-center cursor-pointer group"
        onClick={() => navigate("/dashboard")}
      >
        <span className="text-lg group-hover:scale-110 transition-transform">💰</span>
        <span className="text-xs font-medium mt-1 text-primary">Wallet</span>
      </div>
      <div 
        className="flex flex-col items-center cursor-pointer group" 
        onClick={() => navigate("/platform")}
      >
        <span className="text-lg group-hover:scale-110 transition-transform">🌐</span>
        <span className="text-xs font-medium mt-1 text-muted-foreground">Social</span>
      </div>
      <div className="flex flex-col items-center">
        <Button 
          className="rounded-full h-14 w-14 -mt-6 shadow-lg space-glow"
          style={{
            background: 'linear-gradient(135deg, hsl(217 91% 60%) 0%, hsl(199 89% 48%) 100%)',
          }}
          onClick={() => navigate("/buy-bpc")}
        >
          <span className="text-xl">🛍</span>
        </Button>
      </div>
      <div 
        className="flex flex-col items-center cursor-pointer group" 
        onClick={() => navigate("/data")}
      >
        <span className="text-lg group-hover:scale-110 transition-transform">📶</span>
        <span className="text-xs font-medium mt-1 text-muted-foreground">Data</span>
      </div>
      <div 
        className="flex flex-col items-center cursor-pointer group" 
        onClick={() => navigate("/profile")}
      >
        <span className="text-lg group-hover:scale-110 transition-transform">👤</span>
        <span className="text-xs font-medium mt-1 text-muted-foreground">Profile</span>
      </div>
    </div>
  );
};

export default BottomNavigation;
