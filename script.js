document.addEventListener('DOMContentLoaded', (event) => {
    // Check if the user is logged in
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = "./desktop.html"; // Redirect to desktop page
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.desktop-6-inner');

    function renderCartItems() {
        cartContainer.innerHTML = ''; // Clear previous items

        if (cartItems.length > 0) {
            cartItems.forEach((item, index) => {
                // Create elements for each item in the cart
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item'); // Apply cart item class or customize as needed
                itemElement.innerHTML = `
                    <div class="item-image">
                        <img src="/public/655c5234c9e86a75189fc96a-1700549172282-1@2x.png" alt="${item}">
                    </div>
                    <div class="item-details">
                        <p class="item-name">${item}</p>
                        <p class="item-price">Rs. ${getItemPrice(item)}</p>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(itemElement);
            });

            // Add event listeners for remove buttons
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const itemIndex = parseInt(e.target.dataset.index);
                    cartItems.splice(itemIndex, 1); // Remove item from cartItems array
                    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
                    renderCartItems(); // Refresh cart display
                });
            });
        } else {
            // Display empty cart message
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your Bag is Empty!! Sign in to link items to your account, or view items already in your account.';
            emptyCartMessage.classList.add('your-bag-is-empty');
            cartContainer.appendChild(emptyCartMessage);
        }
    }

    // Initial rendering of cart items
    renderCartItems();

    // Function to get item image based on item name (customize as per your image paths)
    function getItemImage(itemName) {
        switch (itemName) {
            case 'Apricot':
                return '655c5234c9e86a75189fc96a-1700549172282-1@2x';
            case 'Armani':
                return 'rectangle-45@2x';
            // Add more cases for other items as needed
            case 'gucci':
                return 'rectangle-74@2x';
            default:
                return 'default-image'; // Replace with default image path
        }
    }

    // Function to get item price based on item name (customize as per your pricing logic)
    function getItemPrice(itemName) {
        switch (itemName) {
            case 'Apricot':
                return '599'; // Example price for Apricot
            case 'Armani':
                return '1299'; // Example price for Armani
            // Add more cases for other items as needed
            case 'gucci':
                return '799';
            default:
                return '0'; // Replace with default price
        }
    }

    // Continue Shopping button logic (assuming you have this in your HTML)
    const continueShoppingButton = document.getElementById("cONTINUESHOPPINGText");
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener("click", function(e) {
            if (localStorage.getItem('loggedIn')) {
                window.location.href = "./after_login.html"; // Redirect to after login page
            } else {
                window.location.href = "./desktop.html"; // Redirect to desktop page
            }
        });
    }
});
