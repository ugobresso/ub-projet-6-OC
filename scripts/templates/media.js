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
        mediaElement.controls = true; // Ajoute des contrôles de lecture à la vidéo
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