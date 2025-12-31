
import React from "react";
import { ArrowLeft, History, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "../stores/userStore";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { transactions } = useUserStore();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-space-glow/15 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <header 
        className="relative z-10 py-3 px-4 sticky top-0"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2 text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary-foreground">Transaction History</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="relative z-10 p-4">
        <Card 
          className="p-3 mb-4 shadow-lg"
          style={{
            background: 'hsl(var(--card) / 0.8)',
            border: '1px solid hsl(var(--border) / 0.5)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold mb-1 text-foreground">All Transactions</h3>
              <p className="text-xs text-muted-foreground">{transactions.length} total transactions</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs border-primary/50 text-foreground hover:bg-primary/10"
            >
              <Download className="h-3 w-3" />
              Export
            </Button>
          </div>
        </Card>

        <div className="space-y-2">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <Card 
                key={transaction.id} 
                className="p-3 shadow-lg"
                style={{
                  background: 'hsl(var(--card) / 0.8)',
                  border: '1px solid hsl(var(--border) / 0.5)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{transaction.type}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{transaction.date}</p>
                    {transaction.recipient && (
                      <p className="text-xs text-muted-foreground mt-1">{transaction.recipient}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${
                      transaction.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {transaction.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400'
                        : transaction.status === 'Processing'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card 
              className="p-6 text-center shadow-lg"
              style={{
                background: 'hsl(var(--card) / 0.8)',
                border: '1px solid hsl(var(--border) / 0.5)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <History className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-2">No Transactions Yet</h3>
              <p className="text-xs text-muted-foreground">Your transaction history will appear here</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
