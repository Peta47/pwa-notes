const notesContainer = document.getElementById('notes-container');
const photoInput = document.getElementById('photo-input');
const photosContainer = document.getElementById('photos-container');

// Uloží poznámky
function saveNotes() {
  const notes = Array.from(notesContainer.querySelectorAll('textarea')).map(t => t.value);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Načte poznámky z localStorage
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [''];
  savedNotes.forEach(note => addNoteElement(note));
}

// Přidá textovou poznámku s tlačítkem odstranit
function addNoteElement(text = '') {
  const wrapper = document.createElement('div');
  wrapper.className = 'note-wrapper';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Napiš poznámku...';
  textarea.value = text;
  textarea.addEventListener('input', saveNotes);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️ Odstranit';
  deleteBtn.addEventListener('click', () => {
    wrapper.remove();
    saveNotes();
  });

  wrapper.appendChild(textarea);
  wrapper.appendChild(deleteBtn);
  notesContainer.appendChild(wrapper);
  saveNotes();
}

// Uloží fotky
function savePhotos() {
  const photoData = Array.from(photosContainer.querySelectorAll('img')).map(img => img.src);
  localStorage.setItem('photos', JSON.stringify(photoData));
}

// Načte fotky z localStorage
function loadPhotos() {
  const savedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
  savedPhotos.forEach(src => addPhotoElement(src));
}

// Přidá obrázek s tlačítkem odstranit
function addPhotoElement(src) {
  const wrapper = document.createElement('div');
  wrapper.className = 'photo-wrapper';

  const img = document.createElement('img');
  img.src = src;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️ Odstranit';
  deleteBtn.addEventListener('click', () => {
    wrapper.remove();
    savePhotos();
  });

  wrapper.appendChild(img);
  wrapper.appendChild(deleteBtn);
  photosContainer.appendChild(wrapper);
  savePhotos();
}

// Přidání nové poznámky
document.getElementById('add-note').addEventListener('click', () => {
  addNoteElement('');
});

// Přidání nové fotky
document.getElementById('add-photo').addEventListener('click', () => {
  photoInput.click();
});

photoInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      addPhotoElement(e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Registrace service workeru
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('SW zaregistrován'))
    .catch(err => console.error('Chyba registrace SW', err));
}

// Načti vše při načtení
loadNotes();
loadPhotos();
