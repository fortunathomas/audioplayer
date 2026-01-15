// components/MusicPlayer/ErrorState.tsx
// Componente per gli errori, aksmillah!

import React from 'react';
import styles from '../../style/MusicPlayer.module.css';

interface ErrorStateProps {
    message?: string;
}

export function ErrorState({ message = 'Nessuna canzone disponibile' }: ErrorStateProps) {
    return (
        <div className={styles.errorContainer}>
            <p>{message}</p>
        </div>
    );
}