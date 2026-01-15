// hooks/useVideoPlayer.ts
// Hook per gestire i video background, top!

import { useRef, useEffect } from 'react';

export function useVideoPlayer(currentSongIndex: number) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const nextVideoRef = useRef<HTMLVideoElement | null>(null);

    // Preload del video successivo per transizioni smooth
    useEffect(() => {
        // Bismillah, qui carichiamo il prossimo video in anticipo
        if (nextVideoRef.current) {
            nextVideoRef.current.load();
        }
    }, [currentSongIndex]);

    // Reset video quando cambia song
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(err => {
                console.error('Errore play video:', err);
            });
        }
    }, [currentSongIndex]);

    return { videoRef, nextVideoRef };
}