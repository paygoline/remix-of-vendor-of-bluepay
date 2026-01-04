
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useUserStore } from "../stores/userStore";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Simple password validation - just minimum 1 character
const passwordSchema = z.string().min(1, 'Password is required');

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUserData } = useUserStore();
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    enteredReferralCode: "",
  });

  useEffect(() => {
    // Only use URL parameter for referral code
    const refCode = searchParams.get('ref');
    
    if (refCode) {
      const upperRefCode = refCode.trim().toUpperCase();
      setReferralCode(upperRefCode);
      setFormData((prev) => ({ ...prev, enteredReferralCode: upperRefCode }));
      toast({
        title: "Referral Code Applied!",
        description: `Using referral code: ${upperRefCode}`,
      });
    }
  }, [searchParams, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate password strength
      const passwordValidation = passwordSchema.safeParse(formData.password);
      if (!passwordValidation.success) {
        toast({
          title: "Weak Password",
          description: passwordValidation.error.errors[0].message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Generate unique email by appending timestamp to allow same email multiple times
      const timestamp = Date.now();
      const emailParts = formData.email.split('@');
      const uniqueEmail = `${emailParts[0]}+${timestamp}@${emailParts[1]}`;

      // Sign up with Supabase Auth using unique email
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: uniqueEmail,
        password: formData.password,
        options: {
          data: {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            originalEmail: formData.email, // Store original email for reference
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Process referral code if provided
      const codeToUse = formData.enteredReferralCode.trim().toUpperCase();
      if (codeToUse) {
        const { error: referralError } = await supabase.rpc("process_referral", {
          referrer_code: codeToUse,
          new_user_id: authData.user.id,
        });

        if (referralError) {
          toast({
            title: "Registration Successful",
            description: "Account created, but referral code could not be applied.",
            variant: "default",
          });
        } else {
          toast({
            title: "Registration Successful!",
            description: `Welcome! Your referrer has been credited.`,
          });
        }
      } else {
        toast({
          title: "Registration Successful!",
          description: "Your account has been created.",
        });
      }

      // Store user data locally
      setUserData({
        fullName: formData.fullName,
        email: formData.email,
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: "Unable to complete registration. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelpClick = () => {
    window.open("https://t.me/+mCOs_ePA7Rk2YzRk", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col text-foreground relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-background z-0" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-space-glow/15 rounded-full blur-3xl z-0" />
      
      <header className="p-3 relative z-10">
        <button onClick={() => navigate("/")} className="flex items-center text-foreground">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </button>
        <div className="absolute top-3 right-3">
          <span className="text-foreground cursor-pointer text-sm hover:text-primary transition-colors" onClick={handleHelpClick}>You Need Help?</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center p-4 relative z-10">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-2xl font-bold mb-2 text-foreground text-center">BLUEPAY</h1>
          <h2 className="text-xl font-bold mb-3 text-foreground">Welcome!</h2>
          
          {referralCode && (
            <div 
              className="rounded-lg p-2 mb-3"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--space-glow) / 0.15))',
                border: '1px solid hsl(var(--primary) / 0.4)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <p className="text-primary text-xs">
                🎉 Referral code detected: <span className="font-bold">{referralCode}</span>
              </p>
              <p className="text-muted-foreground text-xs">Your referrer will be credited when you register!</p>
            </div>
          )}
          
          <p className="text-muted-foreground mb-4 text-sm">
            Get your account ready and instantly start buying, selling airtime and data online and start paying all your bills in cheaper price.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="rounded-md bg-card/60 border-border/50 px-3 py-2 text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-md bg-card/60 border-border/50 px-3 py-2 text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-md bg-card/60 border-border/50 px-3 py-2 text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
              required
            />
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">+234</span>
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="rounded-md bg-card/60 border-border/50 pl-12 py-2 text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
                required
              />
            </div>

            <Input
              name="enteredReferralCode"
              placeholder="Referral Code (Optional)"
              value={formData.enteredReferralCode}
              onChange={handleChange}
              className="rounded-md bg-card/60 border-border/50 px-3 py-2 text-foreground placeholder:text-muted-foreground backdrop-blur-sm uppercase"
              maxLength={6}
            />

            <p className="text-xs text-muted-foreground">
              Any further actions indicates that you agree with our terms & conditions!
            </p>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 font-bold rounded-full disabled:opacity-50 space-glow"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--space-glow)))',
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground text-sm">Already have an account? </span>
            <button 
              onClick={() => navigate("/pin")} 
              className="text-primary font-medium underline text-sm hover:text-space-glow transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
