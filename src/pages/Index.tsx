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
        {/* Header with BLUEPAY 2026 logo - top left */}
        <header className="p-6 pt-8">
          <div className="flex items-center">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-wider text-white">
                  BLUEPAY
                </span>
                <span className="text-xl font-light text-blue-200/90">
                  2026
                </span>
              </div>
              {/* Underline */}
              <div className="mt-1 h-[2px] w-full bg-gradient-to-r from-blue-400 to-transparent" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col px-6 pb-12 justify-center">
          <div className="max-w-md">
            {/* Glassmorphic Logo Card */}
            <div 
              className="mb-8 px-8 py-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)',
                border: '1px solid rgba(147, 197, 253, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div 
                className="text-3xl md:text-4xl font-black tracking-wide text-center"
                style={{
                  background: 'linear-gradient(180deg, #1e3a8a 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                BLUEPAY2026
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Get Your Account
              <br />
              Ready Instantly
            </h1>
            
            <p className="text-base md:text-lg text-blue-100/80 mb-8 leading-relaxed">
              Easily set up your account to buy, sell airtime, 
              data bundles, and pay bills online at unbeatable 
              rates.
            </p>
            
            {/* Glowing Get Started Button */}
            <button 
              onClick={() => navigate("/register")}
              className="relative group px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)',
                border: '2px solid rgba(147, 197, 253, 0.4)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)'
              }}
            >
              <span className="relative z-10 text-blue-400 font-semibold">Get Started</span>
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
