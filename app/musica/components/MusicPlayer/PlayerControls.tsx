// components/MusicPlayer/PlayerControls.tsx
// Tutti i controlli del player in un unico componente, gasi!

import React from 'react';
import { Song } from '@/types/music.types';
import {
    Playlist,
    SongInfo,
    InfoModal,
    ProgressBar,
    Controls,
    VolumeControl
} from '../UIComponents';

interface PlayerControlsProps {
    // Song data
    songs: Song[];
    currentSong: Song;
    currentSongIndex: number;

    // Player state
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    showInfo: boolean;

    // Handlers
    onSongChange: (index: number) => void;
    onInfoToggle: () => void;
    onSeek: (value: number) => void;
    onPrev: () => void;
    onPlay: () => void;
    onNext: () => void;
    onVolumeChange: (value: number) => void;
    onToggleMute: () => void;

    // Utils
    formatTime: (time: number) => string;
    styles: any;
}

export function PlayerControls({
                                   songs,
                                   currentSong,
                                   currentSongIndex,
                                   isPlaying,
                                   currentTime,
                                   duration,
                                   volume,
                                   showInfo,
                                   onSongChange,
                                   onInfoToggle,
                                   onSeek,
                                   onPrev,
                                   onPlay,
                                   onNext,
                                   onVolumeChange,
                                   onToggleMute,
                                   formatTime,
                                   styles
                               }: PlayerControlsProps) {
    // Wrapper functions per convertire eventi in valori, ci sta!
    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSeek(Number(e.target.value));
    };

    const handleVolumeChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        onVolumeChange(Number(e.target.value));
    };

    return (
        <div className={styles.playerContainer}>
            {/* Playlist laterale, peso */}
            <Playlist
                songs={songs}
                currentSongIndex={currentSongIndex}
                isPlaying={isPlaying}
                onSongChange={onSongChange}
                styles={styles}
            />

            {/* Info canzone corrente, ci sta */}
            <SongInfo
                song={currentSong}
                onInfoClick={onInfoToggle}
                styles={styles}
            />

            {/* Modal con info dettagliate, top */}
            {showInfo && (
                <InfoModal
                    song={currentSong}
                    onClose={onInfoToggle}
                    styles={styles}
                />
            )}

            {/* Barra di progresso, gasi */}
            <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeekChange}
                formatTime={formatTime}
                styles={styles}
            />

            {/* Controlli play/pause/next/prev */}
            <Controls
                isPlaying={isPlaying}
                canGoPrev={currentSongIndex > 0}
                canGoNext={currentSongIndex < songs.length - 1}
                onPrev={onPrev}
                onPlay={onPlay}
                onNext={onNext}
                disabled={!duration}
                styles={styles}
            />

            {/* Controllo volume, bismillah */}
            <VolumeControl
                volume={volume}
                onVolumeChange={handleVolumeChangeEvent}
                onToggleMute={onToggleMute}
                styles={styles}
            />
        </div>
    );
}