
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "../stores/userStore";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

const withdrawalSchema = z.object({
  accountName: z.string()
    .trim()
    .min(3, 'Account name too short')
    .max(100, 'Account name too long')
    .regex(/^[a-zA-Z\s]+$/, 'Account name must contain only letters'),
  accountNumber: z.string()
    .trim()
    .length(10, 'Account number must be exactly 10 digits')
    .regex(/^\d{10}$/, 'Account number must contain only digits'),
  bank: z.string()
    .trim()
    .min(1, 'Please select a bank'),
  amount: z.number()
    .positive('Amount must be positive')
    .min(100, 'Minimum withdrawal is ₦100')
    .max(10000000, 'Maximum withdrawal is ₦10,000,000'),
  bpcCode: z.string()
    .trim()
    .min(1, 'BPC code is required')
});

const Withdraw = () => {
  const navigate = useNavigate();
  const { userData, balance, updateBalance, addTransaction } = useUserStore();
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [bpcCode, setBpcCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAccountName, setIsLoadingAccountName] = useState(false);

  const nigerianBanks = [
    "Access Bank", "Zenith Bank", "First Bank", "GTBank", "UBA", "Fidelity Bank",
    "Ecobank", "Sterling Bank", "Union Bank", "Wema Bank", "FCMB", "Polaris Bank",
    "Stanbic IBTC", "Heritage Bank", "Keystone Bank", "Jaiz Bank", "Unity Bank",
    "Providus Bank", "TAJBank", "SunTrust Bank", "Globus Bank", "Premium Trust Bank",
    "Kuda Bank", "Moniepoint", "PalmPay", "OPay", "VFD Microfinance Bank",
    "Brass Bank", "Carbon", "Sparkle", "Rubies Bank", "Mint Digital Bank",
  ];

  // Mock account lookup - simulates bank API  
  const mockAccountLookup = (accountNum: string, bankName: string) => {
    // Simulate real banking system - return user's actual name for their account
    if (userData && userData.fullName) {
      // Convert to banking format (uppercase)
      return userData.fullName.toUpperCase();
    }
    
    // Fallback for demo purposes if no user data
    return "ACCOUNT HOLDER NAME";
  };

  // Auto-load account name when account number and bank are provided
  useEffect(() => {
    if (accountNumber.length === 10 && bank) {
      setIsLoadingAccountName(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const fetchedName = mockAccountLookup(accountNumber, bank);
        if (fetchedName) {
          setAccountName(fetchedName);
          toast({
            description: "Account name loaded successfully!",
          });
        } else {
          setAccountName("");
          toast({
            variant: "destructive",
            description: "Account not found. Please verify account number and bank.",
          });
        }
        setIsLoadingAccountName(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setAccountName("");
    }
  }, [accountNumber, bank]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate all inputs
      const validated = withdrawalSchema.parse({
        accountName: accountName.trim(),
        accountNumber: accountNumber.trim(),
        bank: bank.trim(),
        amount: parseFloat(amount),
        bpcCode: bpcCode.trim()
      });

      if (validated.bpcCode !== "BPC55262527") {
        toast({
          variant: "destructive",
          description: "Invalid BPC code. Please enter a valid code.",
        });
        setIsSubmitting(false);
        return;
      }

      if (validated.amount > balance) {
        toast({
          variant: "destructive",
          description: "Insufficient balance for this withdrawal",
        });
        setIsSubmitting(false);
        return;
      }
      
      updateBalance(-validated.amount);
      
      addTransaction({
        id: Date.now(),
        type: "Bank Transfer",
        amount: `-₦${validated.amount.toLocaleString()}`,
        date: new Date().toLocaleString(),
        status: "Completed",
        recipient: `${validated.accountName} - ${validated.accountNumber} (${validated.bank})`,
      });
      
      toast({
        description: "Transfer initiated successfully!",
      });
      
      navigate("/withdraw/processing", {
        state: {
          amount: validated.amount,
          accountName: validated.accountName,
          accountNumber: validated.accountNumber,
          bank: validated.bank
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          description: error.errors[0].message,
        });
      } else {
        toast({
          variant: "destructive",
          description: "An error occurred. Please try again.",
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-foreground relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-background z-0" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-space-glow/15 rounded-full blur-3xl z-0" />
      
      <header 
        className="py-3 px-4 text-center relative z-10 flex items-center"
        style={{
          background: 'hsl(var(--card) / 0.8)',
          borderBottom: '1px solid hsl(var(--border) / 0.5)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold flex-1">Transfer To Bank</h1>
        <div className="w-5"></div>
      </header>

      <div className="p-4 relative z-10">
        <h2 className="text-2xl font-bold mb-4">Bank Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full rounded-lg p-3 text-base bg-card/60 border-primary/50 text-foreground placeholder:text-muted-foreground"
              style={{ backdropFilter: 'blur(10px)' }}
              placeholder={isLoadingAccountName ? "Loading account name..." : "Account Name"}
              disabled={isLoadingAccountName}
            />
            {isLoadingAccountName && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full rounded-lg p-3 text-base bg-card/60 border-primary/50 text-foreground placeholder:text-muted-foreground"
              style={{ backdropFilter: 'blur(10px)' }}
              placeholder="Account Number (10 digits)"
              maxLength={10}
            />
          </div>

          <div className="relative">
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger 
                className="w-full rounded-lg p-3 h-12 text-base bg-card/60 border-primary/50 text-foreground"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] bg-card border-border">
                {nigerianBanks.map((bankName) => (
                  <SelectItem key={bankName} value={bankName}>
                    {bankName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg p-3 text-base bg-card/60 border-primary/50 text-foreground placeholder:text-muted-foreground"
              style={{ backdropFilter: 'blur(10px)' }}
              placeholder="Amount"
            />
          </div>
          
          <div className="relative">
            <Input
              type="text"
              value={bpcCode}
              onChange={(e) => setBpcCode(e.target.value)}
              className="w-full rounded-lg p-3 text-base bg-card/60 border-primary/50 text-foreground placeholder:text-muted-foreground"
              style={{ backdropFilter: 'blur(10px)' }}
              placeholder="BPC CODE (Buy BPC)"
            />
          </div>
          
          <div 
            className="text-primary text-base font-semibold cursor-pointer hover:text-space-glow transition-colors"
            onClick={() => navigate("/buy-bpc")}
          >
            <p>Buy BPC code</p>
          </div>
          
          <div 
            className="mt-6 p-4 rounded-lg"
            style={{
              background: 'hsl(var(--card) / 0.6)',
              border: '1px solid hsl(var(--border) / 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <p className="text-lg font-bold">Available Balance: <span className="text-primary">₦{balance.toLocaleString()}</span></p>
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full text-base py-4 mt-3 space-glow"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--space-glow)))',
            }}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
