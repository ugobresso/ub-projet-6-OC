// Function to close fullscreen
function createAndHandleCloseButton(fullscreenContainer) {
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    const closeIcon = document.createElement('img');
    closeIcon.src = '/assets/icons/close.svg';
    closeIcon.alt = 'Close Icon';
    closeButton.appendChild(closeIcon);

    closeButton.addEventListener('click', () => {
        document.body.removeChild(fullscreenContainer); // Remove the fullscreen container from the body
    });

    return closeButton;
}

// Function to create previous button
function createAndHandlePreviousButton(media, mediaIndex, allMedia) {
    const previousButton = document.createElement('button');
    previousButton.classList.add('previous-button');
    const previousIcon = document.createElement('img');
    previousIcon.src = '/assets/icons/previous-icon.svg';
    previousIcon.alt = 'Previous Icon';
    previousButton.appendChild(previousIcon);

    previousButton.addEventListener('click', () => {
        // Handle previous media logic here
        const previousIndex = (mediaIndex - 1 + allMedia.length) % allMedia.length; // Calculate previous index
        const previousMedia = allMedia[previousIndex];
        if (previousMedia) {
            openMediaInFullscreen(previousMedia.url, previousIndex, allMedia);
        }
    });
    return previousButton;
}

// Function to create next button
function createAndHandleNextButton(media, mediaIndex, allMedia) {
    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    const nextIcon = document.createElement('img');
    nextIcon.src = '/assets/icons/next-icon.svg';
    nextIcon.alt = 'Next Icon';
    nextButton.appendChild(nextIcon);

    nextButton.addEventListener('click', () => {
        // Handle next media logic here
        const nextIndex = (mediaIndex + 1 + allMedia.length) % allMedia.length; // Calculate next index
        const nextMedia = allMedia[nextIndex];
        if (nextMedia) {
            openMediaInFullscreen(nextMedia.url, nextIndex, allMedia);
        }
    });
    return nextButton;
}

// Function to open media in fullscreen
function openMediaInFullscreen(mediaURL, mediaIndex, media) {
    // Determine whether the media is an image or a video
    const isVideo = mediaURL.endsWith('.mp4') || mediaURL.endsWith('.webm') || mediaURL.endsWith('.ogg');

    // Create a fullscreen image or video container
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.classList.add('fullscreen-container');

    // Create a fullscreen image or video element
    const fullscreenMedia = isVideo ? document.createElement('video') : document.createElement('img');
    fullscreenMedia.src = mediaURL;
    fullscreenMedia.alt = 'Fullscreen Media';

    // Add a class for styling the container
    if (isVideo) {
        fullscreenContainer.classList.add('fullscreen-video');
        fullscreenMedia.controls = true;
    } else {
        fullscreenContainer.classList.add('fullscreen-image');
    }

    // Add a class for CSS styling
    fullscreenMedia.classList.add('fullscreen-media');

    const closeButton = createAndHandleCloseButton(fullscreenContainer);
    fullscreenContainer.appendChild(closeButton);

    const previousButton = createAndHandlePreviousButton(media, mediaIndex, media);
    fullscreenContainer.appendChild(previousButton);

    const nextButton = createAndHandleNextButton(media, mediaIndex, media);
    fullscreenContainer.appendChild(nextButton);

    fullscreenContainer.appendChild(fullscreenMedia);

    // Add the fullscreen container to the body
    document.body.appendChild(fullscreenContainer);
}

// Event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Get back photographer data stored in the localStorage
    const photographerInfo = JSON.parse(localStorage.getItem('selectedPhotographer'));

    // Check if the data exists
    if (photographerInfo) {
        // Photographer header template function
        function createPhotographerHeader(photographerInfo) {
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
        }
        
        // Media template function
        function createMediaGallery(data, media) {
            const { title, image, video, likes } = data;

            // Media content creation (one for each selected photographer's media)
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
                mediaElement.addEventListener('click', () => {
                    openMediaInFullscreen(`/assets/images/${image}`, data.index, media);
                });
            } else if (video) {
                mediaElement = document.createElement('video');
                mediaElement.src = `/assets/images/${video}`;
                mediaElement.alt = title;
                mediaElement.controls = true; // Adding lecture controls to the video
                mediaElement.addEventListener('click', () => {
                    openMediaInFullscreen(`/assets/images/${video}`, data.index, media);
                });
            }

            // Adding the img to its container
            mediaContainer.appendChild(mediaElement);

            // Text group creation
            const mediaText = document.createElement('div');
            mediaText.classList.add('media-text');

            // Title creation
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

        // Function to sort and display media data on the website
        async function sortMediaByAnOption(media) {
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
                sortedMedia.forEach((currentMedia) => {
                    const mediaModel = createMediaGallery(currentMedia, media);
                    gallerySection.appendChild(mediaModel);
                });
            });

            // Initially display media sorted by likes
            sortSelect.value = 'likes';
            const sortedMedia = filteredMedia.sort((a, b) => b.likes - a.likes); // Sort by likes (descending)
            sortedMedia.forEach((currentMedia) => {
                const mediaModel = createMediaGallery(currentMedia, media);
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

                // Calculate total number of media items
                const totalMedia = filteredMedia.length;
        
                // Display media data
                await sortMediaByAnOption(filteredMedia, totalMedia);
        
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

        // Call function to create photographer header
        createPhotographerHeader(photographerInfo);

        // Call function to initialize media
        await initMedia();

    } else {
        console.error('No photographer data found in the local storage.');
    }
});