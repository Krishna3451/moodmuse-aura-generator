
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Song {
  title: string;
  artist: string;
}

interface SongListProps {
  songs: Song[];
  className?: string;
}

const SongList: React.FC<SongListProps> = ({ songs, className }) => {
  return (
    <Card className={cn("overflow-hidden shadow-lg animate-scale-in", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Recommended Songs</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-3">
          {songs.map((song, index) => (
            <li key={index} className="p-3 bg-background rounded-lg shadow-sm">
              <div className="font-medium">{song.title}</div>
              <div className="text-sm text-muted-foreground">{song.artist}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SongList;
