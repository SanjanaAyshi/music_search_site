const searchResult = async () => {
    const searchText = document.getElementById('input').value;
    // console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch (error) {
        errorMassage('loading failed');
    }
}
const displaySongs = songs => {
    console.log(songs);
    const songContainer = document.getElementById('songContainer');
    songContainer.innerText = "";
    songs.forEach(song => {
        const songDiv = document.createElement('div')
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
        <source src="${song.preview}" type="audio/mpeg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>
        `;
        songContainer.appendChild(songDiv);

    });
}
const getLyric = (artist, title) => {
    const lyricsApi = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(lyricsApi)
        .then(res => res.json())
        .then(data => lyricsDiv(data.lyrics))
        .catch(error => errorMassage('something went wrong!!'));
}
const lyricsDiv = lyrics => {
    const lyrics_div = document.getElementById('song-lyrics');
    lyrics_div.innerText = lyrics;
}
const errorMassage = error => {
    const errorTag = document.getElementById('error_massage');
    errorTag.innerText = error;
}