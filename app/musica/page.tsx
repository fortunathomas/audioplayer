"use client"
// app/musica/page.tsx (o dove hai la tua pagina)
// Refactor completo, la stai sborrando tho! 🔥

import React, { useState, useEffect } from "react";
import styles from './style/MusicPlayer.module.css';

// Hooks custom, top!
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import { useSongs } from './hooks/useSongs';

// Componenti modulari, gasi!
import {
    VideoBackground,
    AudioEngine,
    PlayerControls,
    LoadingState,
    ErrorState
} from './components/MusicPlayer';

// Utils
import { formatTime } from './utils/musicPlayer.utils';

export default function MusicaPage() {
    // Disabilita scroll sulla pagina, gasi! 🚫
    useEffect(() => {
        // Salva stati originali
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyHeight = document.body.style.height;

        // Disabilita scroll in modo aggressivo, bismillah!
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        return () => {
            // Ripristina tutto quando esci, ci sta!
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.height = originalBodyHeight;
        };
    }, []);

    // Fetch songs con custom hook, bismillah
    const { songs, loading, error } = useSongs();

    // State locale per UI
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(false);

    // Custom hooks per audio e video, peso!
    const {
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
    } = useAudioPlayer(songs, currentSongIndex);

    const { videoRef, nextVideoRef } = useVideoPlayer(currentSongIndex);

    // Handler per cambio canzone
    const handleSongChange = (index: number) => {
        setCurrentSongIndex(index);
        setIsPlaying(false);
    };

    // Next song con delay smooth, ci sta
    const nextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    };

    // Previous song
    const prevSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    };

    // Auto next quando finisce la canzone, top!
    const handleAutoNext = () => {
        setIsPlaying(false);
        if (currentSongIndex < songs.length - 1) {
            setTimeout(() => {
                setCurrentSongIndex(currentSongIndex + 1);
                setIsPlaying(true);
            }, 500);
        }
    };

    // Audio callbacks
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleCanPlay = () => {
        if (audioRef.current && !duration) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleDurationChange = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Loading state, aksmillah aspettiamo
    if (loading) {
        return <LoadingState />;
    }

    // Error state, mannaggia
    if (error || songs.length === 0) {
        return <ErrorState message={error} />;
    }

    const currentSong = songs[currentSongIndex];
    const nextSongData = currentSongIndex < songs.length - 1 ? songs[currentSongIndex + 1] : undefined;

    // Safety check, aksmillah - questo non dovrebbe mai succedere ma TypeScript vuole essere sicuro
    if (!currentSong) {
        return <ErrorState message="Canzone non trovata" />;
    }

    return (
        <div
            className={styles.pageContainer}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden'
            }}
        >
            {/* Video background con overlay, gasi! */}
            <VideoBackground
                currentSong={currentSong}
                currentSongIndex={currentSongIndex}
                nextSong={nextSongData}
                videoRef={videoRef}
                nextVideoRef={nextVideoRef}
            />

            {/* Engine audio invisibile ma fondamentale */}
            <AudioEngine
                audioRef={audioRef}
                currentSong={currentSong}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={handleCanPlay}
                onDurationChange={handleDurationChange}
                onEnded={handleAutoNext}
            />

            {/* Tutti i controlli del player, peso! */}
            <PlayerControls
                songs={songs}
                currentSong={currentSong}
                currentSongIndex={currentSongIndex}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                showInfo={showInfo}
                onSongChange={handleSongChange}
                onInfoToggle={() => setShowInfo(!showInfo)}
                onSeek={handleSeek}
                onPrev={prevSong}
                onPlay={togglePlay}
                onNext={nextSong}
                onVolumeChange={handleVolumeChange}
                onToggleMute={toggleMute}
                formatTime={formatTime}
                styles={styles}
            />
        </div>
    );
}