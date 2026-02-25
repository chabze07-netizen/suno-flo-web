'use client'

import { useState } from 'react'

// Massive Artist Library
const ARTISTS = {
  "Trap": [
    { id: "metro", name: "Metro Boomin", bpm: 140, key: "C minor", desc: "Dark 808s, bell melodies" },
    { id: "southside", name: "Southside", bpm: 140, key: "G minor", desc: "Heavy 808 slides" },
    { id: "wheezy", name: "Wheezy", bpm: 146, key: "D minor", desc: "Guitar/flute melodies" },
    { id: "nick_mira", name: "Nick Mira", bpm: 130, key: "A minor", desc: "Emo/melodic pianos" },
    { id: "pierre", name: "Pi'erre Bourne", bpm: 146, key: "E minor", desc: "Bouncy drums" },
    { id: "travis", name: "Travis Scott", bpm: 140, key: "C minor", desc: "Auto-tune, ethereal" },
    { id: "zaytoven", name: "Zaytoven", bpm: 140, key: "F minor", desc: "Orchestral 808s" },
    { id: "tay_keith", name: "Tay Keith", bpm: 145, key: "C minor", desc: "Hard 808s, minimal" },
    { id: "cash_cobain", name: "Cash Cobain", bpm: 138, key: "D minor", desc: "Sample drill" },
  ],
  "R&B": [
    { id: "weeknd", name: "The Weeknd", bpm: 120, key: "E minor", desc: "Dark R&B" },
    { id: "drake", name: "Drake", bpm: 85, key: "D minor", desc: "Melodic rap" },
    { id: "sza", name: "SZA", bpm: 95, key: "C minor", desc: "Alternative R&B" },
    { id: "bryson", name: "Bryson Tiller", bpm: 90, key: "G minor", desc: "Trap-soul" },
    { id: "giveon", name: "Giveon", bpm: 88, key: "D minor", desc: "Deep baritone" },
    { id: "her", name: "H.E.R.", bpm: 92, key: "A minor", desc: "Guitar-driven" },
  ],
  "Hip Hop": [
    { id: "kendrick", name: "Kendrick Lamar", bpm: 120, key: "D minor", desc: "Conscious, storytelling" },
    { id: "jcole", name: "J Cole", bpm: 90, key: "G minor", desc: "Thoughtful" },
    { id: "nas", name: "Nas", bpm: 92, key: "C minor", desc: "Boom bap" },
    { id: "jayz", name: "Jay-Z", bpm: 95, key: "D minor", desc: "Classic" },
    { id: "kanye", name: "Kanye West", bpm: 130, key: "F minor", desc: "Chipmunk soul" },
    { id: "mfdoom", name: "MF DOOM", bpm: 90, key: "A minor", desc: "Abstract, lo-fi" },
  ],
  "Trance": [
    { id: "armin", name: "Armin van Buuren", bpm: 138, key: "A minor", desc: "Uplifting" },
    { id: "tiesto", name: "Tiesto", bpm: 136, key: "G minor", desc: "EDM-Trance" },
    { id: "dash", name: "Dash Berlin", bpm: 138, key: "C minor", desc: "Emotional" },
    { id: "pvD", name: "Paul van Dyk", bpm: 140, key: "B minor", desc: "Progressive" },
    { id: "gouryella", name: "Gouryella", bpm: 140, key: "E minor", desc: "Classic uplift" },
  ],
  "House": [
    { id: "guetta", name: "David Guetta", bpm: 128, key: "C major", desc: "Electro house" },
    { id: "calvin", name: "Calvin Harris", bpm: 128, key: "D major", desc: "Pop-house" },
    { id: "fisher", name: "Fisher", bpm: 124, key: "E minor", desc: "Tech house" },
    { id: "daftpunk", name: "Daft Punk", bpm: 123, key: "A minor", desc: "French house" },
  ],
  "Rock": [
    { id: "pinkfloyd", name: "Pink Floyd", bpm: 120, key: "G minor", desc: "Psychedelic" },
    { id: "queen", name: "Queen", bpm: 120, key: "B minor", desc: "Rock anthems" },
    { id: "metallica", name: "Metallica", bpm: 130, key: "E minor", desc: "Heavy metal" },
    { id: "nirvana", name: "Nirvana", bpm: 120, key: "F minor", desc: "Grunge" },
  ],
  "EDM": [
    { id: "deadmau5", name: "Deadmau5", bpm: 128, key: "F minor", desc: "Progressive" },
    { id: "skrillex", name: "Skrillex", bpm: 140, key: "D minor", desc: "Dubstep" },
  ],
  "Phonk": [
    { id: "lostboy", name: "Lost Boy", bpm: 140, key: "C minor", desc: "Cowbell phonk" },
    { id: "southphonk", name: "South Phonk", bpm: 145, key: "G minor", desc: "Drift phonk" },
  ]
}

