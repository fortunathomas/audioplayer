// hooks/useSongs.ts
// Hook per fetchare le canzoni, gasi!

import { useState, useEffect } from 'react';
import { Song } from '@/types/music.types';

export function useSongs() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchSongs() {
            try {
                const res = await fetch('/api/songs');
                const data = await res.json();

                if (data.success && data.songs.length > 0) {
                    setSongs(data.songs);
                } else {
                    setError('Nessuna canzone trovata');
                }
            } catch (err) {
                console.error('Errore caricamento canzoni:', err);
                setError('Errore nel caricamento');
            } finally {
                setLoading(false);
            }
        }

        fetchSongs();
    }, []);

    return { songs, loading, error };
}