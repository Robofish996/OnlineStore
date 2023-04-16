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

    console.log("loungeProducts:", loungeProducts);
    console.log("diningProducts:", diningProducts);
    console.log("studyProducts:", studyProducts);

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
      button.textContent = 'Add to Cart';
      button.addEventListener('click', function() {
        // Here you can add code to add the product to the cart
        console.log(`Added ${product.name} to cart`);
      });
      card.appendChild(button);
    }
  });
