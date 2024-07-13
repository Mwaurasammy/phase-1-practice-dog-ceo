document.addEventListener('DOMContentLoaded', function() {
  fetchImages();
  fetchBreeds();
});

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

function fetchImages() {
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => renderImages(data.message))
    .catch(error => console.error('Error fetching images:', error));
}

function renderImages(images) {
  const container = document.getElementById('dog-image-container');
  images.forEach(imageUrl => {
    const img = document.createElement('img');
    img.src = imageUrl;
    container.appendChild(img);
  });
}

function fetchBreeds() {
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      const breeds = Object.keys(data.message);
      renderBreeds(breeds);
      addBreedSelectListener(breeds);
    })
    .catch(error => console.error('Error fetching breeds:', error));
}

function renderBreeds(breeds) {
  const ul = document.getElementById('dog-breeds');
  ul.innerHTML = ''; // Clear any existing breeds
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;
    li.addEventListener('click', () => {
      li.style.color = 'blue'; // Change font color to blue when clicked
    });
    ul.appendChild(li);
  });
}

function addBreedSelectListener(breeds) {
  const breedDropdown = document.getElementById('breed-dropdown');
  breedDropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
    renderBreeds(filteredBreeds);
  });
}
