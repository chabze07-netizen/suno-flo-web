'use client'

import { useState } from 'react'

const GENRES = [
  "Trap", "Drill", "R&B", "Pop", "House", "Hip Hop", 
  "Trance", "Techno", "Dubstep", "DnB", "Ambient", "Rock",
  "Progressive House", "EDM", "Lo-Fi", "Synthwave"
]

const STYLES = [
  // TRAP
  { id: "metro", name: "Metro Boomin", bpm: 140, key: "C minor", genre: "Trap", desc: "Dark 808s, bell melodies" },
  { id: "southside", name: "Southside", bpm: 140, key: "G minor", genre: "Trap", desc: "Heavy 808 slides" },
  { id: "nick_mira", name: "Nick Mira", bpm: 130, key: "A minor", genre: "Trap", desc: "Emo/melodic" },
  { id: "travis", name: "Travis Scott", bpm: 140, key: "C minor", genre: "Trap", desc: "Auto-tune, ethereal" },
  
  // R&B
  { id: "weeknd", name: "The Weeknd", bpm: 120, key: "E minor", genre: "R&B", desc: "Dark R&B, atmospheric" },
  { id: "drake", name: "Drake", bpm: 85, key: "D minor", genre: "R&B", desc: "Melodic rap" },
  
  // TRANCE
  { id: "armin", name: "Armin van Buuren", bpm: 138, key: "A minor", genre: "Trance", desc: "Uplifting, big drops" },
  { id: "tiesto", name: "Tiesto", bpm: 136, key: "G minor", genre: "Trance", desc: "EDM-Trance hybrid" },
  
  // ROCK
  { id: "pink_floyd", name: "Pink Floyd", bpm: 120, key: "G minor", genre: "Rock", desc: "Psychedelic" },
  { id: "queen", name: "Queen", bpm: 120, key: "B minor", genre: "Rock", desc: "Rock anthems" },
  
  // HIP HOP
  { id: "kendrick", name: "Kendrick Lamar", bpm: 120, key: "D minor", genre: "Hip Hop", desc: "Conscious, storytelling" },
  { id: "jcole", name: "J Cole", bpm: 90, key: "G minor", genre: "Hip Hop", desc: "Thoughtful, introspective" },
]

const LYRIC_TOPICS = [
  { id: "auto", name: "🎲 Auto", desc: "Random topic" },
  { id: "money", name: "💰 Money/Bags", desc: "About the grind and getting money" },
  { id: "flex", name: "🔥 Flex/Status", desc: "Showing off success" },
  { id: "love", name: "💜 Love", desc: "Romance and relationships" },
  { id: "struggle", name: "📖 Struggle", desc: "Storytelling, overcoming obstacles" },
]

