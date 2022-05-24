const body = document.body;
const modalLyrics = document.getElementById('modal-lyrics')
const bodyModalLyrics = document.getElementById('lyris-body');
const divModalHeader = document.getElementById('modal-header');


const closeModal = () => {
    modalLyrics.style.top = '-100vh';
    body.style.overflow = 'auto';
}

const openModal = () => {
    bodyModalLyrics.style.scrollBehavior = 'initial';
    cleanModal();
    bodyModalLyrics.style.display = 'flex';
    bodyModalLyrics.style.justifyContent = 'center';
    bodyModalLyrics.style.alignContent = 'center'
    bodyModalLyrics.innerHTML = '<div class="lds-dual-ring"></div>';
    divModalHeader.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    modalLyrics.style.top = 0;
    body.style.overflow = 'hidden';
}

//############NORMALIZING DATA RESPONSE API###############
const renderContentModal = (element) => {
    const divImagenSong = document.createElement('div');
    const divImagenSongBox = document.createElement('div')
    const imagenSong = document.createElement('img')
    const divInfo = document.createElement('div');
    const divInfoTitle = document.createElement('div');
    const divInfoData = document.createElement('div');
    const divMedia = document.createElement('div');
    const divSpotify = document.createElement('div')
    const divSpotifyBox = document.createElement('div');
    const imagenSpotify = document.createElement('img');
    const divYoutube = document.createElement('div')
    const divYoutubeBox = document.createElement('div');
    const imagenYoutube = document.createElement('img');
    const divCloseModal = document.createElement('div')
    const spanCloseModal = document.createElement('span');

    divImagenSong.classList.add('imagen-song');
    divImagenSongBox.classList.add('box-imagen');
    imagenSong.setAttribute('src', element.imagen);
    imagenSong.setAttribute('alt', element.title);
    divInfo.classList.add('info');
    divInfoTitle.classList.add('title');
    if (element.title.length > 14) {
        element.title = element.title.substring(0, 12) + '..';
    }
    divInfoTitle.innerHTML = element.title;
    divInfoData.classList.add('data');
    divInfoData.innerHTML = element.date + '.' + element.lenguage;
    divMedia.classList.add('media');
    divSpotify.classList.add('spotify');
    divSpotifyBox.classList.add('box-spotify');
    if (element.spotify !== '') {
        imagenSpotify.setAttribute('src', 'assets/img/spotify.png')
        imagenSpotify.setAttribute('alt', 'spotify')
        imagenSpotify.setAttribute('enlace', 'https://open.spotify.com/track/' + element.spotify);
        imagenSpotify.addEventListener('click', openSpotify);
    }

    if (element.youtube !== '') {
        divYoutube.classList.add('youtube');
        divYoutubeBox.classList.add('box-youtube');
        imagenYoutube.setAttribute('src', 'assets/img/youtube1.png')
        imagenYoutube.setAttribute('alt', 'youtube');
        imagenYoutube.setAttribute('enlace', element.youtube);
        imagenYoutube.addEventListener('click', openYoutube);
    }

    divCloseModal.classList.add('close-modal');
    spanCloseModal.innerHTML = 'X';
    spanCloseModal.addEventListener('click', closeModal);

    divImagenSongBox.appendChild(imagenSong);
    divImagenSong.appendChild(divImagenSongBox);
    divInfo.appendChild(divInfoTitle);
    divInfo.appendChild(divInfoData);

    divSpotifyBox.appendChild(imagenSpotify);
    divSpotify.appendChild(divSpotifyBox);
    divYoutubeBox.appendChild(imagenYoutube);
    divYoutube.appendChild(divYoutubeBox);
    divMedia.appendChild(divSpotify);
    divMedia.appendChild(divYoutube);
    divCloseModal.appendChild(spanCloseModal);
    cleanModal();
    divModalHeader.appendChild(divImagenSong);
    divModalHeader.appendChild(divInfo);
    divModalHeader.appendChild(divMedia);
    divModalHeader.appendChild(divCloseModal);
    bodyModalLyrics.style.display = 'block';
    bodyModalLyrics.style.justifyContent = 'none';
    bodyModalLyrics.style.alignContent = 'none';
    bodyModalLyrics.innerHTML = element.lyric;
}
//############OPEN MEDIA YOUTUBE OR SPOTIFY###############
const openYoutube = (event) => {
    let enlace = event.target.getAttribute('enlace');
    console.log(enlace);
    window.open(enlace)
}
const openSpotify = (event) => {
    let enlace = event.target.getAttribute('enlace');
    console.log(enlace);
    window.open(enlace);
}


const cleanModal = () => {
    divModalHeader.innerHTML = '';
    bodyModalLyrics.innerHTML = '';
}

