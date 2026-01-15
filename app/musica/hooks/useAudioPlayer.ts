// hooks/useAudioPlayer.ts
// Ci sta questo hook per gestire tutta la logica audio, peso!

import { useState, useRef, useEffect } from 'react';
import { Song } from '@/types/music.types';

export function useAudioPlayer(songs: Song[], currentSongIndex: number) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    // Reset quando cambia canzone
    useEffect(() => {
        setCurrentTime(0);
        setDuration(0);
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [currentSongIndex]);

    // Gestione play/pause
    const togglePlay = () => {
        if (!audioRef.current || !duration) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(err => {
                console.error('Errore play:', err);
            });
            setIsPlaying(true);
        }
    };

    // Gestione seek nella barra
    const handleSeek = (value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
        }
    };

    // Gestione volume
    const handleVolumeChange = (value: number) => {
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    // Toggle mute
    const toggleMute = () => {
        if (audioRef.current) {
            if (volume > 0) {
                setVolume(0);
                audioRef.current.volume = 0;
            } else {
                setVolume(0.7);
                audioRef.current.volume = 0.7;
            }
        }
    };

    return {
        audioRef,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        togglePlay,
        handleSeek,
        handleVolumeChange,
        toggleMute
    };
}