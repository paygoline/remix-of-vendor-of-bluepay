
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "../stores/userStore";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DataPurchase = () => {
  const navigate = useNavigate();
  const { balance, updateBalance, addTransaction } = useUserStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [network, setNetwork] = useState("");
  const [dataBundle, setDataBundle] = useState("");
  const [bpcCode, setBpcCode] = useState("");
  
  const networks = ["MTN", "Airtel", "Glo", "9Mobile"];
  
  const dataBundles = [
    { id: "1", name: "1GB (30 Days)", price: 500 },
    { id: "2", name: "2GB (30 Days)", price: 1000 },
    { id: "3", name: "5GB (30 Days)", price: 2000 },
    { id: "4", name: "10GB (30 Days)", price: 3500 },
    { id: "5", name: "20GB (30 Days)", price: 5000 },
  ];
  
  const selectedBundle = dataBundles.find(bundle => bundle.id === dataBundle);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !network || !dataBundle || !bpcCode) {
      toast({
        variant: "destructive",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (phoneNumber.length !== 11) {
      toast({
        variant: "destructive",
        description: "Please enter a valid 11-digit phone number",
      });
      return;
    }

    if (bpcCode !== "BPC55262527") {
      toast({
        variant: "destructive",
        description: "Invalid BPC code. Please enter a valid code.",
      });
      return;
    }

    if (!selectedBundle) {
      toast({
        variant: "destructive",
        description: "Please select a valid data bundle",
      });
      return;
    }

    updateBalance(-selectedBundle.price);
    
    addTransaction({
      id: Date.now(),
      type: `${network} Data Bundle`,
      amount: `-₦${selectedBundle.price.toLocaleString()}`,
      date: new Date().toLocaleString(),
      status: "Completed",
      recipient: phoneNumber,
    });
    
    toast({
      description: "Data purchase successful!",
    });
    
    navigate("/dashboard");
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
        <div className="flex items-center">
          <button onClick={() => navigate("/dashboard")} className="mr-2 text-primary-foreground">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-primary-foreground">Buy Data Bundle</h1>
        </div>
      </header>

      <div className="relative z-10 p-4 flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-foreground mb-1 text-sm">Select Network</label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger 
                className="w-full rounded-lg p-3 h-12 text-base text-foreground"
                style={{
                  background: 'hsl(var(--card) / 0.8)',
                  border: '2px solid hsl(var(--primary))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <SelectValue placeholder="Select Network" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {networks.map((net) => (
                  <SelectItem key={net} value={net} className="text-foreground">
                    {net}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-foreground mb-1 text-sm">Phone Number</label>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-lg p-3 text-base text-foreground placeholder:text-muted-foreground"
              style={{
                background: 'hsl(var(--card) / 0.8)',
                border: '2px solid hsl(var(--primary))',
                backdropFilter: 'blur(10px)',
              }}
              placeholder="Enter 11-digit phone number"
              maxLength={11}
            />
          </div>
          
          <div>
            <label className="block text-foreground mb-1 text-sm">Data Bundle</label>
            <Select value={dataBundle} onValueChange={setDataBundle}>
              <SelectTrigger 
                className="w-full rounded-lg p-3 h-12 text-base text-foreground"
                style={{
                  background: 'hsl(var(--card) / 0.8)',
                  border: '2px solid hsl(var(--primary))',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <SelectValue placeholder="Select Data Bundle" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {dataBundles.map((bundle) => (
                  <SelectItem key={bundle.id} value={bundle.id} className="text-foreground">
                    {bundle.name} - ₦{bundle.price.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-foreground mb-1 text-sm">BPC CODE</label>
            <Input
              type="text"
              value={bpcCode}
              onChange={(e) => setBpcCode(e.target.value)}
              className="w-full rounded-lg p-3 text-base text-foreground placeholder:text-muted-foreground"
              style={{
                background: 'hsl(var(--card) / 0.8)',
                border: '2px solid hsl(var(--primary))',
                backdropFilter: 'blur(10px)',
              }}
              placeholder="Enter BPC code"
            />
          </div>
          
          <div 
            className="mt-6 p-4 rounded-xl"
            style={{
              background: 'hsl(var(--card) / 0.8)',
              border: '1px solid hsl(var(--border) / 0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="text-lg font-bold text-foreground">Available Balance: ₦{balance.toLocaleString()}</p>
          </div>
          
          <Button 
            type="submit"
            className="w-full text-base py-4 mt-3 text-primary-foreground"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
            }}
          >
            Purchase Data
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DataPurchase;
