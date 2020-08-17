
// Search Input And Search Button Click Handler:

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const searchLyrics = document.getElementById('search-lyrics').value;

// Lyrics ovh API:

    fetch(`https://api.lyrics.ovh/suggest/${searchLyrics}/`)
        .then(res => res.json())
        .then(data => searchResult(data));
      
});

// Get Lyrics

function searchResult(search) {
    let lyricsShowList = document.getElementById('lyrics-show-list');
    for (let i = 0; i < 10; i++) {
        let title = search.data[i].title;
        let artist = search.data[i].artist.name;

        let result = `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-8">
    
        <h3 class="lyrics-name" id="title">${title}</h3>
            <p class="author lead">Album by <span id="artistName">${artist}</span></p>
        </div>
      
        <div class="col-md-3 text-md-right text-center">
            <button  onclick="artistTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`;
    lyricsShowList.innerHTML += result;
    }
}


function artistTitle(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(songs => showLyrics(songs, title));
}

//  Display Lyrics Show:

function showLyrics(songs, title) {
    if (songs.lyrics == undefined) {
        document.getElementById('lyric-show-display').innerText = " No lyrics found!! Please try Another";
    } else {
        document.getElementById('lyric-show-display').innerText = songs.lyrics;
    }
    document.getElementById('lyrics-show-title').innerText = title;

}

