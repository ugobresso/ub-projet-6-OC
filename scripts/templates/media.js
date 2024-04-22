// Event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Get photographer data stored in the localStorage
    const photographerInfo = JSON.parse(localStorage.getItem('selectedPhotographer'));

    // Check if the data exists
    if (photographerInfo) {
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
            
            // Display media data
            await displayMediaData(filteredMedia);
            
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.error('No photographer data found in the local storage.');
    }
});

// Media template function
function mediaTemplate(data, filteredMedia) {
    const { title, image, video, likes } = data;

    // Gallery grid creation
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
            openMediaInFullscreen(`/assets/images/${image}`, data, filteredMedia);
        });
    } else if (video) {
        mediaElement = document.createElement('video');
        mediaElement.src = `/assets/images/${video}`;
        mediaElement.alt = title;
        mediaElement.controls = true; // Adding lecture controls to the video
        mediaElement.addEventListener('click', () => {
            openMediaInFullscreen(`/assets/images/${video}`, data, filteredMedia);
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

// Function to open media in fullscreen
function openMediaInFullscreen(mediaURL, mediaIndex, filteredMedia) {
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

    const closeButton = createAndHandleCloseButton(fullscreenContainer)  
    fullscreenContainer.appendChild(closeButton);

    // Create the next & previous buttons
    const previousButton = document.createElement('button');
    previousButton.textContent = 'Précédent';
    previousButton.addEventListener('click', () => changeImage(-1, filteredMedia, mediaURL));
    previousButton.classList.add('previous-button');
    fullscreenContainer.appendChild(previousButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Suivant';
    nextButton.addEventListener('click', () => changeImage(1, filteredMedia, mediaIndex));
    nextButton.classList.add('next-button');
    fullscreenContainer.appendChild(nextButton);

    fullscreenContainer.appendChild(fullscreenMedia);

    // Ajouter des écouteurs d'événements pour les boutons Précédent et Suivant
    previousButton.addEventListener('click', () => {
        changeImage(-1);
    });

    nextButton.addEventListener('click', () => {
        changeImage(1);
    });


    // Add the fullscreen container to the body
    document.body.appendChild(fullscreenContainer);
}

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

    return closeButton
}

// Function to change the displayed image
function changeImage(n, filteredMedia, mediaURL) {
    // Find the index of the current media in the filteredMedia array
    const currentIndex = filteredMedia.findIndex(img => img.src === mediaURL);
    
    // Calculate the index of the next media
    let nextIndex = currentIndex + n;
    if (nextIndex >= filteredMedia.length) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = filteredMedia.length - 1;
    }
    
    // Update the source of the fullscreen media with the next media URL
    const fullscreenMedia = document.querySelector('.fullscreen-media');
    fullscreenMedia.src = filteredMedia[nextIndex].src;
}


// Define displayMediaData function
async function displayMediaData(media) {
    const gallerySection = document.querySelector('.photograph-gallery');

    // Clear gallery section
    gallerySection.innerHTML = '';

    // Display media
    media.forEach(currentMedia => {
        const mediaModel = mediaTemplate(currentMedia, media);
        gallerySection.appendChild(mediaModel);
    });
}
