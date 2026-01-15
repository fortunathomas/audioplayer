// components/MusicPlayer/VideoBackground.tsx
// Componente per il video background, peso!

import React from 'react';
import { Song } from '@/types/music.types';
import styles from '../../style/MusicPlayer.module.css';

interface VideoBackgroundProps {
    currentSong: Song;
    currentSongIndex: number;
    nextSong?: Song;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    nextVideoRef: React.RefObject<HTMLVideoElement | null>;
}

export function VideoBackground({
                                    currentSong,
                                    currentSongIndex,
                                    nextSong,
                                    videoRef,
                                    nextVideoRef
                                }: VideoBackgroundProps) {
    // Ensure we always have a string for src, gasi!
    const videoSrc = currentSong?.visualVideo || '/canvas/swagtakes.mp4';
    const nextVideoSrc = nextSong?.visualVideo || '';

    return (
        <>
            {/* Video principale, gasi */}
            <video
                ref={videoRef}
                className={styles.videoBackground}
                src={videoSrc}
                autoPlay
                muted
                playsInline
                preload="auto"
                key={currentSongIndex}
            />

            {/* Preload del prossimo video (hidden), ci sta per le transizioni smooth */}
            {nextSong && nextVideoSrc && (
                <video
                    ref={nextVideoRef}
                    style={{ display: 'none' }}
                    src={nextVideoSrc}
                    preload="auto"
                    muted
                />
            )}

            {/* Overlay scuro per leggere meglio il testo */}
            <div className={styles.overlay}></div>
        </>
    );
}