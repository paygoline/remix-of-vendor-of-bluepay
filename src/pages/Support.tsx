
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Phone, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

const Support = () => {
  const navigate = useNavigate();

  const handleLiveChatClick = () => {
    window.open('https://t.me/Bluepay2025_bot', '_blank');
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
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
        }}
      >
        <button onClick={() => navigate("/dashboard")} className="text-lg text-primary-foreground">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold text-primary-foreground">Support</h1>
        <div className="w-6 h-6"></div>
      </header>

      <div className="relative z-10 p-4 flex-1">
        <h2 className="text-xl font-bold mb-4 text-foreground">How can we help you?</h2>
        
        <div className="space-y-4">
          <div 
            className="rounded-2xl p-5 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--card) / 0.9) 0%, hsl(var(--secondary) / 0.8) 100%)',
              border: '1px solid hsl(var(--primary) / 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
                }}
              >
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">Email Support</h3>
                <p className="text-muted-foreground text-sm">Get comprehensive help via email</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 py-3 text-sm font-semibold rounded-xl shadow-md transition-all duration-200 text-primary-foreground"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--space-glow)) 100%)',
              }}
              onClick={() => window.open('mailto:bluepaycustomerservice25@gmail.com')}
            >
              Send Email
            </Button>
          </div>
          
          <div 
            className="rounded-2xl p-5 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--card) / 0.9) 0%, hsl(142 76% 15% / 0.5) 100%)',
              border: '1px solid hsl(142 76% 36% / 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(142 69% 45%) 100%)',
                }}
              >
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">WhatsApp Support</h3>
                <p className="text-muted-foreground text-sm">Quick chat on WhatsApp</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 py-3 text-sm font-semibold rounded-xl shadow-md transition-all duration-200 text-white"
              style={{
                background: 'linear-gradient(135deg, hsl(142 76% 36%) 0%, hsl(142 69% 45%) 100%)',
              }}
              onClick={() => window.open('https://wa.me/2349079076212')}
            >
              Chat on WhatsApp
            </Button>
          </div>
          
          <div 
            className="rounded-2xl p-5 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--card) / 0.9) 0%, hsl(270 76% 15% / 0.5) 100%)',
              border: '1px solid hsl(270 76% 50% / 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: 'linear-gradient(135deg, hsl(270 76% 50%) 0%, hsl(270 69% 60%) 100%)',
                }}
              >
                <LifeBuoy className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">Live Chat Support</h3>
                <p className="text-muted-foreground text-sm">Instant chat with support agents</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 py-3 text-sm font-semibold rounded-xl shadow-md transition-all duration-200 text-white"
              style={{
                background: 'linear-gradient(135deg, hsl(270 76% 50%) 0%, hsl(270 69% 60%) 100%)',
              }}
              onClick={handleLiveChatClick}
            >
              Start Live Chat
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">Available 24/7 for your support needs</p>
          <p className="text-primary font-medium mt-1 text-sm">bluepaycustomerservice25@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
