/**
 * Function : returning the media grid
 */
function mediaTemplate(data) {
    const { title, image, video, likes } = data;

    // Gallery grid  creation
    const mediaContent = document.createElement('article');
    mediaContent.classList.add('media-content');
    
    // Media container creation
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('picture-container');

    // Media creation (either image or video)
    let mediaElement;
    if (image) {
        mediaElement = document.createElement('img');
        mediaElement.src = `/assets/images/${image}`;
        mediaElement.alt = title;
    } else if (video) {
        mediaElement = document.createElement('video');
        mediaElement.src = `/assets/images/${video}`;
        mediaElement.alt = title;
        mediaElement.controls = true; // Adding lecture controls to the video
    }

    // Adding the img to its container
    mediaContainer.appendChild(mediaElement);

    // Text group creation
    const mediaText = document.createElement('div');
    mediaText.classList.add('media-text');

    // Title  creation
    const mediaTitle = document.createElement('p');
    mediaTitle.textContent = title;
    mediaTitle.classList.add('media-title');

    // Adding the number of likes
    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes-container');

    const likesNumber = document.createElement('p');
    likesNumber.textContent = likes;
    likesNumber.classList.add('likes-number');

    const likesIcon = document.createElement('img');
    likesIcon.src = '/assets/icons/heart.svg';
    likesIcon.alt = 'heart icon';

    likesContainer.appendChild(likesNumber);
    likesContainer.appendChild(likesIcon);
    
    mediaText.appendChild(mediaTitle);
    mediaText.appendChild(likesContainer);

    // Adding all the elements to the usercard
    mediaContent.appendChild(mediaContainer);
    mediaContent.appendChild(mediaText);
 
    return mediaContent;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Get back photographer data stored in the localStorage
    const photographerInfo = JSON.parse(localStorage.getItem('selectedPhotographer'));

    // Check if the data exists
    if (photographerInfo) {
        // Create photographer header
        const photographerHeader = document.querySelector('.photograph-header');

        // Create user card element
        const userCardElement = document.createElement('article');
        userCardElement.classList.add('user-card');

        // Create name, city-country, tagline and price elements
        const currentNameElement = document.createElement('h2');
        currentNameElement.textContent = photographerInfo.name;
        currentNameElement.classList.add('photographer-name');

        const currentCityCountryElement = document.createElement('p');
        currentCityCountryElement.textContent = photographerInfo.cityCountry;
        currentCityCountryElement.classList.add('city-country');

        const currentTaglineElement = document.createElement('p');
        currentTaglineElement.textContent = photographerInfo.tagline;
        currentTaglineElement.classList.add('tagline');

        // Add elements to the user card
        userCardElement.appendChild(currentNameElement);
        userCardElement.appendChild(currentCityCountryElement);
        userCardElement.appendChild(currentTaglineElement);

        // Add user card to photographer header
        photographerHeader.appendChild(userCardElement);

        // Create contact button
        const contactButton = document.createElement('button');
        contactButton.textContent = 'Contactez-moi';
        contactButton.classList.add('contact_button');
        contactButton.addEventListener('click', displayModal);
        photographerHeader.appendChild(contactButton);

        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        // Create image element
        const imageElement = document.createElement('img');
        imageElement.src = `/assets/photographers/${photographerInfo.portrait}`;
        imageElement.alt = photographerInfo.name;

        // Add image element to image container
        imageContainer.appendChild(imageElement);
        photographerHeader.appendChild(imageContainer);

        // Function to filter and display media data on the website
        async function displayMediaData(media) {
            const gallerySection = document.querySelector('.photograph-gallery');

            // Filter media based on current photographer ID
            const filteredMedia = media.filter(m => m.photographerId === photographerInfo.id);

            // Sort filtered media based on selected option
            const sortSelect = document.getElementById('sort-select');
            sortSelect.addEventListener('change', async () => {
                const selectedOption = sortSelect.value;
                let sortedMedia = [];
                if (selectedOption === 'likes') {
                    sortedMedia = filteredMedia.sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
                } else if (selectedOption === 'date') {
                    sortedMedia = filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (descending)
                } else if (selectedOption === 'title') {
                    sortedMedia = filteredMedia.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title (ascending)
                }

                // Clear gallery section
                gallerySection.innerHTML = '';

                // Display sorted media
                sortedMedia.forEach(currentMedia => {
                    const mediaModel = mediaTemplate(currentMedia);
                    gallerySection.appendChild(mediaModel);
                });
            });

            // Initially display media sorted by likes
            sortSelect.value = 'likes';
            const sortedMedia = filteredMedia.sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
            sortedMedia.forEach(currentMedia => {
                const mediaModel = mediaTemplate(currentMedia);
                gallerySection.appendChild(mediaModel);
            });
        }

        // Function to initialize media
        async function initMedia() {
            try {
                // Fetch media data from JSON file
                const response = await fetch('/data/photographers.json');
                if (!response.ok) {
                    throw new Error('Error loading media data');
                }
                const data = await response.json();
                const media = data.media;
        
                // Filter media for the current photographer
                const filteredMedia = media.filter(m => m.photographerId === photographerInfo.id);
        
                // Calculate total likes for the current photographer
                const totalLikes = filteredMedia.reduce((acc, curr) => acc + curr.likes, 0);
        
                // Display media data
                await displayMediaData(filteredMedia);
        
                // Find the parent element where you want to add the info rectangle
                const main = document.querySelector('main');
        
                // Create the div for the info rectangle
                const informationBox = document.createElement('div');
                informationBox.classList.add('information-box');
        
                // Add content to the infoRectangle div
                informationBox.innerHTML = `
                    <p>${totalLikes} <img src="/assets/icons/heart.svg" alt="heart icon"></p>
                    <p>${photographerInfo.price}€ / jour</p>
                `;
        
                // Add the info rectangle to the parent element
                main.appendChild(informationBox);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        


        // Call function to initialize media
        await initMedia();

    } else {
        console.error('No photographer data found in the local storage.');
    }
});
