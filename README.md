# wave

'wav​e' è un’applicazione web progettata per consentire l’ascolto di musica direttamente dal browser.  
L’interfaccia si presenta moderna e minimale, con tutti i comandi essenziali per la riproduzione dei brani, come play, pausa e gestione della traccia.  
Durante l’ascolto, l’applicazione mostra una versione animata della copertina del brano in riproduzione: questa animazione rende l’esperienza più coinvolgente e crea un’atmosfera dinamica e piacevole.

A personal web music player built with Next.js, featuring playlist management and a clean glassmorphism UI.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **CSS Modules**
- **Web Audio API**
  
## Funzionalità

- Player accessibile direttamente (nessun gate/password)
- Visual animata/loop legata al brano in riproduzione
- Playlist con indicatore di riproduzione
- Informazioni traccia (titolo, artista, produttore, album, durata)
- Barra di avanzamento con seek
- Controllo volume con toggle mute e persistenza in `localStorage`
- Scorciatoie da tastiera: `Space` = play/pausa, `←` / `→` = traccia precedente/successiva
- Avanzamento automatico a fine brano
- Layout responsive

## Struttura del progetto

```text
app/
├── api/
│   └── songs/route.ts           # API: espone le canzoni da data/songs.json
├── components/                  # Componenti UI del player (Playlist, Controls, modali, ecc.)
├── player/
│   ├── hooks/                   # Logica player (audio/video)
│   └── styles/                  # CSS Modules del player
├── types.ts                     # Tipi condivisi (Song)
├── globals.css
├── layout.tsx
└── page.tsx                     # Entry/landing

data/
└── songs.json                   # Catalogo canzoni

scripts/
└── seedSongs.ts                 # Script di generazione del catalogo songs.json
```

## Note

- L’endpoint `app/api/songs/route.ts` costruisce gli URL finali dei file multimediali a partire dai percorsi presenti in `data/songs.json`.
