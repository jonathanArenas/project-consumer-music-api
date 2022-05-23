const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        'X-RapidAPI-Key': 'e202890f1bmsh4cc82f5c927a815p1dffa0jsnb3a158b3dff3'
    }
};

const conteinerCard = document.querySelector('#containerCard');
const searchForm = document.querySelector('#searchForm');
const dataSong = [];

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { songSearch } = event.target;
    const songSearchValue = songSearch.value;
    cleanView();
    main(songSearchValue);

});

const main = (song = 'tiesto') => {
    fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=' + song + '&per_page=12&page=1', options)
        .then(response => response.json(), loader())
        .then(data => firstNormalizeData(data), cleanView())
        .then(songs => songs.forEach(renderCardElements))
        .catch(err => console.error(err));
}


// renderizar el contenido en un Card
const renderCardElements = (element) => {
    const divCard = document.createElement('div');
    const divCardContent = document.createElement('div');
    const divCardContentImagen = document.createElement('div');
    const cardContentImagen = document.createElement('img');
    const divCardContentTitle = document.createElement('div');
    const titleText = document.createElement('h3');
    const divCardContentArtist = document.createElement('div');
    const divContentImagenArtists = document.createElement('div');
    const divArtistImagen = document.createElement('div')
    const imgArtist = document.createElement('img');
    const divContentNamesArtists = document.createElement('div');
    const labelNameArtist = document.createElement('label');
    const divMiddle = document.createElement('div');
    const divMiddleText = document.createElement('div');



    divCard.classList.add('card');
    divCardContent.classList.add('card-content');
    divCardContentImagen.classList.add('imagen');
    divMiddle.classList.add('middle');
    divMiddleText.classList.add('text');
    divCardContentTitle.classList.add('title');
    divCardContentArtist.classList.add('artists');
    divContentImagenArtists.classList.add('contentImagenArtists');
    divContentNamesArtists.classList.add('contentNameArtists');
    divArtistImagen.classList.add('art-imagen');

    cardContentImagen.setAttribute('src', element.imagen);
    divMiddleText.innerHTML = 'Lyrics';
    divMiddleText.setAttribute('song', element.song);
    divMiddleText.addEventListener('click', handleLyricsClick);
    if (element.title.length > 15) {
        element.title = element.title.substring(0, 13) + '...';
    }

    titleText.innerHTML = element.title;

    imgArtist.setAttribute('src', element.artists.image_url);
    imgArtist.setAttribute('alt', element.artists.name);
    divArtistImagen.appendChild(imgArtist);
    divContentImagenArtists.appendChild(divArtistImagen);
    /*
    for (let index = 0; index < artistas; index++) { 
        const divArtistImagen = document.createElement('div')
        const imgArtist = document.createElement('img');
        divArtistImagen.classList.add('art-imagen');
        imgArtist.setAttribute('src', element.artists[index].image_url);
        imgArtist.setAttribute('alt', element.artists[index].name);
        divArtistImagen.appendChild(imgArtist);
        divContentImagenArtists.appendChild(divArtistImagen);
        if(index ==3){
            break;
        }

    }*/
    if (element.artistsNames.length > 25) {
        element.artistsNames = element.artistsNames.substring(0, 22) + '...';
    }
    labelNameArtist.innerHTML = element.artistsNames
    divContentNamesArtists.appendChild(labelNameArtist);

    divCardContentArtist.appendChild(divContentImagenArtists);
    divCardContentArtist.appendChild(divContentNamesArtists);
    divCardContentTitle.appendChild(titleText);
    divCardContentImagen.appendChild(cardContentImagen);
    divMiddle.appendChild(divMiddleText);
    divCardContentImagen.appendChild(divMiddle);
    divCardContent.appendChild(divCardContentImagen);
    divCardContent.appendChild(divCardContentTitle);
    divCardContent.appendChild(divCardContentArtist);

    divCard.appendChild(divCardContent);
    conteinerCard.appendChild(divCard);

}
//Limpiar el Contenido del contenedor
const cleanView = () => {
    conteinerCard.innerHTML =  '';
};

const handleLyricsClick = (event) => {
    openModal();
    const idLyrics = event.target.getAttribute('song');
    const id = parseInt(idLyrics);
    searchDataSong(id);
};

const loader = ()=>{
    conteinerCard.innerHTML = '<div class=Wloader"><div class="bar bar1"></div><div class="bar bar2"></div><div class="bar bar3"></div><div class="bar bar4"></div><div class="bar bar5"></div><div class="bar bar6"></div><div class="bar bar7"></div><div class="bar bar8"></div></div>'
};


const searchDataSong = (id) => {
    fetch('https://genius-song-lyrics1.p.rapidapi.com/songs/' + id + '?text_format=dom', options)
    .then(response => response.json())
    .then(data => searchLyricSong(data, id))
    .catch(err => console.log(err));
   
}

const searchLyricSong = (dataSong, id)=>{
        fetch('https://genius-song-lyrics1.p.rapidapi.com/songs/' + id + '/lyrics', options)
        .then(response => response.json())
        .then(dataLyrics => normalizeDataSong(dataSong, dataLyrics))
        .then(dataModal => renderContentModal(dataModal))
        .catch(err => console.error(err));
}

// Normaliza los datos default result
const firstNormalizeData = (data) => {
    const hits = [];
    albumData = data.response.hits;
    albumData.forEach(element => {
        const { result } = element;
        const hit = {
            imagen: result.song_art_image_thumbnail_url,
            title: result.title,
            artistsNames: result.artist_names,
            song: result.id,
            artists: result.primary_artist
        };
        hits.push(hit);
    });
    return hits;

};

const normalizeDataSong = (dataSong, dataLyric) => {
    const song = {
        title: dataSong.response.song.title,
        imagen: dataSong.response.song.song_art_image_thumbnail_url,
        date: dataSong.response.song.release_date,
        youtube: dataSong.response.song.youtube_url,
        spotify: dataSong.response.song.spotify_uuid

    }
    const lyric = {
        lyric: dataLyric?.response?.lyrics?.lyrics?.body?.html || '<p>We are working on it!!</p>',
        lenguage: dataLyric?.response?.trackingData?.["Lyrics Language"] || '...'
    }
    return { ...song, ...lyric };
}



main();
