// GLOBAL VARIABLE WITH DATA HEADERS BY COMSUMER API
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        'X-RapidAPI-Key': 'e202890f1bmsh4cc82f5c927a815p1dffa0jsnb3a158b3dff3'
    }
};

const conteinerCard = document.querySelector('#containerCard');
const searchForm = document.querySelector('#searchForm');
const selectArtist = document.getElementById('artists');
const artists = [];
const Hits = [];


//############EVENT FORM SEARCH###############
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const { songSearch } = event.target;
    const songSearchValue = songSearch.value;
    cleanView();
    main(songSearchValue);

});

//############EVENT SELECT ARTIST###############
selectArtist.addEventListener('change', (event) => {
    console.log(event.target.value);
    let artistValue = event.target.value;
    const filterHits = searchingWithFilter(artistValue);
    cleanView();
    filterHits.forEach(renderCardElements);
})


//############ EXECUTION FUNCION###############
const main = (song = 'tiesto') => {
    fetch('https://genius-song-lyrics1.p.rapidapi.com/search?q=' + song + '&per_page=50&page=1', options)
        .then(response => response.json())
        .then(data => firstNormalizeData(data))
        .then(songs => songs.forEach(renderCardElements))
        .catch(err => console.error(err));
}


//############RENDER CARD AND CONTENT###############
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
    nameArtist = ''
    if (element.artistsNames.length > 25) {
        nameArtist = element.artistsNames.substring(0, 22) + '...';
    } else {
        nameArtist = element.artistsNames;
    }
    labelNameArtist.innerHTML = nameArtist;
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
//############RENDER OPTIONS SELECT###############
const renderFilterSelect = (element) => {
    const option = document.createElement('option');
    option.innerHTML = element
    option.setAttribute('value', element);
    selectArtist.appendChild(option);
}

//############CLEAN OPTIONS SELECT###############
const cleanFilterSelect = () => {
    selectArtist.innerHTML = '';
}
//############CLEAN CONTEINER###############
const cleanView = () => {
    conteinerCard.innerHTML = '';
};

const handleLyricsClick = (event) => {
    openModal();
    const idLyrics = event.target.getAttribute('song');
    const id = parseInt(idLyrics);
    searchDataSong(id);
};

const loader = () => {
    conteinerCard.innerHTML = '<div class=Wloader"><div class="bar bar1"></div><div class="bar bar2"></div><div class="bar bar3"></div><div class="bar bar4"></div><div class="bar bar5"></div><div class="bar bar6"></div><div class="bar bar7"></div><div class="bar bar8"></div></div>'
};

//############SEARCHING MORE DATA SONG###############
const searchDataSong = (id) => {
    fetch('https://genius-song-lyrics1.p.rapidapi.com/songs/' + id + '?text_format=dom', options)
        .then(response => response.json())
        .then(data => searchLyricSong(data, id))
        .catch(err => console.log(err));

}

//############SEARCHING LYRICS SONG###############
const searchLyricSong = (dataSong, id) => {
    fetch('https://genius-song-lyrics1.p.rapidapi.com/songs/' + id + '/lyrics', options)
        .then(response => response.json())
        .then(dataLyrics => normalizeDataSong(dataSong, dataLyrics))
        .then(dataModal => renderContentModal(dataModal))
        .catch(err => console.error(err));
}

//############NORMALIZING DATA RESPONSE API###############
const firstNormalizeData = (data) => {
    const hits = [];
    Hits.splice(0, Hits.length);
    artists.splice(0, artists.length);
    artists.push('All')
    data = data.response.hits;
    data.forEach(element => {
        const { result } = element;
        const hit = {
            imagen: result.song_art_image_thumbnail_url,
            title: result.title,
            artistsNames: result.artist_names,
            song: result.id,
            artists: result.primary_artist
        };
        hits.push(hit);

        if (!artists.includes(result.artist_names,)) {
            artists.push(result.artist_names,);
        }
    });
    cleanFilterSelect();
    artists.forEach(renderFilterSelect);
    Hits.push(hits);
    return hits;
};
//############NORMALIZING AND JOIN DATA SONG###############
const normalizeDataSong = (dataSong, dataLyric) => {
    const song = {
        title: dataSong.response.song.title,
        imagen: dataSong.response.song.song_art_image_thumbnail_url,
        date: dataSong.response.song.release_date,
        youtube: dataSong.response.song?.youtube_url || '',
        spotify: dataSong.response.song?.spotify_uuid || '',

    }
    const lyric = {
        lyric: dataLyric?.response?.lyrics?.lyrics?.body?.html || '<p>¡¡We are working on it!!</p>',
        lenguage: dataLyric?.response?.trackingData?.["Lyrics Language"] || '...'
    }
    return { ...song, ...lyric };
}

//############FILTER HITS  BY ARTITS ###############
const searchingWithFilter = (searchingText) => {
    const data = Hits[0];
    let hitsFiltered = [];
    if (searchingText === 'All') {
        hitsFiltered = data;
    } else {
        hitsFiltered = data.filter(hit => {
            const name = hit.artistsNames;
            return name.includes(searchingText);
        });
    }
    return hitsFiltered;
};

main();
