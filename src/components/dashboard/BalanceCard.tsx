
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "../../stores/userStore";

interface BalanceCardProps {
  balance: number;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  const navigate = useNavigate();
  const { balanceVisible, toggleBalanceVisibility } = useUserStore();

  return (
    <div 
      className="rounded-xl p-4 mb-2 space-glow"
      style={{
        background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.2) 0%, hsl(222 47% 15% / 0.8) 100%)',
        border: '1px solid hsl(217 91% 60% / 0.3)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <p className="text-sm mb-1 text-foreground/70">Available Balance</p>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold text-foreground">
            {balanceVisible ? `₦${balance.toLocaleString()}` : '₦***********'}
          </h3>
          <button
            onClick={toggleBalanceVisibility}
            className="p-1 hover:bg-primary/10 rounded transition-colors"
          >
            {balanceVisible ? (
              <EyeOff className="h-4 w-4 text-foreground/60" />
            ) : (
              <Eye className="h-4 w-4 text-foreground/60" />
            )}
          </button>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs px-3 py-1 h-8"
          onClick={() => navigate("/withdraw")}
        >
          Withdraw
        </Button>
      </div>
      <div 
        className="rounded-lg p-3"
        style={{
          background: 'hsl(217 91% 60% / 0.1)',
          border: '1px solid hsl(217 91% 60% / 0.2)',
        }}
      >
        <div className="flex justify-between items-center">
          <p className="text-xs text-foreground/70">Daily spend target</p>
          <p className="text-xs font-semibold text-primary">₦200,000</p>
        </div>
        <div className="w-full bg-muted/50 h-1.5 rounded-full mt-2">
          <div 
            className="h-1.5 rounded-full"
            style={{
              width: "35%",
              background: 'linear-gradient(90deg, hsl(217 91% 60%) 0%, hsl(199 89% 48%) 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
