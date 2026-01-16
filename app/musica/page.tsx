"use client"
// Music player page

import React, { useState, useEffect } from "react";
import styles from './style/MusicPlayer.module.css';

// Custom hooks
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import { useSongs } from './hooks/useSongs';

// Modular components
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
    // Disable page scroll
    useEffect(() => {
        // Save original states
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyHeight = document.body.style.height;

        // Disable scroll aggressively
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        return () => {
            // Restore everything on unmount
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.height = originalBodyHeight;
        };
    }, []);

    // Fetch songs with custom hook
    const { songs, loading, error } = useSongs();

    // Local UI state
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(false);

    // Custom hooks for audio and video
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

    // Song change handler
    const handleSongChange = (index: number) => {
        setCurrentSongIndex(index);
        setIsPlaying(false);
    };

    // Next song with smooth delay
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

    // Auto next when song ends
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

    // Loading state
    if (loading) {
        return <LoadingState />;
    }

    // Error state
    if (error || songs.length === 0) {
        return <ErrorState message={error} />;
    }

    const currentSong = songs[currentSongIndex];
    const nextSongData = currentSongIndex < songs.length - 1 ? songs[currentSongIndex + 1] : undefined;

    // Safety check - shouldn't happen but TypeScript wants to be sure
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
            {/* Video background with overlay */}
            <VideoBackground
                currentSong={currentSong}
                currentSongIndex={currentSongIndex}
                nextSong={nextSongData}
                videoRef={videoRef}
                nextVideoRef={nextVideoRef}
            />

            {/* Invisible but essential audio engine */}
            <AudioEngine
                audioRef={audioRef}
                currentSong={currentSong}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlay={handleCanPlay}
                onDurationChange={handleDurationChange}
                onEnded={handleAutoNext}
            />

            {/* All player controls */}
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