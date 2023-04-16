//Trigger the slide up to show the main content
document.addEventListener("DOMContentLoaded", function (event) {
  let button = document.querySelector(".btn");
  let cover = document.querySelector(".cover");
  button.addEventListener("click", function () {
      cover.classList.add("slideUp");
  });
});

// Select the element where the product items will be appended
const productList = document.querySelector(".product-list");

// Fetch the product data from the JSON file
fetch('./js/data.json')
  // Parse the response as JSON
  .then(response => response.json())
  // Once the data is retrieved, loop through each product
  .then(products => {
    products.forEach(product => {
      // Create a div element to hold each product
      const productItem = document.createElement("div");
      // Add the "product-item" and "card" classes to the product div
      productItem.classList.add("product-item", "card");

      // Set the HTML content of the product div with the product data
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="card-img-top">
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-text">${product.description}</p>
          <span class="card-price">$${product.price}</span>
          <button class="btn btn-primary">Add to Cart</button>
        </div>
      `;

      // Append the product div to the product list
      productList.appendChild(productItem);
    });
  });
