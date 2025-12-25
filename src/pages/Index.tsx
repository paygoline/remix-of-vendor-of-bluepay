import React from "react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/bluepay-hero.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col min-h-screen text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header with BLUEPAY 2026 logo */}
        <header className="p-6 pt-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold tracking-wider">
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                  BLUEPAY
                </span>
              </div>
              <div className="text-lg font-light tracking-[0.3em] text-blue-200/80 -mt-1">
                2026
              </div>
              {/* Glowing underline */}
              <div className="mt-1 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col px-6 pb-12 justify-center">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Get Your Account
              <br />
              Ready Instantly
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/90 mb-12 leading-relaxed">
              Easily set up your account to buy, sell airtime, 
              data bundles, and pay bills online at unbeatable 
              rates.
            </p>
            
            {/* Glowing Get Started Button */}
            <button 
              onClick={() => navigate("/register")}
              className="relative group px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(30, 64, 175, 0.4) 100%)',
                border: '2px solid rgba(147, 197, 253, 0.5)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.1)'
              }}
            >
              <span className="relative z-10 text-white">Get Started</span>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: '0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)'
                }}
              />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
