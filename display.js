 // Function to load furniture items from localStorage
 function loadFurniture() {
    const storedItems = localStorage.getItem('furnitureItems');
    if (storedItems) {
        const furnitureItems = JSON.parse(storedItems);
        displayFurniture(furnitureItems);
    }
}

// Function to display furniture items
function displayFurniture(furnitureItems) {
    const gridContainer = document.getElementById('furniture-grid');
    gridContainer.innerHTML = ''; // Clear existing items

    furnitureItems.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        // Check if item.images is an array and display images
        const imagesHtml = Array.isArray(item.images) ? 
            item.images.map(image => `<img src="${image}" alt="${item.name}" style="width:100%;">`).join('') : '';

        gridItem.innerHTML = `
            ${imagesHtml}
            <h2>${item.name}</h2>
            <p>Description: ${item.description}</p>
            <a href="https://wa.me/9014243908?text=I'm interested in ${encodeURIComponent(item.name)}. ${encodeURIComponent(item.description)}" class="contact-button" target="_blank">Contact Us</a>
        `;
        gridContainer.appendChild(gridItem);
    });
}

// Load furniture items when the page is loaded
window.onload = loadFurniture;