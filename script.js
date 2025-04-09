const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const titleImg = document.getElementById("titlee");

const songs = [
  {
    name: "The Kid Laroi - NIGHTS LIKE THIS.mp3",
    title: "The Kid Laroi - NIGHTS LIKE THIS",
    image: "img/maxresdefault.jpg",
  },
  {
    name: "Alan Walker - Sing Me to Sleep.mp3",
    title: "Alan Walker - Sing Me to Sleep",
    image: "img/maxresdefault-1.jpg",
  },
  {
    name: "LiL Peep & Xxxtentacion - Falling Down.mp3",
    title: "LiL Peep & Xxxtentacion - Falling Down",
    image: "img/maxresdefault-2.jpg",
  },
];

let songIndex = 0;
let isPlaying = false;

// ❗ Faqat bitta loadSong funksiyasi kerak:
function loadSong(index) {
  const song = songs[index];
  audio.src = `music/${song.name}`;
  title.textContent = song.title;
  titleImg.src = song.image;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Dastlabki qo‘shiqni yuklash
loadSong(songIndex);
