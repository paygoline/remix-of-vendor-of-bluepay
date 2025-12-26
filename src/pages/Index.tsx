import React from "react";
import { useNavigate } from "react-router-dom";
import landingHero from "@/assets/landing-hero.jpeg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen w-full cursor-pointer"
      onClick={() => navigate("/register")}
      style={{
        backgroundImage: `url(${landingHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
};

export default Index;