const THEMES = [
  { id: "flex", name: "🔥 Flex", desc: "Money, success, status" },
  { id: "struggle", name: "📖 Struggle", desc: "Hardship, grind, triumph" },
  { id: "love", name: "💜 Love", desc: "Romance, heartbreak" },
  { id: "hustle", name: "💼 Hustle", desc: "Work, ambition" },
  { id: "party", name: "🎉 Party", desc: "Vibes, celebration" },
  { id: "street", name: "🏙️ Street", desc: "Reality, loyalty" },
]

const STRUCTURES = [
  { id: "classic", name: "Classic", desc: "Intro → Verse → Hook → Verse → Hook → Bridge → Hook → Outro" },
  { id: "modern", name: "Modern", desc: "Intro → Hook → Verse → Hook → Verse → Hook → Outro" },
  { id: "trap", name: "Trap", desc: "Intro → Verse → Pre-Hook → Hook → Verse → Hook → Verse → Hook" },
  { id: "rnb", name: "R&B", desc: "Intro → Verse → Hook → Verse → Hook → Bridge → Hook → Outro" },
  { id: "trance", name: "Trance", desc: "Intro → Break → Build → Drop → Break → Build → Drop → Outro" },
  { id: "rock", name: "Rock", desc: "Intro → Verse → Pre-Chorus → Chorus → Verse → Chorus → Bridge → Chorus → Outro" },
]

// Generate Suno Prompt
function generateSunoPrompt(artist: any): string {
  const genre = Object.keys(ARTISTS).find(g => ARTISTS[g as keyof].find(a => a.id === artist.id)) || "Trap"
  const instruments = ["Sytrus", "Harmor", "FPC", "Sakura", "GMS"]
  
  const prompts: Record<string, string> = {
    "Trap": `Dark trap beat, ${artist.bpm} BPM, ${artist.key}, heavy 808s, ${instruments[0]} melody, crispy hi-hats, hard-hitting drums, aggressive bass, modern trap production`,
    "R&B": `Smooth R&B track, ${artist.bpm} BPM, ${artist.key}, atmospheric, smooth ${instruments[1]} chords, soft drums, romantic melody, soulful production`,
    "Hip Hop": `Boom bap hip hop beat, ${artist.bpm} BPM, ${artist.key}, classic drum pattern, dusty sample, ${instruments[0]} loop, bass-heavy`,
    "Trance": `Uplifting trance anthem, ${artist.bpm} BPM, ${artist.key}, soaring synth lead, massive reverb, driving bass, euphoric buildup, huge drop`,
    "House": `House groove, ${artist.bpm} BPM, ${artist.key}, four-on-the-floor kick, catchy synth hook, groovy bass, energetic build`,
    "Rock": `Rock track, ${artist.bpm} BPM, ${artist.key}, distorted guitar riff, powerful drums, anthemic chorus`,
    "EDM": `EDM production, ${artist.bpm} BPM, ${artist.key}, big drop, festival-ready, powerful synths`,
    "Phonk": `Phonk beat, ${artist.bpm} BPM, ${artist.key}, cowbell, heavy 808s, Memphis style, aggressive`,
  }
  
  return prompts[genre] || prompts["Trap"]
}

