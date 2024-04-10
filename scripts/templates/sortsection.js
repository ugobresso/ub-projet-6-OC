// Get sort section and options
const sortSection = document.querySelector('.sort-section');
const sortSelect = document.getElementById('sort-select');
const options = sortSelect.getElementsByTagName('option');

// Add event listener to "Popularité" option for showing other options on hover
sortSelect.addEventListener('mouseover', () => {
    sortSelect.size = options.length; // Show all options
});

// Reset size attribute when mouse leaves "Popularité" option
sortSelect.addEventListener('mouseout', () => {
    sortSelect.size = 1; // Show only selected option
});

// Hide options when an option is selected
sortSelect.addEventListener('change', () => {
    sortSelect.size = 1; // Show only selected option
});