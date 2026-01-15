// utils/musicPlayer.utils.ts
// Funzioni utility per il music player, gasi!

/**
 * Formatta i secondi in formato MM:SS
 * Ci sta per mostrare il tempo in modo leggibile
 */
export function formatTime(time: number): string {
    if (!time || isNaN(time)) return '0:00';

    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);

    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Valida se un indice di canzone è valido
 */
export function isValidSongIndex(index: number, songsLength: number): boolean {
    return index >= 0 && index < songsLength;
}