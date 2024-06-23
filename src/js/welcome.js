import {audio} from "./audio.js";

export const welcome = () => {
    const welcome = document.querySelector('.welcome');
    const btnOpen = document.getElementById('open');
    const to = document.getElementById('to');
    const music = document.getElementById('audio');
    const btnAudio = document.getElementById('button_audio');
    const playIcon = btnAudio.querySelector('i');

    let isPlaying = false;

    function getQueryParameter(parameterName) {
        const url = window.location.href;
        const queryString = url.split('?')[1]?.split('#')[0];
        if (!queryString) {
            return null;
        }
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(parameterName);
    }

    btnOpen.addEventListener('click', () => {
        welcome.classList.add('hide');
        btnAudio.classList.add('active');
        playIcon.classList.remove('bx-play-circle');
        playIcon.classList.add('bx-pause-circle');
        music.play();
        isPlaying = true;

        document.body.classList.add('scrollable');
    });

    document.addEventListener('DOMContentLoaded', () => {
        const name = document.getElementById('name');
        const params = getQueryParameter('to');

        if (params) {
            to.textContent = decodeURIComponent(params);
            name.value = params;
        } else {
            to.textContent = 'Teman-teman semua';
        }
        audio(btnAudio, isPlaying, music);
    });
}
