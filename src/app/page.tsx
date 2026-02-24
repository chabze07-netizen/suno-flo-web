'use client'

import { useState } from 'react'

const GENRES = [
  "Trap", "Drill", "R&B", "Pop", "House", "Hip Hop", 
  "Trance", "Techno", "Dubstep", "DnB", "Ambient", "Rock",
  "Progressive House", "EDM", "Lo-Fi", "Synthwave"
]

const STYLES = [
  // TRAP & HIP HOP
  { id: "metro", name: "Metro Boomin", bpm: 140, key: "C minor", genre: "Trap", desc: "Dark 808s, bell melodies, half-time" },
  { id: "southside", name: "Southside", bpm: 140, key: "G minor", genre: "Trap", desc: "Heavy 808 slides, crispy hi-hats" },
  { id: "wheezy", name: "Wheezy", bpm: 146, key: "D minor", genre: "Trap", desc: "Guitar/flute melodies, spacey" },
  { id: "nick_mira", name: "Nick Mira", bpm: 130, key: "A minor", genre: "Trap", desc: "Emo/melodic, layered pianos" },
  { id: "travis", name: "Travis Scott", bpm: 140, key: "C minor", genre: "Trap", desc: "Auto-tune, ethereal, heavy reverb" },
  
  // TRANCE
  { id: "armin", name: "Armin van Buuren", bpm: 138, key: "A minor", genre: "Trance", desc: "Uplifting, big drops, soaring synths" },
  { id: "tiesto", name: "Tiesto", bpm: 136, key: "G minor", genre: "Trance", desc: "EDM-Trance hybrid, big room" },
  { id: "pvD", name: "Paul van Dyk", bpm: 140, key: "B minor", genre: "Trance", desc: "Progressive, euphoric" },
  { id: "dash", name: "Dash Berlin", bpm: 138, key: "C minor", genre: "Trance", desc: "Emotional, melodic, big chords" },
  { id: "gouryella", name: "Gouryella", bpm: 140, key: "E minor", genre: "Trance", desc: "Classic uplift, massive reverb" },
  
  // HOUSE & EDM
  { id: "david_guetta", name: "David Guetta", bpm: 128, key: "C major", genre: "House", desc: "Electro house, big drops" },
  { id: "calvin_harris", name: "Calvin Harris", bpm: 128, key: "D major", genre: "House", desc: "Pop-house, catchy vocals" },
  { id: "fisher", name: "Fisher", bpm: 124, key: "E minor", genre: "House", desc: "Tech house, bass-heavy" },
  { id: "daft_punk", name: "Daft Punk", bpm: 123, key: "A minor", genre: "House", desc: "French house, funky" },
  { id: "deadmau5", name: "Deadmau5", bpm: 128, key: "F minor", genre: "Electronic", desc: "Progressive, glitchy" },
  
  // ROCK
  { id: "pink_floyd", name: "Pink Floyd", bpm: 120, key: "G minor", genre: "Rock", desc: "Psychedelic, space rock, epic solos" },
  { id: "queen", name: "Queen", bpm: 120, key: "B minor", genre: "Rock", desc: "Rock anthems, operatic" },
  { id: "metallica", name: "Metallica", bpm: 130, key: "E minor", genre: "Rock", desc: "Heavy metal, thrash" },
  
  // AMBIENT & LO-FI
  { id: "boards", name: "Boards of Canada", bpm: 90, key: "C minor", genre: "Ambient", desc: "Ambient, retro synths" },
  { id: "tycho", name: "Tycho", bpm: 100, key: "D major", genre: "Ambient", desc: "Chillwave, atmospheric" },
  { id: "mf_doom", name: "MF DOOM", bpm: 90, key: "A minor", genre: "Lo-Fi", desc: "Lo-fi hip hop, abstract beats" },
  
  // SYNTHWAVE
  { id: "gunship", name: "Gunship", bpm: 110, key: "E minor", genre: "Synthwave", desc: "Dark synthwave, retro" },
  { id: "timecop", name: "Timecop1983", bpm: 105, key: "A minor", genre: "Synthwave", desc: "Retro synth, dreamy" },
]

const STEM_TYPES = [
  { id: "drums", name: "🥁 Drums", desc: "Kick, snare, hi-hats, percussion" },
  { id: "bass", name: "🎸 Bass", desc: "808s, sub bass, synth bass" },
  { id: "melody", name: "🎹 Melody", desc: "Lead synths, chords, arps" },
  { id: "synths", name: "🎛️ Synths/Pad", desc: "Atmospheric pads, textures" },
  { id: "fx", name: "✨ FX", desc: "Risers, impacts, transitions" },
]

