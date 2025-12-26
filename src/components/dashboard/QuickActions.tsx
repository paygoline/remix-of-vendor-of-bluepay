
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const QuickActions = () => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVideoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleWatch = () => {
    setIsVideoOpen(true);
  };

  const quickActions = [
    {
      id: 'buy-bpc',
      title: 'Buy BPC',
      emoji: '🛍',
      onClick: () => navigate("/buy-bpc")
    },
    {
      id: 'watch',
      title: 'Watch',
      emoji: '📺',
      onClick: handleWatch
    },
    {
      id: 'airtime',
      title: 'Airtime',
      emoji: '☎',
      onClick: () => navigate("/airtime")
    },
    {
      id: 'data',
      title: 'Data',
      emoji: '📶',
      onClick: () => navigate("/data")
    }
  ];

  return (
    <>
      <div 
        className="rounded-xl p-4 mb-2"
        style={{
          background: 'hsl(var(--card) / 0.6)',
          border: '1px solid hsl(var(--border) / 0.5)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <div 
              key={action.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={action.onClick}
            >
              <div 
                className="h-12 w-12 rounded-xl mb-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.2) 0%, hsl(222 47% 20% / 0.4) 100%)',
                  border: '1px solid hsl(217 91% 60% / 0.3)',
                }}
              >
                <span className="text-xl">{action.emoji}</span>
              </div>
              <p className="text-xs font-medium text-center text-foreground/80">{action.title}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-card border-border">
          <DialogHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-foreground">BluPay Tutorial</DialogTitle>
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </DialogHeader>
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.dailymotion.com/embed/video/x9qytu2"
              frameBorder="0"
              allowFullScreen
              className="rounded-b-lg"
              title="BluPay Tutorial"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickActions;
