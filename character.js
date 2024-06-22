//checking full load of DOM content
document.addEventListener('DOMContentLoaded', () => {
    const characterDetailContainer = document.getElementById('character-detail');

    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');

    const fetchCharacterDetails = async () => {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const character = await response.json();
        displayCharacterDetails(character);
    };

    //generation of character page by
    const displayCharacterDetails = (character) => {
        characterDetailContainer.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Species: ${character.species}</p>
            <p>Status: ${character.status}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Location: ${character.location.name}</p>
        `;
    };

    fetchCharacterDetails();
});
