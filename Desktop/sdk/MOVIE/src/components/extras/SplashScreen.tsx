import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/ChatGPT_Image_Jan_12__2026__06_44_47_AM-removebg-preview.png";

interface SplashScreenProps {
  redirectTo?: string;
  delay?: number; // milliseconds
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  redirectTo = "/",
  delay = 2000,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo);
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6 animate-fade-in">

        {/* Logo */}
        <img
          src={logo}
          alt="Betaflix Logo"
          className="w-48 md:w-64 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]
                     animate-scale-in"
        />

        {/* Tagline */}
        <p className="text-sm md:text-base text-gray-400 tracking-widest uppercase">
          Stream Beyond Limits
        </p>

        {/* Loader */}
        <div className="w-10 h-10 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default SplashScreen;
