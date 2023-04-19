//Trigger the slide up to show the main content
document.addEventListener("DOMContentLoaded", function (event) {
  let button = document.querySelector(".btn");
  let cover = document.querySelector(".cover");
  button.addEventListener("click", function () {
    cover.classList.add("slideUp");
  });
});



// Fetch the product data from the JSON file
fetch('./js/data.json')
  // Parse the response as JSON
  .then(response => response.json())
  // Once the data is retrieved, loop through each product
  .then(products => {
    // Categorize the products based on their IDs
    const loungeProducts = products.filter(product => product.id >= 1 && product.id <= 10);
    const diningProducts = products.filter(product => product.id >= 11 && product.id <= 20);
    const studyProducts = products.filter(product => product.id >= 21 && product.id <= 30);

    // Select all the card elements
    const cards = document.querySelectorAll('.card');

    // Create an empty cart array
    let cartArray = [];






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
      const title = document.createElement('h2');
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
          image: product.image
        });
        console.log(`Added ${product.name} to cartArray`, cartArray);

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
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                     </div>`;


          cartItemDiv.innerHTML = cartItemHTML;
          cartItemsDiv.appendChild(cartItemDiv);



        }
        // Get all the cart quantity input elements
        const quantityInputs = document.querySelectorAll(".cart-quantity-input");

        // Add an event listener to each input element
        quantityInputs.forEach(function (input) {
          input.addEventListener("change", function () {
            // If the input value is 0 or negative, change it to 1
            if (this.value <= 0) {
              this.value = 1;
            }
          });
        });

        let removeCartItemButtons = document.getElementsByClassName('btn-danger')
        for (let i = 0; i < removeCartItemButtons.length; i++) {
          let button = removeCartItemButtons[i]
          button.addEventListener('click', function (event) {
            let buttonClicked = event.target
            let itemToRemoveIndex = i
            buttonClicked.parentElement.parentElement.remove()
            // Remove the item from the cartArray
            cartArray.splice(itemToRemoveIndex, 1)
            updateCartTotal()
          })
        }
      });
    }
  });




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

