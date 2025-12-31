
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "../stores/userStore";
import { toast } from "@/hooks/use-toast";
import TypewriterText from "../components/ui/TypewriterText";

const BuyBPC = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const [amount] = useState("₦6,200");
  const [fullName, setFullName] = useState(userData?.fullName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email) {
      toast({
        variant: "destructive",
        description: "Please fill in all fields",
      });
      return;
    }
    
    setIsSubmitting(true);
    navigate("/buy-bpc/processing");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-space-glow/15 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <header 
        className="relative z-10 py-3 px-4"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
        }}
      >
        <h1 className="text-xl font-bold text-primary-foreground">Buy BPC Code</h1>
      </header>

      {showTypewriter && userData && (
        <div 
          className="relative z-10 p-3 mx-4 mt-3 rounded-lg border-l-4"
          style={{
            background: 'hsl(var(--card) / 0.8)',
            borderLeftColor: 'hsl(var(--primary))',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p className="text-foreground text-sm">
            Welcome back, <TypewriterText text={userData.fullName || "User"} speed={100} className="font-semibold text-primary" />
          </p>
          <p className="text-muted-foreground text-xs mt-1">
            Email: <TypewriterText text={userData.email || ""} speed={80} className="font-medium text-primary" />
          </p>
        </div>
      )}

      <div className="relative z-10 flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-base text-foreground mb-1 block">Amount</label>
            <Input
              type="text"
              value={amount}
              readOnly
              className="text-base py-3 rounded-lg text-foreground"
              style={{
                background: 'hsl(var(--muted) / 0.8)',
                border: '2px solid hsl(var(--border))',
                backdropFilter: 'blur(10px)',
              }}
              placeholder="₦0.00"
            />
          </div>
          
          <div>
            <label className="text-base text-foreground mb-1 block">Full Name</label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-base py-3 rounded-lg text-foreground placeholder:text-muted-foreground"
              style={{
                background: 'hsl(var(--card) / 0.8)',
                border: '2px solid hsl(var(--primary))',
                backdropFilter: 'blur(10px)',
              }}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="text-base text-foreground mb-1 block">Your Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-base py-3 rounded-lg text-foreground placeholder:text-muted-foreground"
              style={{
                background: 'hsl(var(--card) / 0.8)',
                border: '2px solid hsl(var(--primary))',
                backdropFilter: 'blur(10px)',
              }}
              placeholder="email@example.com"
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full text-lg py-4 text-primary-foreground"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
            }}
          >
            {isSubmitting ? "Processing..." : "Pay"}
          </Button>
          
          <p className="text-center text-muted-foreground text-sm">
            Your BPC code will be displayed on the app once your payment is confirmed.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BuyBPC;
