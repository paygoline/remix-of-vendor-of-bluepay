import React from "react";
import { useNavigate } from "react-router-dom";
import landingHero from "@/assets/landing-hero.jpeg";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    // Navigate to support or open chat modal
    navigate("/support");
  };

  return (
    <div 
      className="min-h-screen w-full cursor-pointer relative"
      onClick={() => navigate("/register")}
      style={{
        backgroundImage: `url(${landingHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Floating Chat Button */}
      <div onClick={(e) => e.stopPropagation()}>
        <FloatingChatButton onClick={handleChatClick} />
      </div>
    </div>
  );
};

export default Index;