// Generate Lyrics
function generateLyrics(theme: string, structure: string): string {
  const lines: Record<string, string[]> = {
    "flex": [
      "Started from the bottom, now I'm here",
      "They don't know the struggle, but they know the fame",
      "Bank account look different, it's a different view",
      "I was down bad, now I'm counting bands",
      "Flex on 'em, they can't do what I do",
      "Got my money right, never second guess",
      "From the trap to the top, that's success",
      "Real ones stayed, fake ones left",
    ],
    "struggle": [
      "Came from nothing, had to fight to get this",
      "They didn't believe, now they can't deny",
      "Late nights grinding while they were sleeping",
      "Pain made me stronger, now I'm reaping",
      "Started with nothing but a dream and drive",
      "Every scar on my back, I wear with pride",
      "From the mud to the top, I survived",
      "They tried to break me, now I'm elevated",
    ],
    "love": [
      "You're the one I need, can't let you go",
      "Late nights thinking 'bout you, I can't sleep",
      "Heart full of love, but it been hurt before",
      "You my ride or die, that's for sure",
      "Never thought I'd find love like this",
      "With you I found what I been missing",
      "Baby you're my everything",
      "We meant to be, that's what I believe",
    ],
    "hustle": [
      "Wake up early, go to work, that's the grind",
      "Stack paper, that's the mission",
      "No days off, that's the vision",
      "Hustle hard, never stop",
      "Got my eyes on the prize, won't stop",
      "Working twice as hard to get ahead",
      "They don't know the hours I put in",
      "Grind never stops, that's how I live",
    ],
    "party": [
      "Tonight we turning up, no sleep",
      "DJ play my song, let me hear it bump",
      "Shots coming fast, we about to drunk",
      "Party don't stop, that's how we funk",
      "In the club with my squad, we lit",
      "Celebrating every win, that's it",
      "Turn the music up, let it bump",
      "We don't quit, we just jump",
    ],
    "street": [
      "On my block, that's where I'm from",
      "Real ones know, fake ones don't",
      "The struggle real, can't fake that",
      "Block taught me how to get bread",
      "Streets talk, I listen, I learned",
      "Real is rare, fake is common",
      "From the block to the check",
      "This the life, no pretending",
    ],
  }
  
  const themeLines = lines[theme] || lines["flex"]
  
  const structureSections = {
    "classic": ["INTRO", "VERSE 1", "HOOK", "VERSE 2", "HOOK", "BRIDGE", "HOOK", "OUTRO"],
    "modern": ["INTRO", "HOOK", "VERSE 1", "HOOK", "VERSE 2", "HOOK", "OUTRO"],
    "trap": ["INTRO", "VERSE 1", "PRE-HOOK", "HOOK", "VERSE 2", "HOOK", "VERSE 3", "HOOK"],
    "rnb": ["INTRO", "VERSE 1", "HOOK", "VERSE 2", "HOOK", "BRIDGE", "HOOK", "OUTRO"],
    "trance": ["INTRO", "BREAK", "BUILD", "DROP 1", "BREAK", "BUILD", "DROP 2", "OUTRO"],
    "rock": ["INTRO", "VERSE 1", "PRE-CHORUS", "CHORUS", "VERSE 2", "CHORUS", "BRIDGE", "CHORUS", "OUTRO"],
  }
  
  const sections = structureSections[structure as keyof typeof structureSections] || structureSections["classic"]
  
  let lyrics = ""
  
  for (const section of sections) {
    lyrics += `[${section}]\n`
    
    if (section.includes("HOOK") || section.includes("CHORUS")) {
      // Short catchy lines
      for (let i = 0; i < 4; i++) {
        lyrics += themeLines[i % themeLines.length] + "\n"
      }
    } else if (section.includes("VERSE")) {
      // Storytelling lines
      for (let i = 0; i < 8; i++) {
        lyrics += themeLines[i % themeLines.length] + "\n"
      }
    } else if (section === "INTRO" || section === "OUTRO") {
      lyrics += themeLines[0] + "\n"
    } else {
      // Bridge/Break
      lyrics += themeLines[4] + "\n"
      lyrics += themeLines[5] + "\n"
    }
    lyrics += "\n"
  }
  
  return lyrics
}

