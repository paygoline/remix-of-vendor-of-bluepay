
import React, { useEffect, useRef } from "react";
import { useUserStore } from "../stores/userStore";
import Header from "../components/dashboard/Header";
import UserGreeting from "../components/dashboard/UserGreeting";
import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import MoreServices from "../components/dashboard/MoreServices";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import BottomNavigation from "../components/dashboard/BottomNavigation";
import OpayNotificationBanner from "../components/dashboard/OpayNotificationBanner";
import ImportantInformation from "../components/dashboard/ImportantInformation";
import WithdrawalNotifications from "../components/dashboard/WithdrawalNotifications";
import WelcomeOnboarding from "../components/dashboard/WelcomeOnboarding";
import DraggableBadge from "../components/dashboard/DraggableBadge";

const Dashboard = () => {
  const { userData, balance, transactions } = useUserStore();
  const hasPlayedWelcome = useRef(false);

  useEffect(() => {
    const playWelcomeMessage = () => {
      if (hasPlayedWelcome.current || !userData?.fullName) return;
      
      if (!('speechSynthesis' in window)) {
        return;
      }

      hasPlayedWelcome.current = true;

      const welcomeText = `Hi ${userData.fullName}, welcome to bluepay to the latest version of bluepay, where you can make 200,000 naira daily just by purchasing your BPC code for the sum of 6,200 naira, kindly click on the BPC button to purchase your code directly from the application, have a nice day.`;

      const speak = () => {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(welcomeText);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.lang = 'en-US';
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.lang.includes('en') && 
          (voice.name.includes('Female') || 
           voice.name.includes('Samantha') ||
           voice.name.includes('Google') ||
           voice.name.includes('Microsoft'))
        ) || voices.find(voice => voice.lang.includes('en')) || voices[0];
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onerror = () => {};
        window.speechSynthesis.speak(utterance);
      };

      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          setTimeout(speak, 500);
        };
        window.speechSynthesis.getVoices();
      } else {
        setTimeout(speak, 800);
      }
    };

    const timer = setTimeout(playWelcomeMessage, 1000);
    return () => clearTimeout(timer);
  }, [userData]);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 relative">
      {/* Space background effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />
      <div className="fixed inset-0 opacity-30 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(217 91% 60% / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(199 89% 48% / 0.1) 0%, transparent 50%)'
        }} 
      />
      
      <WelcomeOnboarding />
      <WithdrawalNotifications />
      <OpayNotificationBanner />
      <Header />

      <div className="p-3 space-y-3 relative z-10">
        <UserGreeting userData={userData} />
        <BalanceCard balance={balance} />
        <QuickActions />
        <MoreServices />
        <ImportantInformation />
        <RecentTransactions transactions={transactions} />
      </div>
      
      <BottomNavigation />
      <DraggableBadge />
    </div>
  );
};

export default Dashboard;
