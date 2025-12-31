
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyBPCProcessing = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/buy-bpc/payment");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-space-glow/15 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <header 
        className="relative z-10 py-3 px-4 flex justify-between items-center sticky top-0"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
        }}
      >
        <button className="text-lg">
          <span className="sr-only">Menu</span>
        </button>
        <h1 className="text-xl font-semibold text-primary-foreground">BLUEPAY</h1>
        <div className="w-6 h-6">
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 mb-6 relative">
          <div 
            className="w-full h-full rounded-full border-4 border-border/30 animate-spin"
            style={{
              borderTopColor: 'hsl(var(--primary))',
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-foreground">
            {countdown}
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-3 text-center text-foreground">Processing your request</h1>
        <p className="text-base text-muted-foreground text-center">
          Please wait while we prepare your payment information...
        </p>
      </div>
    </div>
  );
};

export default BuyBPCProcessing;
