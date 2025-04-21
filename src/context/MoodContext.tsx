
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Mood = "happy" | "sad" | "chill" | "angry" | "excited" | "lonely" | null;

interface MoodContent {
  quote: string;
  affirmation: string;
  songs: { title: string; artist: string }[];
  backgroundImage?: string;
}

interface MoodContextType {
  selectedMood: Mood;
  moodContent: MoodContent | null;
  loading: boolean;
  error: string | null;
  favorites: MoodContent[];
  setSelectedMood: (mood: Mood) => void;
  generateContent: () => Promise<void>;
  addToFavorites: (content: MoodContent) => void;
  removeFromFavorites: (content: MoodContent) => void;
}

// Create context with default values
const MoodContext = createContext<MoodContextType>({
  selectedMood: null,
  moodContent: null,
  loading: false,
  error: null,
  favorites: [],
  setSelectedMood: () => {},
  generateContent: async () => {},
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

// Mock data for different moods
const mockContent: Record<string, MoodContent> = {
  happy: {
    quote: "Happiness is not something ready-made. It comes from your own actions.",
    affirmation: "I choose to be happy and spread joy to those around me.",
    songs: [
      { title: "Happy", artist: "Pharrell Williams" },
      { title: "Good as Hell", artist: "Lizzo" },
      { title: "Walking on Sunshine", artist: "Katrina & The Waves" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop",
  },
  sad: {
    quote: "Tears are words that need to be written.",
    affirmation: "I honor my feelings but do not let them define me. This too shall pass.",
    songs: [
      { title: "Someone Like You", artist: "Adele" },
      { title: "Fix You", artist: "Coldplay" },
      { title: "Everybody Hurts", artist: "R.E.M." },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=2151&auto=format&fit=crop",
  },
  chill: {
    quote: "Life isn't as serious as the mind makes it out to be.",
    affirmation: "I am present and at peace with this moment exactly as it is.",
    songs: [
      { title: "Sunday Morning", artist: "Maroon 5" },
      { title: "Breathe", artist: "Télépopmusik" },
      { title: "Flightless Bird, American Mouth", artist: "Iron & Wine" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2070&auto=format&fit=crop",
  },
  angry: {
    quote: "Speak when you are angry and you will make the best speech you will ever regret.",
    affirmation: "I release my anger and choose responses that serve my highest good.",
    songs: [
      { title: "Break Stuff", artist: "Limp Bizkit" },
      { title: "Killing In The Name", artist: "Rage Against The Machine" },
      { title: "Wake Up", artist: "Arcade Fire" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=2073&auto=format&fit=crop",
  },
  excited: {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    affirmation: "I embrace the energy of possibility and opportunity all around me.",
    songs: [
      { title: "Can't Stop the Feeling!", artist: "Justin Timberlake" },
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
      { title: "Good Time", artist: "Owl City & Carly Rae Jepsen" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
  },
  lonely: {
    quote: "Sometimes you need to be alone to reflect on life. Take time to take care of yourself.",
    affirmation: "I am complete within myself. Solitude offers me space to grow and reflect.",
    songs: [
      { title: "Lonely", artist: "Justin Bieber & benny blanco" },
      { title: "All By Myself", artist: "Céline Dion" },
      { title: "Dancing On My Own", artist: "Robyn" },
    ],
    backgroundImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2073&auto=format&fit=crop",
  },
};

// Provider component
export const MoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [moodContent, setMoodContent] = useState<MoodContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<MoodContent[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("moodmuseFavorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error("Error parsing favorites from localStorage:", e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("moodmuseFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Function to generate content based on selected mood
  const generateContent = async () => {
    if (!selectedMood) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to an AI service
      // For now, we'll use our mock data and add a delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMoodContent(mockContent[selectedMood]);
    } catch (err) {
      setError("Failed to generate content. Please try again.");
      console.error("Error generating content:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to add content to favorites
  const addToFavorites = (content: MoodContent) => {
    setFavorites(prevFavorites => {
      // Check if already in favorites
      const isAlreadyFavorite = prevFavorites.some(
        fav => fav.quote === content.quote && fav.affirmation === content.affirmation
      );
      
      if (isAlreadyFavorite) return prevFavorites;
      return [...prevFavorites, content];
    });
  };

  // Function to remove content from favorites
  const removeFromFavorites = (content: MoodContent) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(
        fav => !(fav.quote === content.quote && fav.affirmation === content.affirmation)
      )
    );
  };

  return (
    <MoodContext.Provider
      value={{
        selectedMood,
        moodContent,
        loading,
        error,
        favorites,
        setSelectedMood,
        generateContent,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

// Custom hook to use the mood context
export const useMood = () => useContext(MoodContext);
