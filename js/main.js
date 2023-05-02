const cartArray = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cartArray)


// Fetch the product data from the JSON file
fetch('../js/data.json')
    // Parse the response as JSON
    .then(response => response.json())
    // Once the data is retrieved, loop through each product
    .then(products => {
        // Categorize the products based on their IDs
        const loungeProducts = products.filter(product => product.id >= 1 && product.id <= 10);
        const diningProducts = products.filter(product => product.id >= 11 && product.id <= 20);
        const studyProducts = products.filter(product => product.id >= 21 && product.id <= 30);

        console.log(loungeProducts);
        console.log(diningProducts);
        console.log(studyProducts);


        // Select all the card elements
        const cards = document.querySelectorAll('.card');
        // Loop through each card element and populate it with product data
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            // Find the corresponding product for this card
            let product;
            if (i < loungeProducts.length) {
                product = loungeProducts[i];
            } else if (i < loungeProducts.length + diningProducts.length) {
                product = diningProducts[i - loungeProducts.length];
            } else {
                product = studyProducts[i - loungeProducts.length - diningProducts.length];
            }
            // Set the card image
            const img = document.createElement('img');
            img.src = product.image;
            card.appendChild(img);
            // Set the card title
            const title = document.createElement('h3');
            title.textContent = product.name;
            card.appendChild(title);

            // Set the card description
            const desc = document.createElement('p');
            desc.textContent = product.description;
            card.appendChild(desc);

            // Set the card price
            const price = document.createElement('p');
            price.textContent = `R${product.price.toFixed(2)}`;
            card.appendChild(price);
            // Add an "Add to Cart" button
            const button = document.createElement('button');
            button.classList.add('add-to-cart'); // Add the class "add-to-cart"
            button.setAttribute('data-name', product.name); // Add data attribute for the product name
            button.setAttribute('data-price', product.price.toFixed(2)); // Add data attribute for the product price
            button.textContent = "Add to Cart"; // Add text to the button
            card.appendChild(button);


            // Add event listener to the "Add to Cart" button
            button.addEventListener("click", function () {
                // Add the selected product to the cart array
                cartArray.push({
                    name: product.name,
                    price: product.price.toFixed(2),
                    image: product.image,
                    quantity: 1 // Initialize quantity to 1
                });
                console.log(`Added ${product.name} to cartArray`, cartArray);
                // Save cartArray to local storage
                localStorage.setItem('cart', JSON.stringify(cartArray));


                // Dynamically populate the cartItems div with the items in the cart array
                const cartItemsDiv = document.querySelector(".cartItems");
                cartItemsDiv.innerHTML = "";
                for (let i = 0; i < cartArray.length; i++) {
                    const cartItem = cartArray[i];
                    const cartItemDiv = document.createElement("div");
                    cartItemDiv.classList.add("cart-row");

                    const cartItemHTML = `
              <div class="cart-item cart-column">
                 <img class="cart-item-image" src="${cartItem.image}" width="100" height="100">
                  <span class="cart-item-title">${cartItem.name}</span>
                  <span class="close"></span>
                </div>
                  <span class="cart-price cart-column">R${cartItem.price}</span>
                    <div class="cart-quantity cart-column">
                    <span class="cart-quantity-input" type="number">${cartItem.quantity}</span>
                      
                      <button class="btn btn-danger" type="button">REMOVE</button>
                       </div>`;


                    cartItemDiv.innerHTML = cartItemHTML;
                    cartItemsDiv.appendChild(cartItemDiv);


                }

                // Recalculate the total cart price
                cartTotal = 0;
                cartArray.forEach(function (item) {
                    cartTotal += parseFloat(item.price) * parseInt(item.quantity);
                });
                console.log("Cart Total:", cartTotal);

                // Display the total cart price in the span element with class "cart-total-price"
                const cartTotalPriceSpan = document.querySelector(".cart-total-price");
                cartTotalPriceSpan.textContent = "R" + cartTotal.toFixed(2);
                localStorage.setItem('cart', JSON.stringify(cartArray));




                // Update the total price initially
                let totalPrice = 0
                for (let i = 0; i < cartArray.length; i++) {
                    totalPrice += cartArray[i].price * cartArray[i].quantity
                }
                document.querySelector(".cart-total-price").innerHTML = `R${totalPrice}`

                // Get the "REMOVE" buttons and add a click event listener to each
                let removeCartItemButtons = document.getElementsByClassName('btn-danger')
                for (let i = 0; i < removeCartItemButtons.length; i++) {
                    let button = removeCartItemButtons[i]
                    button.addEventListener('click', function (event) {
                        let buttonClicked = event.target
                        let itemToRemoveIndex = i
                        buttonClicked.parentElement.parentElement.remove()
                        // Remove the item from the cartArray
                        cartArray.splice(itemToRemoveIndex, 1)
                        // Update the total price
                        let totalPrice = 0
                        for (let i = 0; i < cartArray.length; i++) {
                            totalPrice += cartArray[i].price * cartArray[i].quantity
                        }
                        document.querySelector(".cart-total-price").innerHTML = `R${totalPrice}`
                        localStorage.setItem('cart', JSON.stringify(cartArray));
                    })



                }

            })
        }

        // Initialize cartTotal variable
        let cartTotal = 0;
        console.log(cartTotal);

        function renderCart() {
            // Dynamically populate the cartItems div with the items in the cart array
            const cartItemsDiv = document.querySelector(".cartItems");
            cartItemsDiv.innerHTML = "";
            for (let i = 0; i < cartArray.length; i++) {
                const cartItem = cartArray[i];
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-row");

                const cartItemHTML = `
              <div class="cart-item cart-column">
                 <img class="cart-item-image" src="${cartItem.image}" width="100" height="100">
                  <span class="cart-item-title">${cartItem.name}</span>
                  <span class="close"></span>
                </div>
                  <span class="cart-price cart-column">R${cartItem.price}</span>
                    <div class="cart-quantity cart-column">
                    <span class="cart-quantity-input" type="number">${cartItem.quantity}</span>
                      
                      <button class="btn btn-danger" type="button">REMOVE</button>
                       </div>`;


                cartItemDiv.innerHTML = cartItemHTML;
                cartItemsDiv.appendChild(cartItemDiv);

            }
            // Recalculate the total cart price
            cartTotal = 0;
            cartArray.forEach(function (item) {
                cartTotal += parseFloat(item.price) * parseInt(item.quantity);
            });
            console.log("Cart Total:", cartTotal);

            // Display the total cart price in the span element with class "cart-total-price"
            const cartTotalPriceSpan = document.querySelector(".cart-total-price");
            cartTotalPriceSpan.textContent = "R" + cartTotal.toFixed(2);
            localStorage.setItem('cart', JSON.stringify(cartArray));


            // Get the "REMOVE" buttons and add a click event listener to each
            let removeCartItemButtons = document.getElementsByClassName('btn-danger')
            for (let i = 0; i < removeCartItemButtons.length; i++) {
                let button = removeCartItemButtons[i]
                button.addEventListener('click', function (event) {
                    let buttonClicked = event.target
                    let itemToRemoveIndex = i
                    buttonClicked.parentElement.parentElement.remove()
                    // Remove the item from the cartArray
                    cartArray.splice(itemToRemoveIndex, 1)
                    // Update the total price
                    let totalPrice = 0
                    for (let i = 0; i < cartArray.length; i++) {
                        totalPrice += cartArray[i].price * cartArray[i].quantity
                    }
                    document.querySelector(".cart-total-price").innerHTML = `R${totalPrice}`
                    localStorage.setItem('cart', JSON.stringify(cartArray));

                })



            }

        }

        // Call the function on page load
        window.onload = renderCart;


        // Get the "btn-purchase" button and add a click event listener
        let purchaseButton = document.querySelector('.btn-purchase');

        if (purchaseButton) {
            console.log("found");
            purchaseButton.addEventListener('click', function () {
                // Add a alert to simulate purchase 
                alert("Thank you for your purchase!!")
                location.reload();
                // Remove all items from the cartArray
                const cartArray = [];
                
                // Update the total price
                let totalPrice = 0;
                document.querySelector(".cart-total-price").innerHTML = `R${totalPrice}`;
                localStorage.setItem('cart', JSON.stringify(cartArray));
            });
        }













        // Get the modal
        let modal = document.getElementById("myModal");


        // Get the button that opens the modal
        let btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    })
