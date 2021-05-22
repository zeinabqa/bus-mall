'use strict'

var leftIndex = 0;
var centerIndex = 0;
var rightIndex = 0;
var votesNum = 0;
var veiwNum = 0;
var totalVotes = 25;
var votesChart = [];
var viewsChart = [];
var  lastShown = [];

const images = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb',
  'water-can',
  'wine-glass',
];

const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const centerImage = document.getElementById('centerImage');
const rightImage = document.getElementById('rightImage');

function product(name) {
  this.name = name;
  this.path = `./assets/${name}.jpg`;
  this.votes = 0;
  this.views = 0,
    product.all.push(this);

}
product.all = [];
displayData();

// Add local storage
function addLocal() {
  let data = JSON.stringify(product.all);
  localStorage.setItem('product', data);
  console.log(data);
}
// local function
function displayData() {
  let mallData = localStorage.getItem('product');
  let storedData = JSON.parse(mallData);
  if (storedData !==null) {
    product.all = storedData;
    //console.log('Loaded from Local Storage');
    return;
  }

}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < images.length; i++) {
  new product(images[i]);
}

function render() {
  lastShown[0] = leftIndex;
  lastShown[1] = centerIndex;
  lastShown[2] = rightIndex;

  while (
    leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex || lastShown.includes(leftIndex) || lastShown.includes(rightIndex) || lastShown.includes(centerIndex)
  ) {

    leftIndex = randomNumber(0, images.length - 1);
    centerIndex = randomNumber(0, images.length - 1);
    rightIndex = randomNumber(0, images.length - 1);
  }
  // function rendur() {
  // console.log(leftIndex);
  // console.log(centerIndex);

  // console.log(rightIndex);

  if (leftIndex === centerIndex || leftIndex === rightIndex || centerIndex === rightIndex) {
    rendur();
  }
  else {
    leftImage.src = product.all[leftIndex].path;
    leftImage.alt = product.all[leftIndex].name;
    leftImage.title = product.all[leftIndex].name;
    product.all[leftIndex].views++;
    // console.log(leftIndex);
    rightImage.src = product.all[rightIndex].path;
    rightImage.alt = product.all[rightIndex].name;
    rightImage.title = product.all[rightIndex].name;
    product.all[rightIndex].views++;
    // console.log(rightIndex);
    centerImage.src = product.all[centerIndex].path;
    centerImage.alt = product.all[centerIndex].name;
    centerImage.title = product.all[centerIndex].name;
    product.all[centerIndex].views++;
    // console.log(centerIndex);
  }
}
imageSection.addEventListener('click', voteClick);

function voteClick(event) {
  if (votesNum < totalVotes) {
    if (event.target.id !== 'imageSection') {
      if (event.target.id === leftImage.id) {
        product.all[leftIndex].votes++;
      } else if (event.target.id === centerImage.id) {
        product.all[centerIndex].votes++;
      } else {
        product.all[rightIndex].votes++;
      }
    } votesNum++;
    render();
  }
  else {
    imageSection.addEventListener('click', voteClick);
  }
}



// function veiwClick(event) {
//   if (veiwNum < totalVotes) {
//     if (event.target.id !== 'imageSection') {
//       if (event.target.id === leftImage.id) {
//         product.all[leftIndex].views++;
//       } else if (event.target.id === centerImage.id) {
//         product.all[centerIndex].views++;
//       } else {
//         product.all[rightIndex].views++;
//       }
//     }
//     veiwNum++;
//     viewsChart.push(Mall.all[i].views);
//     rendur();
//   }
//   else {
//     imageSection.addEventListener('click', voteClick, veiwClick);
//   }
// }

// render();

var result = document.getElementById('result');
var productItem = document.getElementById('productItem');
result.addEventListener('click', displayProductItem);
function displayProductItem(event) {

  addLocal();
  var h3El = document.createElement('h3');
  productList.appendChild(h3El);
  h3El.textContent = 'ProductItem';

  const ulEl = document.createElement('ul');
  productItem.appendChild(ulEl);

  for (let i = 0; i < images.length; i++) {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${product.all[i].name} had ${product.all[i].votes} votes, and was seen ${product.all[i].views} times.`;
    votesChart.push(product.all[i].votes)
    viewsChart.push(product.all[i].views)
  }

  
  
  
  chartRender();
  result.removeEventListener('click', displayProducItem);
}

render();
function chartRender() {


  let ctx = document.getElementById('myChart').getContext('2d');

  // eslint-disable-next-line no-unused-vars
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: images,
      datasets: [{
        label: 'Votes Chart',
        backgroundColor: 'white',
        borderColor: 'rgb(255, 99, 132)',
        data: votesChart
      },
      {
        label: 'Views Chart',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: viewsChart
      }]
    },

    // Configuration options go here
    options: {}
  });
}