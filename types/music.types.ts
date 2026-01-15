// types/music.types.ts
// Aksmillah, qui mettiamo tutti i tipi per non fare casino

export interface Song {
    _id: string;
    title: string;
    artist: string;
    producer?: string;
    album?: string;
    coverImage?: string;
    visualVideo?: string;
    file: string;
    duration?: string;
    order: number;
}

export interface AudioPlayerState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
}