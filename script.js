//checking full load of DOM content
document.addEventListener('DOMContentLoaded', () => {
    const characterContainer = document.getElementById('character-container');
    const searchInput = document.getElementById('search');
    const speciesFilter = document.getElementById('species');
    const statusFilter = document.getElementById('status');
    const genderFilter = document.getElementById('gender');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pageInfo = document.getElementById('page-info');

    let currentPage = 1;
    let totalPages = 1;

    const fetchCharacters = async () => {
        const query = searchInput.value;
        const species = speciesFilter.value;
        const status = statusFilter.value;
        const gender = genderFilter.value;

        const url = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${query}&species=${species}&status=${status}&gender=${gender}`;
        const response = await fetch(url)
        const data = await response.json();
        //data is object
        console.log(data)
        totalPages = data.info.pages;
        displayCharacters(data.results);
        updatePagination();
    };
    //provide data.results as a list in function to display
    const displayCharacters = (characters) => {
        characterContainer.innerHTML = '';
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            characterCard.innerHTML = `
                <a href="character.html?id=${character.id}">
                    <img src="${character.image}" alt="${character.name}">
                    <h2>${character.name}</h2>
                    <p>Species: ${character.species}</p>
                    <p>Status: ${character.status}</p>
                    <p>Location: ${character.location.name}</p>
                </a>
            `;
            characterContainer.appendChild(characterCard);
        });
    };

    const updatePagination = () => {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    };

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        fetchCharacters();
    });

    speciesFilter.addEventListener('change', () => {
        currentPage = 1;
        fetchCharacters();
    });

    statusFilter.addEventListener('change', () => {
        currentPage = 1;
        fetchCharacters();
    });

    genderFilter.addEventListener('change', () => {
        currentPage = 1;
        fetchCharacters();
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchCharacters();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchCharacters();
        }
    });

    // Initial fetch
    fetchCharacters();
});
