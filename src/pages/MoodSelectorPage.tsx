
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "@/context/MoodContext";
import MoodCard from "@/components/MoodCard";
import { Button } from "@/components/ui/button";

const MoodSelectorPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedMood, setSelectedMood, generateContent } = useMood();

  const moods = ["happy", "sad", "chill", "angry", "excited", "lonely"] as const;

  const handleMoodSelect = (mood: typeof moods[number]) => {
    setSelectedMood(mood);
  };

  const handleContinue = async () => {
    await generateContent();
    navigate("/results");
  };

  return (
    <div className="min-h-screen flex flex-col px-4 py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">How are you feeling today?</h1>
          <p className="text-lg text-muted-foreground">
            Select a mood to get personalized inspiration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {moods.map((mood) => (
            <MoodCard
              key={mood}
              mood={mood}
              onClick={handleMoodSelect}
              selected={selectedMood === mood}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleContinue}
            size="lg"
            disabled={!selectedMood}
            className="px-8 py-6 text-lg rounded-full shadow-lg"
          >
            Continue
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-muted-foreground"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelectorPage;
