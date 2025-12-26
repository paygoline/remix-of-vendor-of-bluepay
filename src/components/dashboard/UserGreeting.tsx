
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "../../types/user";
import TypewriterText from "../ui/TypewriterText";

interface UserGreetingProps {
  userData: UserData | null;
}

const UserGreeting = ({ userData }: UserGreetingProps) => {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
        <Avatar 
          className="w-11 h-11"
          style={{
            border: '2px solid hsl(217 91% 60% / 0.5)',
          }}
        >
          {userData?.profileImage ? (
            <AvatarImage src={userData.profileImage} alt="Profile" className="object-cover" />
          ) : (
            <AvatarFallback className="bg-primary/20">
              <span className="text-lg">👤</span>
            </AvatarFallback>
          )}
        </Avatar>
        <h2 className="text-lg font-semibold text-foreground">
          Hi, <TypewriterText text={userData?.fullName || "User"} speed={100} className="font-semibold text-primary" />
        </h2>
      </div>
      <div 
        className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.2) 0%, hsl(222 47% 20% / 0.4) 100%)',
          border: '1px solid hsl(217 91% 60% / 0.3)',
        }}
      >
        <span className="text-sm">🔔</span>
      </div>
    </div>
  );
};

export default UserGreeting;
