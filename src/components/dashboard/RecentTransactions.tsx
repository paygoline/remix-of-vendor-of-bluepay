
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "../../types/transaction";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <div 
      className="rounded-xl p-4"
      style={{
        background: 'hsl(var(--card) / 0.6)',
        border: '1px solid hsl(var(--border) / 0.5)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-sm text-foreground">Recent Transactions</h3>
        <Button variant="ghost" className="h-6 px-2 text-primary text-xs hover:bg-primary/10">
          View All <ArrowRight size={12} className="ml-1" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {transactions.slice(0, 3).map(transaction => (
          <div 
            key={transaction.id} 
            className="flex justify-between py-2 px-3 rounded-lg"
            style={{
              background: 'hsl(var(--muted) / 0.3)',
              border: '1px solid hsl(var(--border) / 0.3)',
            }}
          >
            <div>
              <p className="font-medium text-xs text-foreground">{transaction.type}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
              {transaction.recipient && (
                <p className="text-xs text-muted-foreground">{transaction.recipient}</p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold text-xs text-foreground">{transaction.amount}</p>
              <p className={`text-xs ${transaction.status === "Completed" ? "text-green-400" : "text-orange-400"}`}>
                {transaction.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
