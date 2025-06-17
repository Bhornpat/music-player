//Component หลักของแอป → เราจะวาง Music UI ที่นี่
import { useRef, useState, useEffect } from "react";
import { CirclePause, CirclePlay, FastForward, Rewind } from "lucide-react";




const musicList = [
  { title: "Shinsoku", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/shinsoku.mp3", image: "https://tenor.com/view/its-peak-peak-fiction-one-piece-stare-picking-nose-gif-3490562815497862179.gif"
},
  { title: "CHU♡CHU ENERGY", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/chuchu.mp3", image: "https://tenor.com/view/bite-gif-3441220050600218139.gif" },
  { title: "LOST IN YOUR EYES", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/lostinyou.mp3", image: "https://tenor.com/view/かみ太-gif-16896406073442410709.gif"},
  { title: "My Kinda Girl", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/mykindagirl.mp3", image: "https://tenor.com/view/alya-gif-1975438848619752595.gif" },
  { title: "Only You", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/onlyyou.mp3", image: "https://tenor.com/view/hush-anime-gif-3376046415569996238.gif"},
  { title: "Pull Up", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/pullup.mp3", image: "https://tenor.com/view/anos-voldigoad-maou-gakuin-no-futekigousha-anime-one-eye-closed-eyes-gif-2170303314035264186.gif" },
  { title: "SWEET LIKE YOU", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/sweetlikeyou.mp3", image: "https://tenor.com/view/love-live-anime-sunshine-reviewing-watching-gif-9788056477457210869.gif" },
  { title: "Sugar Bomb!", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/sugerbomb.mp3", image: "https://tenor.com/view/maybe-gif-16539368050246956618.gif" },
  { title: "Pastel Heart", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/pastel.mp3", image: "https://tenor.com/view/wink-anime-anime-wink-peace-peace-sign-gif-4591493253734534270.gif" },
  { title: "Happy☆Time", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/happytime.mp3", image: "https://tenor.com/view/anime-money-gif-2779446348632709038.gif" },
  { title: "Falling Into Blue", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/falling.mp3", image: "https://tenor.com/view/lain-lain-iwakura-serial-experiments-lain-wires-wired-gif-1481475804337586659.gif" },
{ title: "In a Dream", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/InaDream.mp3", image: "https://tenor.com/view/blue-box-ao-no-hako-kano-chinatsu-chinatsu-kano-gif-14451281429002143138.gif" },
{ title: "キラキラ", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/kirakira.mp3", image: "https://tenor.com/view/lucky-star-akira-wink-gif-16203206221511373475.gif" },
{ title: "Time to go", artist: "K1n3ticNerdcore", url: "https://pub-57edb53024d4416c985d1a7ee882117a.r2.dev/Timetogo.mp3", image: "https://tenor.com/view/sad-anime-guy-lonely-anime-guy-winds-blow-by-anime-guy-sad-gif-13424156687993837135.gif" }
]

function App() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const current = musicList[index];


   // Preload next song and image
  useEffect(() => {
    const next = musicList[(index + 1) % musicList.length];
    const preloadAudio = new Audio();
    preloadAudio.src = next.url;
    preloadAudio.preload = "auto";
    const preloadImg = new Image();
    preloadImg.src = next.image;
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = current.url;
    audio.load();

    audio.oncanplaythrough = () => {
      if (isPlaying) {
        audio.play().catch(err => console.warn("Auto-play failed:", err));
      }
    };
//บางครั้ง .play() เร็วเกินไป → ยังโหลดไม่พอ → error แต่ถ้าใช้ oncanplaythrough, เราจะ "รอจนแน่ใจว่าเล่นได้ยาว ๆ" แล้วค่อย play()
    return () => {
      audio.oncanplaythrough = null;
    };
  }, [index, isPlaying, current.url]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [index]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const next = () => {
    setIndex((index + 1) % musicList.length);
    setCurrentTime(0);
  };
  const prev = () => {
    setIndex((index - 1 + musicList.length) % musicList.length);
    setCurrentTime(0);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 text-white px-4"
    >
      <h1 className="mb-9 text-4xl text-white font-bold font-uwu drop-shadow-[0_0_3px_#ffcbf2]">UWU Player</h1>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 w-full max-w-md shadow-2xl">
        {/* Title & Artist */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold">{current.title}</h2>
          <p className="text-sm text-indigo-200">{current.artist}</p>
        </div>

        {/* Anime GIF */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:top-[23px] sm:right-0 transform sm:-translate-x-1/2 flex justify-center">
          <img
            src={current.image}
            alt="gif"
            className="w-24 h-20 sm:w-20 sm:h-16 rounded-md object-cover shadow-md"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button onClick={prev}>
            <Rewind className="w-5 h-6 hover:scale-110 transition" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gradient-to-br from-pink-500 via-pink-400 to-purple-600 
  shadow-xl hover:shadow-2xl hover:scale-104 transition w-16 h-16 rounded-full flex items-center justify-center"
          > 
            {isPlaying ? (
              <CirclePause className="w-6 h-6" />
            ) : (
              <CirclePlay className="w-6 h-6" />
            )}
          </button>

          <button onClick={next}>
            <FastForward className="w-5 h-6 hover:scale-110 transition" />
          </button>
        </div>

        {/* Audio Element */}
        <audio ref={audioRef} src={current.url} preload="auto" onEnded={next} />

        {/* Progress Bar */}
        <div className="mt-3">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              audioRef.current.currentTime = time;
              setCurrentTime(time);
            }}
            className="w-full h-2 accent-pink-500 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs font-mono mt-1 text-white">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;