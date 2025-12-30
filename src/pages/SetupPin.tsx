
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, X, Camera, Upload, User, ArrowLeft, Shield, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "../stores/userStore";
import { useToast } from "@/components/ui/use-toast";

const SetupPin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userData, setUserData, userPin, setUserPin } = useUserStore();
  const [pin, setPin] = useState<string>("");
  const maxPinLength = 4;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isFingerprintScanning, setIsFingerprintScanning] = useState(false);

  useEffect(() => {
    // If user tries to access pin page directly without registration
    if (!userData?.fullName && window.location.pathname === '/pin') {
      navigate('/register');
    }
  }, [userData, navigate]);

  const handleNumberClick = (num: number) => {
    if (pin.length < maxPinLength) {
      setPin((prev) => prev + num);
    }
    
    // Auto navigate when pin is complete
    if (pin.length === maxPinLength - 1) {
      setTimeout(() => {
        if (window.location.pathname === '/pin') {
          // Verify pin
          if (pin + num === userPin) {
            navigate("/dashboard");
          } else {
            toast({
              title: "Incorrect PIN",
              description: "The PIN you entered is incorrect. Please try again.",
              variant: "destructive"
            });
            setPin("");
          }
        } else {
          // Save the pin
          setUserPin(pin + num);
          navigate("/dashboard");
        }
      }, 500);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setPin("");
  };

  const handleFingerprint = () => {
    // Simulate accessing device fingerprint scanner
    setIsFingerprintScanning(true);
    
    // Show initial toast notification
    toast({
      title: "Accessing Fingerprint Scanner",
      description: "Please place your finger on the fingerprint sensor...",
    });
    
    // Simulate the scanning process with multiple steps
    setTimeout(() => {
      toast({
        title: "Scanning Fingerprint",
        description: "Reading fingerprint data...",
      });
      
      setTimeout(() => {
        toast({
          title: "Verifying Identity",
          description: "Matching fingerprint with stored data...",
        });
        
        setTimeout(() => {
          setIsFingerprintScanning(false);
          
          // Simulate a successful fingerprint authentication
          toast({
            title: "Authentication Successful",
            description: "Fingerprint verified successfully!",
          });
          
          setTimeout(() => {
            // If on pin verification page, navigate to dashboard
            if (window.location.pathname === '/pin') {
              navigate("/dashboard");
            } else {
              // If setting up pin, generate a random PIN and navigate
              const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
              setUserPin(randomPin);
              toast({
                title: "PIN Created",
                description: `Your PIN has been set to: ${randomPin}`,
              });
              navigate("/dashboard");
            }
          }, 500);
        }, 1200);
      }, 1000);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({
          ...userData!,
          profileImage: reader.result as string
        });
        toast({
          title: "Profile updated",
          description: "Your profile image has been updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-foreground relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-background z-0" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-space-glow/15 rounded-full blur-3xl z-0" />
      
      <header className="w-full p-4 flex justify-between items-center relative z-10">
        <button onClick={() => navigate(window.location.pathname === '/pin' ? '/' : '/register')} className="flex items-center text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold">
          {window.location.pathname === '/pin' ? 'Sign In' : 'Create PIN'}
        </h2>
        <button onClick={toggleProfile} className="flex items-center text-foreground">
          <User className="h-5 w-5" />
        </button>
      </header>

      <div className="w-full max-w-md px-4 py-6 flex flex-col items-center relative z-10">
        {showProfile ? (
          <div 
            className="w-full rounded-xl p-5 mb-8"
            style={{
              background: 'hsl(var(--card) / 0.6)',
              border: '1px solid hsl(var(--border) / 0.5)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
            <div className="flex gap-4 items-center mb-4">
              <div 
                className="relative w-16 h-16 bg-card/60 rounded-full flex items-center justify-center cursor-pointer border border-border/50"
                onClick={triggerFileUpload}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
                
                {userData?.profileImage ? (
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={userData.profileImage} alt="Profile" className="object-cover" />
                    <AvatarFallback className="bg-card/60">
                      <User className="text-foreground w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-card/60 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                      <Upload className="w-3 h-3" />
                    </div>
                  </>
                )}
              </div>
              <div>
                <p className="font-medium text-lg">{userData?.fullName || "Guest User"}</p>
                <p className="text-sm text-muted-foreground">{userData?.email || "No email set"}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Security Settings</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Transaction History</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  <span>Settings</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </div>
            </div>
            <Button
              className="w-full py-3 font-bold rounded-full mt-6"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--space-glow)))',
              }}
              onClick={toggleProfile}
            >
              Back to {window.location.pathname === '/pin' ? 'Sign In' : 'PIN Setup'}
            </Button>
          </div>
        ) : (
          <>
            <div 
              className="relative w-24 h-24 rounded-full flex items-center justify-center mb-8 cursor-pointer"
              style={{
                background: 'hsl(var(--card) / 0.6)',
                border: '1px solid hsl(var(--border) / 0.5)',
                backdropFilter: 'blur(20px)'
              }}
              onClick={triggerFileUpload}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
              
              {userData?.profileImage ? (
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.profileImage} alt="Profile" className="object-cover" />
                  <AvatarFallback className="bg-card/60">
                    <User className="text-foreground w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <>
                  <div className="w-16 h-16 bg-card/60 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-foreground" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1">
                    <Upload className="w-4 h-4" />
                  </div>
                </>
              )}
            </div>

            <h1 className="text-3xl font-semibold mb-2 text-foreground">Enter Your Passcode</h1>
            <p className="text-muted-foreground mb-8">
              {window.location.pathname === '/pin' 
                ? 'Enter your PIN to access your wallet'
                : 'Create a 4-digit PIN for your wallet'}
            </p>

            <div className="flex gap-4 mb-12">
              {Array.from({ length: maxPinLength }).map((_, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                    i < pin.length ? "border-primary bg-primary/20" : "border-border/50"
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {i < pin.length && <div className="w-4 h-4 bg-primary rounded-full"></div>}
                </div>
              ))}
            </div>

            <div className="w-full border-t border-border/30 mb-8"></div>

            <div className="grid grid-cols-3 gap-8 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-medium text-foreground transition-all hover:scale-105"
                  style={{
                    background: 'hsl(var(--card) / 0.6)',
                    border: '1px solid hsl(var(--border) / 0.5)',
                    backdropFilter: 'blur(10px)'
                  }}
                  disabled={isFingerprintScanning}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleNumberClick(0)}
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-medium text-foreground transition-all hover:scale-105"
                style={{
                  background: 'hsl(var(--card) / 0.6)',
                  border: '1px solid hsl(var(--border) / 0.5)',
                  backdropFilter: 'blur(10px)'
                }}
                disabled={isFingerprintScanning}
              >
                0
              </button>
              <button 
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isFingerprintScanning ? 'animate-pulse' : ''}`}
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--space-glow)))',
                }}
                onClick={handleFingerprint}
                disabled={isFingerprintScanning}
              >
                <Fingerprint className="text-primary-foreground w-8 h-8" />
              </button>
              <button
                onClick={handleDelete}
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'hsl(var(--destructive) / 0.8)',
                }}
                disabled={isFingerprintScanning}
              >
                <X className="text-destructive-foreground w-8 h-8" />
              </button>
            </div>

            <div className="mt-4 space-y-2 text-center">
              <p className="text-muted-foreground">Forgotten your passcode?</p>
              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-primary hover:text-space-glow hover:bg-card/30"
                disabled={isFingerprintScanning}
              >
                Reset passcode
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SetupPin;
