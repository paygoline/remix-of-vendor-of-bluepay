import React from "react";
import { MessageCircle } from "lucide-react";

interface FloatingChatButtonProps {
  onClick?: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 space-glow"
      style={{
        background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.3) 0%, hsl(222 47% 20% / 0.5) 100%)',
        border: '2px solid hsl(217 91% 60% / 0.5)',
      }}
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6 text-primary" />
    </button>
  );
};

export default FloatingChatButton;
