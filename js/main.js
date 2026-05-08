const tapMsg = document.getElementById('tapMsg');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
const byeMsg = document.getElementById('byeMsg');
const playView = document.getElementById('playView');
const lyricsView = document.getElementById('lyricsView');
const musicNotes = document.getElementById('musicNotes');
const playBtn = document.getElementById('playBtn');
const audioPlayer = document.getElementById('audioPlayer');
const lyricsContainer = document.getElementById('lyricsContainer');
const catVideo1 = document.getElementById('catVideo1');
const catVideo2 = document.getElementById('catVideo2');
const lyricImg1 = document.getElementById('lyricImg1');
const lyricImg2 = document.getElementById('lyricImg2');

function showTapMessage() {
    tapMsg.classList.add('show');
    setTimeout(() => {
        playView.classList.add('visible');
    }, 1500);
}

showTapMessage();

let lyricsOpened = false;

const lyricsData = [
    { start: 17.5, end: 20.5, text: "Tumi ki janonaaa" },
    { start: 21, end: 22.5, text: "Tumi ki bojhonaaa" },
    { start: 22.7, end: 27.8, text: "tomar e bihone e mooooon joleee" },
    { start: 28, end: 29.3, text: "Tumi ki janonaaa" },
    { start: 30.2, end: 32.4, text: "Tumi ki bojhonaaa" },
    { start: 32.8, end: 37, text: "tomar e Kotha e hridoyyy boleee" },
    { start: 38, end: 42, text: "Jodi, basho, bhalo amakeee" },
    { start: 42.5, end: 47.7, text: "tobe, keno, thaako dure dureee" },
    { start: 48, end: 52.7, text: "shohenaa, jaatonaa, ki korii, bolo naaa" },
    { start: 53, end: 57.2, text: "jotonee, rekhechhii, tomaake koto naa" },
    { start: 57.2, end: 62.2, text: "shohenaa, jaatonaa, ki korii, bolo naaa" },
    { start: 62.7, end: 67, text: "jotonee, rekhechii, tomaake koto naa" },
    { start: 67, end: 91, text: "♪ ♫ ♪" },
    { start: 91, end: 93.3, text: "e moner e shimanaay" },
    { start: 93.9, end: 95.5, text: "Tumi chhara Kew naai" },
    { start: 96, end: 100, text: "araal hole jeno, more jaaaaaai" },
    { start: 101, end: 102.9, text: "e moner e shimanaay" },
    { start: 103.2, end: 105.4, text: "tumii chhara keww naaiii" },
    { start: 105.7, end: 109.7, text: "araal hooooole jenooo, moreee jaaaaai" },
    { start: 110.1, end: 115.2, text: "shohenaa, jaatonaa, ki koriii bolonaaa" },
    { start: 115.7, end: 119.5, text: "jotonee, rekhechhii, tomaake koto naa" },
    { start: 120, end: 124.5, text: "shohenaa, jaatonaa, ki koriii bolonaaa" },
    { start: 125, end: 129.5, text: "jotonee, rekhechhii, tomaake koto naa" }
];

let isPlaying = false;
let currentLineIndex = -1;

lyricsData.forEach((line, index) => {
    const div = document.createElement('div');
    div.className = 'lyric-line';
    div.textContent = line.text;
    div.dataset.index = index;
    div.addEventListener('click', () => {
        audioPlayer.currentTime = line.start;
    });
    lyricsContainer.appendChild(div);
});

const lyricLines = document.querySelectorAll('.lyric-line');

lyricLines.forEach((line, index) => {
    if (lyricsData[index].text.includes('♪')) {
        line.classList.add('music-icon');
    }
});

playBtn.addEventListener('click', () => {
    playView.classList.add('hidden');
    audioPlayer.volume = 0;
    audioPlayer.play();
    isPlaying = true;
    playBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';

    let startTime = null;
    const fadeDuration = 2000;
    function fadeIn(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / fadeDuration, 1);
        audioPlayer.volume = progress;
        if (progress < 1) {
            requestAnimationFrame(fadeIn);
        }
    }
    requestAnimationFrame(fadeIn);

    setTimeout(() => {
        tapMsg.classList.remove('show');
    }, 100);

    setTimeout(() => {
        msg1.classList.add('show');
    }, 2000);

    setTimeout(() => {
        msg1.classList.remove('show');
    }, 5500);

    setTimeout(() => {
        msg2.classList.add('show');
    }, 8000);

    setTimeout(() => {
        msg2.classList.remove('show');
    }, 15000);

    setTimeout(() => {
        if (!lyricsOpened) {
            lyricsOpened = true;
            lyricsView.classList.add('active');
            musicNotes.classList.add('active');
        }
    }, 16000);
});

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;

    lyricsData.forEach((line, index) => {
        if (currentTime >= line.start && currentTime < line.end) {
            if (currentLineIndex !== index) {
                if (currentLineIndex !== -1) {
                    lyricLines[currentLineIndex].classList.remove('active');
                    lyricLines[currentLineIndex].classList.add('past');
                }
                
                lyricLines[index].classList.add('active');
                lyricLines[index].classList.remove('past');
                
                lyricLines[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                currentLineIndex = index;
            }
        }
    });
});

let endSequenceTriggered = false;

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    
    // Show cat videos during 67-91 seconds (music icon part)
    if (currentTime >= 67 && currentTime < 91) {
        if (!catVideo1.classList.contains('active')) {
            catVideo1.classList.add('active');
            catVideo2.classList.add('active');
            catVideo1.play();
            catVideo2.play();
        }
    } else {
        catVideo1.classList.remove('active');
        catVideo2.classList.remove('active');
    }
    
    // Show lyric images during first lyric (17.5 - 20.5s)
    if (currentTime >= 17.5 && currentTime < 20.5) {
        lyricImg1.classList.add('active');
        lyricImg2.classList.add('active');
    } else {
        lyricImg1.classList.remove('active');
        lyricImg2.classList.remove('active');
    }
    
    // Trigger end sequence when last lyric ends + 1s
    if (!endSequenceTriggered && currentTime >= 130.5) {
        endSequenceTriggered = true;
        
        lyricsView.classList.remove('active');
        musicNotes.classList.remove('active');
        catVideo1.classList.remove('active');
        catVideo2.classList.remove('active');
        
        setTimeout(() => {
            byeMsg.classList.add('show');
            
            setTimeout(() => {
                window.location.href = 'https://facebook.com/asayman22';
            }, 3000);
        }, 500);
        
        isPlaying = false;
        currentLineIndex = -1;
        lyricLines.forEach(line => {
            line.classList.remove('active', 'past');
        });
    }
});

audioPlayer.addEventListener('ended', () => {
    if (!endSequenceTriggered) {
        lyricsView.classList.remove('active');
        musicNotes.classList.remove('active');
        catVideo1.classList.remove('active');
        catVideo2.classList.remove('active');
        
        setTimeout(() => {
            byeMsg.classList.add('show');
            
            setTimeout(() => {
                window.location.href = 'https://facebook.com/asayman22';
            }, 3000);
        }, 500);
        
        isPlaying = false;
    }
});