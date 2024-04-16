// Media template function
function mediaTemplate(data, totalMedia) {
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
            openMediaInFullscreen(`/assets/images/${image}`, data.index, totalMedia, media);
        });
    } else if (video) {
        mediaElement = document.createElement('video');
        mediaElement.src = `/assets/images/${video}`;
        mediaElement.alt = title;
        mediaElement.controls = true; // Adding lecture controls to the video
        mediaElement.addEventListener('click', () => {
            openMediaInFullscreen(`/assets/images/${video}`, data.index, totalMedia, media);
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
function openMediaInFullscreen(mediaURL, mediaIndex, totalMedia, media) {
    // Determine whether the media is an image or a video
    const isVideo = mediaURL.endsWith('.mp4') || mediaURL.endsWith('.webm') || mediaURL.endsWith('.ogg');

    // Create a fullscreen image or video container
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.classList.add('fullscreen-container');

    // Add a class for styling the container
    if (isVideo) {
        fullscreenContainer.classList.add('fullscreen-video');
    } else {
        fullscreenContainer.classList.add('fullscreen-image');
    }

    // Create a fullscreen image or video element
    const fullscreenMedia = isVideo ? document.createElement('video') : document.createElement('img');
    fullscreenMedia.src = mediaURL;
    fullscreenMedia.alt = 'Fullscreen Media';

    // Add a class for CSS styling
    fullscreenMedia.classList.add('fullscreen-media');

    // Add controls if it's a video
    if (isVideo) {
        fullscreenMedia.controls = true;
    }

    // Create a close button with the close icon
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    const closeIcon = document.createElement('img');
    closeIcon.src = '/assets/icons/close.svg';
    closeIcon.alt = 'Close Icon';
    closeButton.appendChild(closeIcon);

    closeButton.addEventListener('click', () => {
        document.body.removeChild(fullscreenContainer); // Remove the fullscreen container from the body
    });

    // Create a button for previous media
    const previousButton = document.createElement('button');
    previousButton.classList.add('previous-button');
    const previousIcon = document.createElement('img');
    previousIcon.src = '/assets/icons/previous-icon.svg';
    previousIcon.alt = 'Previous Icon';
    previousButton.appendChild(previousIcon);

    previousButton.addEventListener('click', () => {
        // Handle previous media logic here
        const previousIndex = (mediaIndex - 1 + totalMedia) % totalMedia; // Calculate previous index, considering circular navigation
        const previousMedia = media[previousIndex];
        if (previousMedia) {
            openMediaInFullscreen(previousMedia.url, previousIndex, totalMedia, media);
        }
    });

    // Create a button for next media
    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    const nextIcon = document.createElement('img');
    nextIcon.src = '/assets/icons/next-icon.svg';
    nextIcon.alt = 'Next Icon';
    nextButton.appendChild(nextIcon);

    nextButton.addEventListener('click', () => {
        // Handle next media logic here
        const nextIndex = (mediaIndex + 1) % totalMedia; // Calculate next index, considering circular navigation
        const nextMedia = media[nextIndex];
        if (nextMedia) {
            openMediaInFullscreen(nextMedia.url, nextIndex, totalMedia, media);
        }
    });

    // Add the buttons to the fullscreen container
    fullscreenContainer.appendChild(closeButton);
    fullscreenContainer.appendChild(previousButton);
    fullscreenContainer.appendChild(nextButton);

    // Add the fullscreen media to the container
    fullscreenContainer.appendChild(fullscreenMedia);

    // Add the fullscreen container to the body
    document.body.appendChild(fullscreenContainer);
}

// Define displayMediaData function
async function displayMediaData(media, totalMedia) {
    const gallerySection = document.querySelector('.photograph-gallery');

    // Clear gallery section
    gallerySection.innerHTML = '';

    // Display media
    media.forEach((currentMedia, index) => {
        const mediaModel = mediaTemplate(currentMedia, totalMedia);
        gallerySection.appendChild(mediaModel);
    });
}

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

            // Calculate total number of media items
            const totalMedia = filteredMedia.length;

            // Display media data
            await displayMediaData(filteredMedia, totalMedia);
            
            // Rest of your code...
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.error('No photographer data found in the local storage.');
    }
});
