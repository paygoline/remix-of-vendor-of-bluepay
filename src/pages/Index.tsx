import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import landingHero from "@/assets/landing-hero.jpeg";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Sparkles, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(true);

  const handleChatClick = () => {
    navigate("/support");
  };

  // Auto-hide celebration after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="min-h-screen w-full cursor-pointer relative overflow-hidden"
      onClick={() => navigate("/register")}
      style={{
        backgroundImage: `url(${landingHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Star 
              className="text-yellow-400/60" 
              size={8 + Math.random() * 12}
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* New Year Celebration Overlay */}
      {showCelebration && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
          }}
        >
          <div className="text-center px-6 animate-fade-in">
            {/* Sparkles top */}
            <div className="flex justify-center mb-4 gap-2">
              <Sparkles className="text-yellow-400 animate-pulse" size={32} />
              <Sparkles className="text-yellow-300 animate-pulse" size={24} style={{ animationDelay: '0.2s' }} />
              <Sparkles className="text-yellow-400 animate-pulse" size={32} style={{ animationDelay: '0.4s' }} />
            </div>
            
            {/* Main celebration text */}
            <div 
              className="rounded-3xl p-8 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--card) / 0.95) 0%, hsl(var(--primary) / 0.3) 100%)',
                border: '2px solid hsl(var(--primary) / 0.5)',
                boxShadow: '0 0 60px hsl(var(--primary) / 0.4), 0 0 120px hsl(var(--space-glow) / 0.2)',
              }}
            >
              <p className="text-primary text-lg font-medium mb-2 animate-pulse">
                ✨ Welcome ✨
              </p>
              <h1 
                className="text-5xl md:text-7xl font-black mb-4"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 50%, #ffd700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px hsl(var(--primary) / 0.5)',
                }}
              >
                HAPPY
              </h1>
              <h1 
                className="text-5xl md:text-7xl font-black mb-4"
                style={{
                  background: 'linear-gradient(135deg, #ffd700 0%, hsl(var(--space-glow)) 50%, hsl(var(--primary)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                NEW YEAR
              </h1>
              <div 
                className="text-6xl md:text-8xl font-black mb-6"
                style={{
                  background: 'linear-gradient(180deg, #ffd700 0%, #ff8c00 50%, hsl(var(--primary)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
                }}
              >
                2026
              </div>
              <p className="text-foreground/90 text-lg md:text-xl font-medium">
                🎉 Wishing you prosperity & success! 🎉
              </p>
              <p className="text-muted-foreground text-sm mt-4">
                Tap anywhere to continue
              </p>
            </div>

            {/* Sparkles bottom */}
            <div className="flex justify-center mt-4 gap-2">
              <Sparkles className="text-yellow-300 animate-pulse" size={24} />
              <Star className="text-yellow-400 animate-pulse" size={20} fill="currentColor" />
              <Sparkles className="text-yellow-300 animate-pulse" size={24} style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Confetti-like decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              background: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ff69b4'][Math.floor(Math.random() * 6)],
              animation: `fall ${3 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Chat Button */}
      <div onClick={(e) => e.stopPropagation()}>
        <FloatingChatButton onClick={handleChatClick} />
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