export default function Home() {
  const [tab, setTab] = useState<'music' | 'lyrics'>('music')
  const [genre, setGenre] = useState("Trap")
  const [style, setStyle] = useState(STYLES[0])
  
  // Lyric settings
  const [generateLyrics, setGenerateLyrics] = useState(false)
  const [lyricTopic, setLyricTopic] = useState("auto")
  const [advancedLyrics, setAdvancedLyrics] = useState(false)
  const [lyrics, setLyrics] = useState("")
  const [generated, setGenerated] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    setGenerating(true)
    
    // Simulate generation (in production, this would call the Python backend)
    setTimeout(() => {
      let lyricContent = ""
      
      if (generateLyrics) {
        if (advancedLyrics) {
          lyricContent = ADVANCED_LYRICS[genre] || ADVANCED_LYRICS["Trap"]
        } else {
          lyricContent = BASIC_LYRICS[genre] || BASIC_LYRICS["Trap"]
        }
      }
      
      setLyrics(lyricContent)
      setGenerated(true)
      setGenerating(false)
    }, 2500)
  }

  const copyLyrics = () => {
    navigator.clipboard.writeText(lyrics)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          SunoFLO 2.0
        </h1>
        <p className="text-slate-400 mt-2">AI FL Studio + Lyric Generator</p>
        <div className="flex justify-center gap-2 mt-3">
          <span className="px-3 py-1 bg-purple-600/30 text-purple-400 rounded-full text-sm">Phase 2.0</span>
          <span className="px-3 py-1 bg-pink-600/30 text-pink-400 rounded-full text-sm">+Lyrics</span>
        </div>
      </header>

      {/* Tab Selection */}
      <div className="max-w-3xl mx-auto px-4 mb-4">
        <div className="flex bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setTab('music')}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${
              tab === 'music' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            🎵 Music Project
          </button>
          <button
            onClick={() => setTab('lyrics')}
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${
              tab === 'lyrics' ? 'bg-pink-600 text-white' : 'text-slate-400'
            }`}
          >
            📝 Lyrics Only
          </button>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 pb-8">
        {tab === 'music' && (
          <>
            {/* Genre & Style */}
            <div className="bg-slate-800 rounded-2xl p-6 mb-4">
              <label className="block text-slate-300 mb-3 font-medium">Genre</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setGenre(g)
                      const firstStyle = STYLES.find(s => s.genre === g)
                      if (firstStyle) setStyle(firstStyle)
                    }}
                    className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
                      genre === g ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <label className="block text-slate-300 mb-3 font-medium">Producer Style</label>
              <select
                value={style.id}
                onChange={(e) => setStyle(STYLES.find(s => s.id === e.target.value) || STYLES[0])}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
              >
                {STYLES.filter(s => s.genre === genre || !STYLES.some(x => x.genre === genre)).map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.bpm} BPM)</option>
                ))}
              </select>

              <div className="mt-4 flex justify-between items-center bg-slate-900 rounded-xl p-3">
                <div><span className="text-slate-400">BPM:</span> <span className="text-white font-bold">{style.bpm}</span></div>
                <div><span className="text-slate-400">Key:</span> <span className="text-white font-bold">{style.key}</span></div>
              </div>
            </div>

            {/* Lyrics Option */}
            <div className="bg-slate-800 rounded-2xl p-6 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={generateLyrics}
                  onChange={(e) => setGenerateLyrics(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-white font-bold">📝 Also Generate Lyrics</span>
              </label>

              {generateLyrics && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-2 text-sm">Topic</label>
                    <div className="flex flex-wrap gap-2">
                      {LYRIC_TOPICS.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setLyricTopic(t.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm ${
                            lyricTopic === t.id ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={advancedLyrics}
                      onChange={(e) => setAdvancedLyrics(e.target.checked)}
                      className="w-5 h-5"
                    />
                    <div>
                      <span className="text-white font-bold">Advanced Lyrics</span>
                      <p className="text-slate-400 text-xs">Better rhymes, no cliches, more flow</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'lyrics' && (
          <div className="bg-slate-800 rounded-2xl p-6 mb-6">
            <div className="mb-4">
              <label className="block text-slate-300 mb-3 font-medium">Genre</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {GENRES.slice(0, 8).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={`px-3 py-1.5 rounded-lg font-medium text-sm ${
                      genre === g ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-slate-300 mb-3 font-medium">Topic</label>
              <div className="flex flex-wrap gap-2">
                {LYRIC_TOPICS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setLyricTopic(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      lyricTopic === t.id ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl">
              <input
                type="checkbox"
                checked={advancedLyrics}
                onChange={(e) => setAdvancedLyrics(e.target.checked)}
                className="w-5 h-5"
              />
              <div>
                <span className="text-white font-bold">Advanced Mode</span>
                <p className="text-slate-400 text-xs">✓ Better rhyme schemes ✓ No cliche AI words ✓ Smooth flow</p>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={generating}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-bold text-xl text-white shadow-lg hover:scale-105 transition-all disabled:opacity-50"
        >
          {generating ? '⏳ Generating...' : '🎵 Generate Project + Lyrics'}
        </button>

        {/* Results */}
        {generated && (
          <div className="mt-8 bg-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">✅ Generated!</h3>
            
            {lyrics && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-pink-400 font-bold">📝 Lyrics</h4>
                  <button onClick={copyLyrics} className="text-cyan-400 text-sm">📋 Copy</button>
                </div>
                <pre className="bg-slate-900 p-4 rounded-xl text-slate-300 text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {lyrics}
                </pre>
                {advancedLyrics && (
                  <p className="text-green-400 text-xs mt-2">✓ Advanced mode - better rhymes, no cliches</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl">
                <div className="text-2xl mb-1">📁</div>
                <div className="text-white font-medium">sunoflo_{style.id}.flp</div>
                <div className="text-slate-500 text-sm">FL Studio Project</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl">
                <div className="text-2xl mb-1">🎹</div>
                <div className="text-white font-medium">MIDI Stems</div>
                <div className="text-slate-500 text-sm">Drums, Bass, Melody</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>Built by Cyrus 🤖 | SunoFLO 2.0</p>
      </footer>
    </div>
  )
}

// Sample lyrics data (in production, this comes from the Python backend)
const BASIC_LYRICS: Record<string, string> = {
  "Trap": `[HOOK]
I been stackin' cash, got my racks up
They don't really know how I live
I came from the bottom, now I'm on top
Taking over, this is my year

[VERSE 1]
Started with nothing, now look at me
Grinding every day, can't you see
Stacked my paper, now I'm secure
This the life that I been working for

[VERSE 2]
They didn't believe when I told them dreams
Now I'm living proof, nothing's what it seems
Keep that momentum, never slow down
This is only the beginning, I'ma blow town`,

  "R&B": `[HOOK]
Baby, you're the one that I need
In my heart, you're everything
I can't imagine life without you here
You're my sunshine, dissipate my fear

[VERSE 1]
Late nights when you're not here
I toss and turn, it's crystal clear
That you're the one that holds me down
Without you girl, I'm lost, I'm found`,

  "Hip Hop": `[HOOK]
Yeah, yeah, yeah
This for the real ones who made it through
Every struggle, every pain we knew
Now we shining, look at what we became
It was a dream, now it's our game

[VERSE 1]
Started in the gutter, now we're on the rise
Looked me in my eyes, told me never compromise
Every dollar that I made, I earned it fair
Nothing given, everything I share`,
}

const ADVANCED_LYRICS: Record<string, string> = {
  "Trap": `[HOOK]
I been stackin' guap, got my racks in the safe
They don't really know the pain behind this flex
Came from the mud, now I'm looking down from the sky
This that real talk, no fake flex

[VERSE 1]
Remember when I had to choose between eating or the dream
Now my bank account saying things my mama never seen
They laughed when I told them I was going to make it out
Now they hitting my line like they knew me back in the day, that's how it go

[PRE-HOOK]
Yeah, yeah, yeah
That's on my blood, that's on my mama
Every scar on my back got a story
Now I'm showing them who the problem is

[HOOK]
I been stackin' guap, got my racks in the safe
They don't really know the pain behind this flex

[VERSE 2]
Used to walk to the store with empty pockets, no change
Now I'm flying private, got a different kind of range
They don't understand the grind, the late nights and the pain
But I turned my scars into a crown, now I reign, yeah`,

  "R&B": `[HOOK]
You're the rhythm in my heartbeat, the air that I breathe
In a world so cold, you're the warmth I need
Can't imagine waking up without you here
Girl, you make my darkest days just disappear

[VERSE 1]
Every moment that I spend with you is golden
You're the melody my soul has always known
They said I'd never find love, said I'd be alone
But you walked in and made my broken heart a home

[PRE-HOOK]
And I thank God every day for sending you my way
You took my breath, you remain
I promise to cherish you through every storm
In your arms is where I belong

[VERSE 2]
Late nights talking 'til the sunrise
Your voice my favorite sound
We ain't perfect but we real
That's what matters, this is how we found
A love that don't break, only grow
Through the highs and the lows
Hand in hand, we taking over
You're my lover and my soul`,

  "Hip Hop": `[HOOK]
This for the ones who made it through the struggle
Every scar, every tear, we got the muscle
Look at me now, yeah we made it out
This the real talk, no fake, no doubt

[VERSE 1]
Mama working double shifts so I could have the best
Sleep was a stranger, dreams were put to test
They didn't see the vision when I told them my plans
Now I'm the one they call when they need a hand
This that blood, this that sweat, this that grind
Every dollar that I got, I earned it overtime
Now they want to talk like they knew me back then
But I'm for real, I ain't changing, this my friend

[PRE-HOOK]
Yeah, we made it (made it)
From the bottom to the top (to the top)
All that pain we turned to power
Now we standing on the block (on the block)

[HOOK]
This for the ones who made it through the struggle`,

  "Rock": `[HOOK]
We are the voice inside the silence
The fire that burns within
They tried to break us, we came back stronger
This is where we begin

[VERSE 1]
Used to pray for the weekend, now we pray for more time
Every wall that they built, we climbed it, left 'em behind
Screamed into the void, thought nobody heard
But the echo came back louder, yeah we got the word

[PRE-HOOK]
And we rise (we rise)
Through the dark into the light
Every tear becomes our crown
We are the voice of the night

[HOOK]
We are the voice inside the silence`,
}
