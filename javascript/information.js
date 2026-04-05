// 3 promotional messages
const promoMessages = [
  "Optical Sensing Division has 8 openings for PhD researchers! Develop next-gen imaging systems.",
  "Bio-Sensing Group offers 5 internship positions in medical sensor development for researchers!",
  "Smart Sensing Division is recruiting 6 interns for IoT sensing networks!"
];

// 2 videos (video2 FIRST)
const videoSources = [
  {
    mp4: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.mp4",
    webm: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.webm"
  },
  {
    mp4: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.mp4",
    webm: "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.webm"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("promoText");
  const videoEl = document.getElementById("promoVideo");
  const mp4El = document.getElementById("videoMp4");
  const webmEl = document.getElementById("videoWebm");

  /* -------- TEXT ROTATION -------- */
  let msgIndex = Math.floor(Math.random() * promoMessages.length);
  textEl.innerHTML = promoMessages[msgIndex];

  setInterval(() => {
    msgIndex = (msgIndex + 1) % promoMessages.length;
    textEl.innerHTML = promoMessages[msgIndex];
  }, 3000);

  /* -------- VIDEO SWITCHING (FIXED) -------- */
  let vidIndex = 0;   // <<< VIDEO 2 ALWAYS FIRST

  function switchVideo() {
    vidIndex = (vidIndex + 1) % videoSources.length;

    mp4El.src = videoSources[vidIndex].mp4;
    webmEl.src = videoSources[vidIndex].webm;

    videoEl.load();
    videoEl.play();
  }

  // Kiểm tra mỗi 300ms
  setInterval(() => {
    if (videoEl.duration && videoEl.currentTime >= videoEl.duration - 1) {
      switchVideo();
    }
  }, 300);
});
