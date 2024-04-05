// Function to get photographers from JSON file
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

// Function to show photographers data on the website
async function displayData(photographers) {
    const photographersSection = document.getElementsByClassName("photographer_section")[0];

    photographers.forEach((currentPhotographer) => {
        const photographerModel = photographerTemplate(currentPhotographer);
        photographersSection.appendChild(photographerModel);

        // Adding a click event handler to each photographer card
        photographerModel.addEventListener('click', () => {
            // Get photographers data
            const photographerInfo = {
                name: currentPhotographer.name,
                cityCountry: currentPhotographer.city + ', ' + currentPhotographer.country,
                tagline: currentPhotographer.tagline,
                price: currentPhotographer.price,
                portrait: currentPhotographer.portrait
            };


            // Store the photographer's information for the next page
            localStorage.setItem('selectedPhotographer', JSON.stringify(photographerInfo));

            // Redirect the user to the next page
            window.location.href = 'photographer.html';
        });
    });
}

async function init() {
    // Return photographers data from JSON file
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
