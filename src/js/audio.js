export const audio = (btnAudio, isPlaying, music) => {
    const playIcon = btnAudio.querySelector('i');

    btnAudio.addEventListener('click', () => {
        if (isPlaying) {
            btnAudio.classList.add('active');
            playIcon.classList.remove('bx-play-circle');
            playIcon.classList.add('bx-pause-circle');
            music.play();
        } else {
            btnAudio.classList.remove('active');
            playIcon.classList.remove('bx-pause-circle');
            playIcon.classList.add('bx-play-circle');
            music.pause();
        }
        isPlaying = !isPlaying;
    });
}
