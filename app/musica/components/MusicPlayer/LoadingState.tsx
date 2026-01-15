// components/MusicPlayer/LoadingState.tsx
// Componente per lo stato di loading, ci sta!

import React from 'react';
import styles from '../../style/MusicPlayer.module.css';

export function LoadingState() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading...</p>
        </div>
    );
}