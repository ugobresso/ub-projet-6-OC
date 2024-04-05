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
