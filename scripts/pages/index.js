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

// Function to show photographers data on the website ; cf. ./templates/photographer.js for the full function 'photographerTemplate'
async function displayData(photographers) {
    const photographersSection = document.getElementsByClassName("photographer_section")[0]; // get the first iteration of the classname

    photographers.forEach((currentPhotographer) => {
        const photographerModel = photographerTemplate(currentPhotographer);
        photographersSection.appendChild(photographerModel);

        // Adding a click event handler to each photographer card and then 3 actions are launched :
        photographerModel.addEventListener('click', () => {

            // Get photographers data
            const photographerInfo = {
                id: currentPhotographer.id,
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

// Now all the data of the photographer that the user has clicked on is locally stored
// use photographerInfo to get it all later (key = 'selectedPhotographer')

async function init() {
    // Return photographers data from JSON file
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();