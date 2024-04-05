document.addEventListener('DOMContentLoaded', () => {
    // Get back photograph data stored in the localStorage
    const photographerInfo = JSON.parse(localStorage.getItem('selectedPhotographer'));

    // Check if the data is existant
    if (photographerInfo) {
        // Creation of the HTML article with photograph information
        const userCardElement = document.createElement('article');
        userCardElement.classList.add('user-card');

        const nameElement = document.createElement('h2');
        nameElement.textContent = photographerInfo.name;
        nameElement.classList.add('photographer-name');

        const cityCountryElement = document.createElement('p');
        cityCountryElement.textContent = photographerInfo.cityCountry;
        cityCountryElement.classList.add('city-country');

        const taglineElement = document.createElement('p');
        taglineElement.textContent = photographerInfo.tagline;
        taglineElement.classList.add('tagline');

        // Adding the elements
        userCardElement.appendChild(nameElement);
        userCardElement.appendChild(cityCountryElement);
        userCardElement.appendChild(taglineElement);

        // Get the photograph header and adding the usercard
        const photographerHeader = document.querySelector('.photograph-header');
        photographerHeader.appendChild(userCardElement);

        // Contact button
        const contactButton = document.createElement('button');
        contactButton.textContent = 'Contactez-moi';
        contactButton.classList.add('contact_button');
        contactButton.addEventListener('click', displayModal);
        photographerHeader.appendChild(contactButton);

        // Image
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const imageElement = document.createElement('img');
        imageElement.src = `/assets/photographers/${photographerInfo.portrait}`;
        imageElement.alt = photographerInfo.name;

        imageContainer.appendChild(imageElement);
        photographerHeader.appendChild(imageContainer);
    } else {
        console.error('No photographer data found in the local storage.');
    }
});
