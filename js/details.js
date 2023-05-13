// get the item from storage if it's exist
let productData = window.localStorage.getItem('product-data');

if (productData !== '') {
    let dataToUse = JSON.parse(productData);
    // change photo
    let photo = document.querySelector('.details .container .photo img');
    photo.src = dataToUse.photoSrc;
    // cahnge title
    let title = document.querySelector('.details .container .txt h1');
    title.innerHTML = dataToUse.title;
    // change descrip.
    let descrip = document.querySelector('.details .container .txt .discreption');
    descrip.innerHTML = dataToUse.description;
    // change price
    let price = document.querySelector('.details .container .txt .price .num');
    price.innerHTML = dataToUse.price;
}


//functionalty to see product button
let btns = document.querySelectorAll('.also .container .cards .mini-card button');

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        window.location.href = '../all.html';
    })
});

// pieces number
let add = document.getElementById('add');
let sub = document.getElementById('sub');
let piecesNum = document.querySelector('.details .container .txt .pieces .number');
let price = document.querySelector('.details .container .txt .price .num');
let empty = price.innerHTML;

add.addEventListener('click', () => {
    // increase pieces number
    piecesNum.innerHTML++;
    // modify price
    price.innerHTML = +piecesNum.innerHTML * +empty;
});


sub.addEventListener('click', () => {
    // decrease pieces number
    if (piecesNum.innerHTML >= 2) {
        piecesNum.innerHTML--;
    }
    // modify price
    price.innerHTML = +piecesNum.innerHTML * +empty;
})