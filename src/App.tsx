import "./App.css";

import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import LiveSystemStatus from "./components/LiveSystemStatus";
import MotionDetectionTimeline from "./components/visuals/MotionDetectionTimeline";
import RainfallIntensity from "./components/visuals/RainfallIntensity";
import StreetlightBrightnesst from "./components/visuals/StreetlightBrightnesst";
import RainfaillMotionCorrelation from "./components/visuals/RainfallMotionCorrelation";
import { ThemeProvider } from "./components/theme-provider";
import { useTheme } from "@/components/theme-provider";

function App() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log(theme);
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };

  return (
    <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
      {theme}
      <div className="container mx-auto p-4">
        {/* Title and theme buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Smart Streetlight Dashboard</h1>
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === "light" ? (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>

        {/* Live System Status */}
        <LiveSystemStatus />

        {/* Visualisations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-4">
          <MotionDetectionTimeline />
          <RainfallIntensity />
          <StreetlightBrightnesst />
          <RainfaillMotionCorrelation />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
