import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player')

const iframePlayer = new Player(iframe);

// Функція для збереження поточного часу відтворення у локальне сховище
function saveCurrentTime(time) {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(time));
}

// Функція для відновлення часу відтворення зі збереженої позиції
function restoreCurrentTime() {
    const currentTime = localStorage.getItem("videoplayer-current-time");
    iframePlayer.setCurrentTime(Number(JSON.parse(currentTime)) || 0);
}

// Відстеження події timeupdate і збереження часу відтворення з певною затримкою
iframePlayer.on('timeupdate', throttle(event => {
  saveCurrentTime(event.seconds);
}, 1000));

// Відновлення часу відтворення під час перезавантаження сторінки
restoreCurrentTime();
