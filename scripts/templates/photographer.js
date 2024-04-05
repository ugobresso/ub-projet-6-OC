/**
 * Function : returning the usercard DOM
 */
function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    // Usercard article creation
    const userCardDOM = document.createElement('article');
    userCardDOM.classList.add('user-card');
    
    // Img container creation
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // Img creation
    const imageElement = document.createElement('img');
    imageElement.src = `/assets/photographers/${portrait}`;
    imageElement.alt = name;

    // Adding the img to its container
    imageContainer.appendChild(imageElement);

    // Creation of the other elements of the usercard
    const nameElement = document.createElement('h2');
    nameElement.textContent = name;
    nameElement.classList.add('photographer-name');

    const cityCountryElement = document.createElement('p');
    cityCountryElement.textContent = `${city}, ${country}`;
    cityCountryElement.classList.add('city-country');

    const taglineElement = document.createElement('p');
    taglineElement.textContent = tagline;
    taglineElement.classList.add('tagline');

    const priceElement = document.createElement('p');
    priceElement.textContent = `${price}€/jour`;
    priceElement.classList.add('price');

    // Ajout des autres éléments à la carte utilisateur
    userCardDOM.appendChild(imageContainer);
    userCardDOM.appendChild(nameElement);
    userCardDOM.appendChild(cityCountryElement);
    userCardDOM.appendChild(taglineElement);
    userCardDOM.appendChild(priceElement);

    // Retourne 
    return userCardDOM;
}