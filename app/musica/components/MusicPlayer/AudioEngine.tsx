// components/MusicPlayer/AudioEngine.tsx
// Componente che gestisce l'elemento audio HTML, top!

import React from 'react';
import { Song } from '@/types/music.types';

interface AudioEngineProps {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    currentSong: Song;
    onTimeUpdate: () => void;
    onLoadedMetadata: () => void;
    onCanPlay: () => void;
    onDurationChange: () => void;
    onEnded: () => void;
}

export function AudioEngine({
                                audioRef,
                                currentSong,
                                onTimeUpdate,
                                onLoadedMetadata,
                                onCanPlay,
                                onDurationChange,
                                onEnded
                            }: AudioEngineProps) {
    return (
        <audio
            ref={audioRef}
            src={currentSong.file}
            preload="metadata"
            onTimeUpdate={onTimeUpdate}
            onLoadedMetadata={onLoadedMetadata}
            onCanPlay={onCanPlay}
            onDurationChange={onDurationChange}
            onEnded={onEnded}
        />
    );
}