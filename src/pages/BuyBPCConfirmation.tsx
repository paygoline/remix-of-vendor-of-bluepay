
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BuyBPCConfirmation = () => {
  const navigate = useNavigate();
  
  const handleSupport = () => {
    toast({
      description: "Redirecting to support...",
      duration: 2000,
    });
    navigate("/support");
  };

  const handleRecheck = () => {
    toast({
      description: "Checking payment status...",
      duration: 2000,
    });
    setTimeout(() => {
      toast({
        variant: "destructive",
        description: "Payment still not confirmed",
        duration: 3000,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-space-glow/15 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <header 
        className="relative z-10 py-3 px-4 flex justify-between items-center sticky top-0"
        style={{
          background: 'hsl(var(--secondary) / 0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid hsl(var(--border) / 0.3)',
        }}
      >
        <div className="text-lg font-medium text-foreground">Bank Transfer</div>
        <button 
          onClick={() => navigate("/dashboard")} 
          className="text-red-400 font-medium text-sm"
        >
          Cancel
        </button>
      </header>

      <div className="relative z-10 flex-1 flex flex-col p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-3 md:mb-0">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
              }}
            >
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 rounded-full border-2 border-yellow-400"></div>
                <div className="absolute inset-1 rounded-full border-2 border-red-500"></div>
                <div className="absolute inset-2 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">NGN 6,200</p>
          </div>
        </div>
        
        <div className="text-center my-6">
          <p className="text-lg font-medium text-foreground">
            Proceed to your bank app to complete this Transfer
          </p>
        </div>
        
        <div className="mt-6 space-y-3">
          <Alert 
            variant="destructive" 
            className="border-2 border-red-500/50 bg-red-500/10"
          >
            <AlertCircle className="h-6 w-6 text-red-400" />
            <AlertDescription className="text-base font-medium ml-2 text-red-400">
              Payment not confirmed
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center justify-center mt-4">
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertCircle size={36} className="text-red-400" />
            </div>
          </div>
          
          <div className="text-center mt-3">
            <p className="text-foreground text-base font-medium">
              Need help? Contact support:
            </p>
            
            <button 
              onClick={handleSupport}
              className="text-primary font-medium text-base hover:underline mt-1"
            >
              here
            </button>
          </div>
          
          <Button 
            onClick={handleRecheck}
            className="w-full max-w-xs mx-auto py-3 text-lg mt-3 text-white"
            style={{
              background: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(142 69% 45%) 100%)',
            }}
          >
            Re-check
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyBPCConfirmation;
