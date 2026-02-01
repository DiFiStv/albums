let currentAudio = null;

fetch('data.json')
  .then(res => res.json())
  .then(data => init(data));

function init(data) {
  const albumsContainer = document.getElementById('albums');
  const tracksContainer = document.getElementById('tracks');

  data.albums.forEach((album, index) => {
    const albumEl = document.createElement('div');
    albumEl.className = 'album';

    albumEl.innerHTML = `
      <img src="${album.cover}" alt="${album.title}">
      <div class="album-title">${album.title}</div>
    `;

    albumEl.onclick = () => showTracks(album);
    albumsContainer.appendChild(albumEl);

    if (index === 0) showTracks(album);
  });

  function showTracks(album) {
    tracksContainer.innerHTML = `
      <h2>${album.title}</h2>
      ${album.tracks.map((track, i) => `
        <div class="track">
          <h3>${track.title}</h3>
          <audio data-index="${i}" controls>
            <source src="${track.src}" type="audio/mpeg">
          </audio>
        </div>
      `).join('')}
    `;

    setupAudioControls();
  }
}

function setupAudioControls() {
  const audios = document.querySelectorAll('audio');

  audios.forEach(audio => {
    audio.addEventListener('play', () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio = audio;
    });
  });
}
