async function getPhotographers() {
    try {
        const response = await fetch('/data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur de chargement des données des photographes');
        }
        const data = await response.json();
        return { photographers: data.photographers.slice(0, 6) };
    } catch (error) {
        console.error('Erreur :', error);
        return { photographers: [] };
    }
}

/**
 * Retourne l'ensemble du DOM de la carte utilisateur
 */
function photographerTemplate(photographer) {
    const { name, city, country, tagline, price, portrait } = photographer;

    // Création du conteneur principal de la carte utilisateur
    const userCardDOM = document.createElement('div');
    userCardDOM.classList.add('user-card');
    
    // Création du conteneur de l'image
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // Création de l'élément de l'image
    const imageElement = document.createElement('img');
    imageElement.src = `/assets/photographers/${portrait}`;
    imageElement.alt = name;

    // Ajout de l'élément de l'image au conteneur de l'image
    imageContainer.appendChild(imageElement);

    // Création des autres éléments de la carte utilisateur
    const nameElement = document.createElement('h2');
    nameElement.textContent = name;

    const cityCountryElement = document.createElement('p');
    cityCountryElement.textContent = `${city}, ${country}`;

    const taglineElement = document.createElement('p');
    taglineElement.textContent = tagline;

    const priceElement = document.createElement('p');
    priceElement.textContent = `${price}€/jour`;

    // Ajout des autres éléments à la carte utilisateur
    userCardDOM.appendChild(imageContainer);
    userCardDOM.appendChild(nameElement);
    userCardDOM.appendChild(cityCountryElement);
    userCardDOM.appendChild(taglineElement);
    userCardDOM.appendChild(priceElement);

    // Retourne 
    return userCardDOM;
}


async function displayData(photographers) {
    const photographersSection = document.getElementsByClassName("photographer_section")[0];

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        photographersSection.appendChild(photographerModel);
    });
}

async function init() {
    // Récupère les datas des photographes à partir du fichier JSON
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
