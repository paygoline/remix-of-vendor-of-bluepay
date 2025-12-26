
import React from "react";
import { useNavigate } from "react-router-dom";

const MoreServices = () => {
  const navigate = useNavigate();

  const moreServices = [
    {
      id: 'support',
      title: 'Support',
      emoji: '📡',
      onClick: () => navigate("/support")
    },
    {
      id: 'group',
      title: 'Group',
      emoji: '🌐',
      onClick: () => navigate("/platform")
    },
    {
      id: 'earn',
      title: 'Earn More',
      emoji: '💲',
      onClick: () => navigate("/earn-more")
    },
    {
      id: 'profile',
      title: 'Profile',
      emoji: '👤',
      onClick: () => navigate("/profile")
    }
  ];

  return (
    <div 
      className="rounded-xl p-4 mb-2"
      style={{
        background: 'hsl(var(--card) / 0.6)',
        border: '1px solid hsl(var(--border) / 0.5)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <h3 className="font-bold text-base mb-3 text-foreground">More Services</h3>
      <div className="grid grid-cols-4 gap-3">
        {moreServices.map((service) => (
          <div 
            key={service.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={service.onClick}
          >
            <div 
              className="h-12 w-12 rounded-xl mb-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.15) 0%, hsl(222 47% 20% / 0.3) 100%)',
                border: '1px solid hsl(217 91% 60% / 0.2)',
              }}
            >
              <span className="text-xl">{service.emoji}</span>
            </div>
            <p className="text-xs font-medium text-center text-foreground/80">{service.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreServices;
