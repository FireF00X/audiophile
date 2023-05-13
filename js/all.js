let cardTemp = document.querySelector('.prodcut-card-template');
let cardContainer = document.querySelector(".product-cards .container .products");

async function fetchData() {

    const respons = await fetch('/data.json');
    const data = await respons.json();
    const productArr = Array.from(data.products);
    // show products
    productArr.forEach((prodcut) => {
        templateCard(prodcut);
    });
    //filter prodcuts
    window.addEventListener('click', (e) => {
        let btn = e.target;
        catBtn(btn, productArr);
    });
}

fetchData();

// Select all the product category buttons
let btns = document.querySelectorAll('.product-cards .container .cat li');

// Loop through each button and attach a click event listener
[...btns].forEach((btn) => {
    btn.addEventListener('click', (e) => {

        // Remove the 'active' class from all buttons
        [...btns].forEach((btn) => {
            btn.classList.remove('active');
        });

        // Add the 'active' class to the clicked button
        e.target.classList.add('active');
    });
});


// fetch('../data.json')
//     .then((res) => res.json())
//     .then(data => {
//         const productArr = Array.from(data.products);
//         // show products
//         productArr.forEach((prodcut) => {
//             templateCard(prodcut);
//         })
//         //filter prodcuts
//         window.addEventListener('click', (e) => {
//             let btn = e.target;
//             catBtn(btn, productArr);
//         });
//     });

//function to deal with the template card
function templateCard(data) {
    let cardTemplate = document.createElement('div');
    cardTemplate.classList.add('product-card');
    cardTemplate.id = data.id;
    cardTemplate.innerHTML = `
    <div class="photo">
        <img src="${data.photoSrc}" alt="">
    </div>
    <div class="txt">
        <h3 class="title">${data.title}</h3>
        <div class="discrep">${data.description}</div>
        <p class="price">$ <span class="num">${data.price}</span></p>
        <button class="add-to-cart">Add To Cart</button>
    </div>`;
    cardContainer.append(cardTemplate);


    // // select card
    // let card = cardTemp.content.cloneNode(true).children[0];
    // // select img
    // let imgSrc = card.querySelector('.product-card .photo img');
    // imgSrc.src = data.photoSrc;
    // // select title
    // let cardTitle = card.querySelector('.product-card .title');
    // cardTitle.textContent = data.title;
    // // select description
    // let cardDescription = card.querySelector('.product-card .discrep');
    // cardDescription.textContent = data.description;
    // // select price
    // let cardPrice = card.querySelector('.product-card .price .num');
    // cardPrice.innerHTML = data.price
    // // add all of that data to the page
    // cardContainer.append(card)
}

// add click event listener to the card container using event delegation
cardContainer.addEventListener('click', (e) => {
    const clickedCard = e.target.closest('.product-card');
    if (clickedCard && !e.target.classList.contains('add-to-cart')) {
        fetch('../data.json')
            .then(res => res.json())
            .then(data => {
                let arr = Array.from(data.products)
                arr.forEach((product) => {
                    if (clickedCard.id === product.id) {
                        //get the card's data
                        let obj = {
                            photoSrc: product.photoSrc,
                            title: product.title,
                            description: product.description,
                            price: product.price,
                        }
                        // add them to storage and change the page
                        window.localStorage.setItem('product-data', JSON.stringify(obj));
                        window.location.href = '../details.html';
                    }
                })
            });
    } else if (e.target.classList.contains('add-to-cart')) {
        clickedCard.classList.toggle('added')
        let notify = document.getElementById('notify');
        let added = document.querySelectorAll(".product-card.added");
        notify.innerHTML = added.length;
    }
});

// function that dealing with category buttons
function catBtn(selected, arr) {
    if (selected.classList.contains('headphone')) {
        cardContainer.innerHTML = '';
        arr.filter((prodcut) => {
            return prodcut.type === 'headphones' ? templateCard(prodcut) : null;
        })
    } else if (selected.classList.contains('speakers')) {
        cardContainer.innerHTML = '';
        arr.filter((prodcut) => {
            return prodcut.type === 'speakers' ? templateCard(prodcut) : null;
        })
    } else if (selected.classList.contains('earphone')) {
        cardContainer.innerHTML = '';
        arr.filter((prodcut) => {
            return prodcut.type === 'earphones' ? templateCard(prodcut) : null;
        })
    } else if (selected.classList.contains('all')) {
        cardContainer.innerHTML = '';
        arr.forEach((prodcut) => {
            templateCard(prodcut);
        })
    }
}
