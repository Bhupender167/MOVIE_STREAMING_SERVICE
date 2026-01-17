import React, { useEffect, useState } from "react";
import Navbar from "./components/ui/Navbar";
import AllRoute from "./routes/AllRoute";
import SplashScreen from "./components/extras/SplashScreen";

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Navbar />
      <AllRoute />
    </div>
  );
};

export default App;