export default function Home() {
  const [genre, setGenre] = useState("Trap")
  const [style, setStyle] = useState(STYLES[0])
  const [prompt, setPrompt] = useState("")
  const [generating, setGenerating] = useState(false)
  const [stems, setStems] = useState<string[]>([])
  const [midiFiles, setMidiFiles] = useState<string[]>([])
  const [generated, setGenerated] = useState(false)

  const filteredStyles = STYLES.filter(s => 
    genre === "All" || s.genre === genre || STYLES.filter(x => x.genre === genre).length === 0
  )

  const generate = () => {
    setGenerating(true)
    setStems([])
    setMidiFiles([])
    setGenerated(false)
    
    // Simulate generation (in real version, this calls the Python backend)
    setTimeout(() => {
      setStems(["Drums", "Bass", "Melody", "Synths", "FX"])
      setMidiFiles(["drums.mid", "bass.mid", "melody.mid", "synths.mid"])
      setGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          SunoFLO
        </h1>
        <p className="text-slate-400 mt-2">AI-Powered FL Studio Project Generator</p>
        <div className="flex justify-center gap-2 mt-3">
          <span className="px-3 py-1 bg-purple-600/30 text-purple-400 rounded-full text-sm">Phase 1.5</span>
          <span className="px-3 py-1 bg-cyan-600/30 text-cyan-400 rounded-full text-sm">+Stems</span>
          <span className="px-3 py-1 bg-green-600/30 text-green-400 rounded-full text-sm">+MIDI</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-8">
        {/* Prompt */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <label className="block text-slate-300 mb-2 font-medium">Describe your track</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Dark trance with uplifting synths, driving bass, euphoric chords..."
            className="w-full h-24 p-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 resize-none"
          />
        </div>

        {/* Genre */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-4">
          <label className="block text-slate-300 mb-3 font-medium">Genre</label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGenre(g)
                  const firstStyle = STYLES.find(s => s.genre === g)
                  if (firstStyle) setStyle(firstStyle)
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all text-sm ${
                  genre === g
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-4">
          <label className="block text-slate-300 mb-3 font-medium">Producer Style / Artist</label>
          <select
            value={style.id}
            onChange={(e) => setStyle(STYLES.find(s => s.id === e.target.value) || STYLES[0])}
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
          >
            {STYLES.filter(s => s.genre === genre || GENRES.indexOf(genre) < 0).map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.bpm} BPM)</option>
            ))}
          </select>
          
          {/* Style Info */}
          <div className="mt-4 flex justify-between items-center bg-slate-900 rounded-xl p-4">
            <div>
              <span className="text-slate-400">Key:</span>
              <span className="text-white font-bold ml-2">{style.key}</span>
            </div>
            <div>
              <span className="text-slate-400">BPM:</span>
              <span className="text-white font-bold ml-2">{style.bpm}</span>
            </div>
            <div className="text-right">
              <span className="text-cyan-400 text-sm">{style.desc}</span>
            </div>
          </div>
        </div>

        {/* Stems Selection */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-6">
          <label className="block text-slate-300 mb-3 font-medium">Output Stems</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {STEM_TYPES.map((stem) => (
              <div key={stem.id} className="bg-slate-900 rounded-xl p-4">
                <div className="text-white font-medium">{stem.name}</div>
                <div className="text-slate-500 text-xs">{stem.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate */}
        <button
          onClick={generate}
          disabled={generating}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-xl text-white shadow-lg hover:scale-105 transition-all disabled:opacity-50"
        >
          {generating ? '⏳ Generating Stems & MIDI...' : '🎵 Generate Project'}
        </button>

        {/* Results */}
        {generated && (
          <div className="mt-8 bg-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">✅ Generated Files</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-3">
                <span className="text-2xl">📁</span>
                <div>
                  <div className="text-white font-medium">sunoflo_{style.id}.flp</div>
                  <div className="text-slate-500 text-sm">FL Studio Project</div>
                </div>
              </div>
              
              {stems.map((stem, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-900 rounded-lg p-3">
                  <span className="text-2xl">🎹</span>
                  <div>
                    <div className="text-white font-medium">sunoflo_{style.id}_{stem.toLowerCase()}.mid</div>
                    <div className="text-slate-500 text-sm">{stem} MIDI Track</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-xl">
              <p className="text-green-400 text-sm">
                💡 Import MIDI files into FL Studio → Assign native plugins (Sytrus, Harmor, FPC) → Mix!
              </p>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-slate-800/30 rounded-xl p-4 border border-slate-700">
          <h3 className="text-white font-bold mb-2">📋 Features</h3>
          <ul className="text-slate-400 text-sm space-y-1">
            <li>• <span className="text-cyan-400">16 Genres</span> including Trance, Techno, Rock, Synthwave</li>
            <li>• <span className="text-cyan-400">22 Artist Styles</span> from Armin to Pink Floyd</li>
            <li>• <span className="text-cyan-400">5 Stem Tracks</span> Drums, Bass, Melody, Synths, FX</li>
            <li>• <span className="text-cyan-400">MIDI Export</span> for each stem</li>
            <li>• <span className="text-cyan-400">FLP Project</span> ready for FL Studio 21+</li>
          </ul>
        </div>
      </main>

      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>Built by Cyrus 🤖 | SunoFLO Phase 1.5</p>
      </footer>
    </div>
  )
}
