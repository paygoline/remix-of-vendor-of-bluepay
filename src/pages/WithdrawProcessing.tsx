
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WithdrawProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const { amount = 0, accountName = "", accountNumber = "", bank = "" } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col text-foreground relative overflow-hidden">
        {/* Background gradients */}
        <div className="fixed inset-0 bg-background z-0" />
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0" />
        <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-space-glow/15 rounded-full blur-3xl z-0" />
        
        <header 
          className="py-3 px-4 flex justify-between items-center sticky top-0 z-10"
          style={{
            background: 'hsl(var(--card) / 0.8)',
            borderBottom: '1px solid hsl(var(--border) / 0.5)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <button className="text-lg">
            <span className="sr-only">Menu</span>
          </button>
          <h1 className="text-xl font-semibold">BLUEPAY2025</h1>
          <div className="w-6 h-6">
            <span className="sr-only">Notifications</span>
          </div>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
          <div 
            className="w-24 h-24 mb-6 flex items-center justify-center rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--space-glow) / 0.15))',
              border: '2px solid hsl(var(--primary) / 0.5)'
            }}
          >
            <CheckCircle size={60} className="text-primary" strokeWidth={2} />
          </div>
          
          <h1 className="text-2xl font-bold mb-3 text-center">Transfer Successfully</h1>
          <p className="text-base text-muted-foreground text-center mb-4">
            Your transfer of <span className="text-primary font-semibold">₦{amount.toLocaleString()}</span> has been processed successfully.
          </p>
          
          <Button 
            onClick={handleBackToDashboard}
            className="w-full max-w-md py-3 text-lg space-glow"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--space-glow)))',
            }}
          >
            Ok, I got it
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-foreground relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-background z-0" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-space-glow/15 rounded-full blur-3xl z-0" />
      
      <header 
        className="py-3 px-4 flex justify-between items-center sticky top-0 z-10"
        style={{
          background: 'hsl(var(--card) / 0.8)',
          borderBottom: '1px solid hsl(var(--border) / 0.5)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <button className="text-lg">
          <span className="sr-only">Menu</span>
        </button>
        <h1 className="text-xl font-semibold">BLUEPAY2025</h1>
        <div className="w-6 h-6">
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-20 h-20 mb-6">
          <div 
            className="w-full h-full rounded-full border-4 border-t-primary animate-spin"
            style={{
              borderColor: 'hsl(var(--border) / 0.3)',
              borderTopColor: 'hsl(var(--primary))'
            }}
          ></div>
        </div>
        
        <h1 className="text-2xl font-bold mb-3 text-center">Processing your request</h1>
        <p className="text-base text-muted-foreground text-center">
          Please wait while we prepare your payment details...
        </p>
      </div>
    </div>
  );
};

export default WithdrawProcessing;
