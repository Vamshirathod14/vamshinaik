 // Array to hold furniture items
 let furnitureItems = [];

 // Function to load furniture items from localStorage
 function loadFurniture() {
     const storedItems = localStorage.getItem('furnitureItems');
     if (storedItems) {
         furnitureItems = JSON.parse(storedItems);
         displayFurniture();
     }
 }
 
 // Function to save furniture items to localStorage
 function saveFurniture() {
     localStorage.setItem('furnitureItems', JSON.stringify(furnitureItems));
 }
 
 // Function to display furniture items
 function displayFurniture() {
     const gridContainer = document.getElementById('furniture-grid');
     gridContainer.innerHTML = ''; // Clear existing items
 
     furnitureItems.forEach((item, index) => {
         const gridItem = document.createElement('div');
         gridItem.className = 'grid-item';
         gridItem.innerHTML = `
             <h2>${item.name}</h2>
             <p>Description: ${item.description}</p>
             ${Array.isArray(item.images) ? item.images.map(image => `<img src="${image}" alt="${item.name}" style="width:100%;">`).join('') : ''}
             <button class="remove-button" data-index="${index}">Remove</button>
         `;
         gridContainer.appendChild(gridItem);
     });
 
     // Add event listeners to remove buttons
     const removeButtons = document.querySelectorAll('.remove-button');
     removeButtons.forEach(button => {
         button.addEventListener('click', function() {
             const index = this.getAttribute('data-index');
             removeFurniture(index);
         });
     });
 }
 
 // Function to remove furniture item
 function removeFurniture(index) {
     furnitureItems.splice(index, 1); // Remove item from array
     saveFurniture(); // Save updated items to localStorage
     displayFurniture(); // Refresh the display
 }
 
 // Event listener for the login form submission
 document.getElementById('login-form').addEventListener('submit', function(event) {
     event.preventDefault();
     const password = document.getElementById('password').value;
 
     // Check if the password is correct
     if (password === '12345') {
         document.getElementById('login-container').style.display = 'none';
         document.getElementById('add-furniture-container').style.display = 'block';
         loadFurniture(); // Load existing furniture items
     } else {
         alert('Incorrect password. Please try again.');
     }
 });
 
 // Event listener for the furniture form submission
 document.getElementById('furniture-form').addEventListener('submit', function(event) {
     event.preventDefault();
     const name = document.getElementById('name').value;
     const description = document.getElementById('description').value;
     const images = document.getElementById('image').files; // Get all selected files
 
     const imagePromises = Array.from(images).map(imageFile => {
         return new Promise((resolve) => {
             const reader = new FileReader();
             reader.onloadend = function() {
                 resolve(reader.result); // Resolve with the base64 string of the image
             };
             reader.readAsDataURL(imageFile); // Convert image to base64
         });
     });
 
     Promise.all(imagePromises).then((base64Images) => {
         const newItem = {
             name: name,
             description: description,
             images: base64Images // Store all base64 strings of images
         };
         furnitureItems.push(newItem);
         saveFurniture(); // Save updated items to localStorage
         alert('Furniture added successfully!');
         document.getElementById('furniture-form').reset(); // Reset the form
         displayFurniture(); // Refresh the display
     });
 });
 
 // Load furniture items when the page loads
 loadFurniture();