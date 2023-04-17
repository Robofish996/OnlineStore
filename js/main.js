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
      button.classList.add('add-to-cart'); // Add the class "add-to-cart"
      button.setAttribute('data-name', product.name); // Add data attribute for the product name
      button.setAttribute('data-price', product.price.toFixed(2)); // Add data attribute for the product price
      button.textContent = "Add to Cart"; // Add text to the button
      card.appendChild(button);
    }
  });
 // Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 


if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded' , ready)
}else{
  ready()
}


function ready(){
  //Adding functionality to buttons
let removeCartItemButtons = document.getElementsByClassName('btn-danger')
console.log(removeCartItemButtons)

for(let i = 0; i < removeCartItemButtons.length; i++){
  let button = removeCartItemButtons[i]
  button.addEventListener('click', removeCartItem)
}
//Adding Function for increasing Quantity Items
let quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(let i = 0; i < quantityInputs.length; i++){
  let input = quantityInputs[i]
  input.addEventListener('change', quantityChanged )
}

function quantityChanged(event){
  let input = event.target
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartTotal()
}
}

function removeCartItem(event){
  let buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}



//Adding function for updating  prices
function updateCartTotal(){
let cartItemContainer = document.getElementsByClassName('cart-items')[0]
let cartRows = cartItemContainer.getElementsByClassName('cart-row')
let total = 0
for(let i = 0; i < cartRows.length; i++){
  let cartRow = cartRows[i]
  let priceElement = cartRow.getElementsByClassName('cart-price')[0]
  let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
  let price = parseFloat(priceElement.innerText.replace('$',''))
  let quantity = quantityElement.value
  total = total + (price * quantity) 
}
total = Math.round(total * 100) / 100
document.getElementsByClassName('cart-total-price')[0].innerText = 'R' + total;



}