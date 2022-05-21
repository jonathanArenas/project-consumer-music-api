const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com',
        'X-RapidAPI-Key': 'e202890f1bmsh4cc82f5c927a815p1dffa0jsnb3a158b3dff3'
    }
};

const conteinerCard = document.querySelector('#containerCard');
const songs = [];
const closeModal= document.getElementById('close-modal');



fetch('https://genius-song-lyrics1.p.rapidapi.com/albums/670828/appearances?per_page=20&page=1', options)
    .then(response => response.json())
    .then(data => firstNormalizeData(data))
    .then(songs => songs.forEach(renderCard))
    .catch(err => console.error(err));

// renderizar el contenido en un Card
const renderCard = (element) => {
    const divCard = document.createElement('div');
    const divCardContent = document.createElement('div');
    const divCardContentImagen = document.createElement('div');
    const cardContentImagen = document.createElement('img');
    const divCardContentTitle = document.createElement('div');
    const titleText = document.createElement('h3');
    const divCardContentArtist = document.createElement('div');
    const divContentImagenArtists = document.createElement('div');
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

    cardContentImagen.setAttribute('src', element.imagen);
    divMiddleText.innerHTML = 'Lyrics';
    divMiddleText.setAttribute('lyrics', element.lyricsId);
    divMiddleText.addEventListener('click', handleLyricsClick);
    if(element.title.length > 15){
        element.title = element.title.substring(0,13) + '...';
    }
    
    titleText.innerHTML = element.title;
    let artistas = element.artists.length;

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

    }
    if(element.artistsNames.length > 25){
        element.artistsNames = element.artistsNames.substring(0,22) + '...';
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
    conteinerCard.innerHTML = '';
};

// Normaliza los datos default 
const firstNormalizeData = (data) => {
    albumData = data.response.album_appearances;
        albumData.forEach(element =>{
            dataSong = element.song;
            const {song_art_image_thumbnail_url, artist_names, title, id ,writer_artists} = dataSong;
            const song = {
                imagen: song_art_image_thumbnail_url,
                title: title,
                artistsNames: artist_names,
                lyricsId: id,
                artists: writer_artists

            };
            songs.push(song);
        });
    return songs;
};

const handleLyricsClick = (event) => {
    const idLyrics = event.target.getAttribute('lyrics');
    const id = parseInt(idLyrics);

    searchLyrics(id);

};


const searchLyrics = (id)=>{

    fetch('https://genius-song-lyrics1.p.rapidapi.com/songs/'+id+'/lyrics', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}