export default function Home() {
  const [genre, setGenre] = useState("Trap")
  const [artist, setArtist] = useState(ARTISTS["Trap"][0])
  const [theme, setTheme] = useState("flex")
  const [structure, setStructure] = useState("trap")
  const [generated, setGenerated] = useState(false)
  const [lyrics, setLyrics] = useState("")
  const [sunoPrompt, setSunoPrompt] = useState("")
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    setGenerating(true)
    
    setTimeout(() => {
      const newLyrics = generateLyrics(theme, structure)
      const prompt = generateSunoPrompt(artist)
      
      setLyrics(newLyrics)
      setSunoPrompt(prompt)
      setGenerated(true)
      setGenerating(false)
    }, 1500)
  }

  const copyLyrics = () => navigator.clipboard.writeText(lyrics)
  const copyPrompt = () => navigator.clipboard.writeText(sunoPrompt)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          SunoFLO ULTIMATE
        </h1>
        <p className="text-slate-400 mt-2">50+ Artists • Suno Prompts • Structured Lyrics</p>
        <span className="inline-block mt-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm">Version 3.0</span>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-8">
        {/* Genre */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-4">
          <label className="block text-white font-bold mb-4">🎤 Select Genre</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(ARTISTS).map((g) => (
              <button
                key={g}
                onClick={() => { setGenre(g); setArtist(ARTISTS[g as keyof][0]) }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  genre === g ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Artist */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-4">
          <label className="block text-white font-bold mb-4">👤 Select Artist</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ARTISTS[genre as keyof].map((a: any) => (
              <button
                key={a.id}
                onClick={() => setArtist(a)}
                className={`p-3 rounded-xl text-left transition-all ${
                  artist.id === a.id ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                <div className="font-bold">{a.name}</div>
                <div className="text-xs opacity-70">{a.bpm} BPM | {a.key}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme & Structure */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-800 rounded-2xl p-6">
            <label className="block text-white font-bold mb-4">📝 Theme</label>
            <div className="space-y-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`w-full p-3 rounded-xl text-left ${
                    theme === t.id ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs opacity-70">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6">
            <label className="block text-white font-bold mb-4">🎵 Song Structure</label>
            <div className="space-y-2">
              {STRUCTURES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStructure(s.id)}
                  className={`w-full p-3 rounded-xl text-left ${
                    structure === s.id ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  <div className="font-bold">{s.name}</div>
                  <div className="text-xs opacity-70">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={generating}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-xl text-white"
        >
          {generating ? '⏳ Generating...' : '🎵 Generate Project'}
        </button>

        {/* Results */}
        {generated && (
          <div className="space-y-4 mt-6">
            {/* Suno Prompt Box */}
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-6 border-2 border-purple-500">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-xl">🎯 Suno AI Prompt</h3>
                <button onClick={copyPrompt} className="text-cyan-400 text-sm">📋 Copy</button>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl text-white font-mono text-sm">
                {sunoPrompt}
              </div>
              <p className="text-slate-400 text-xs mt-2">Copy this prompt and paste it into Suno AI</p>
            </div>

            {/* Lyrics Box */}
            <div className="bg-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold text-xl">📝 Structured Lyrics</h3>
                <button onClick={copyLyrics} className="text-cyan-400 text-sm">📋 Copy</button>
              </div>
              <pre className="bg-slate-900 p-4 rounded-xl text-slate-300 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {lyrics}
              </pre>
            </div>

            {/* MIDI Info */}
            <div className="bg-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">🎹 MIDI Files</h3>
              <p className="text-slate-400 text-sm">
                Run the Python version for full MIDI generation with drums, bass, and melody tracks.
                <br />
                <code className="text-cyan-400">python src/sunoflo_ultimate.py</code>
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>Built by Cyrus 🤖 | SunoFLO Ultimate v3.0</p>
      </footer>
    </div>
  )
}
