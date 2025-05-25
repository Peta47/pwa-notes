const textarea = document.getElementById('note');

// Načtení poznámky
textarea.value = localStorage.getItem('note') || '';

// Uložení při změně
textarea.addEventListener('input', () => {
  localStorage.setItem('note', textarea.value);
});

// Registrace service workeru
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('SW zaregistrován'))
    .catch(err => console.error('Chyba registrace SW', err));
}
