var navBar=document.getElementById('naVBar');
var homepage=document.getElementById('home');
var customers=document.getElementById('customers');
var products=document.getElementById('products');
var shops=document.getElementById('shops');

customers.style.display='none'
products.style.display='none'
shops.style.display='none'

var btnHome=document.getElementById("homeBtn");
btnHome.addEventListener('click',function (){
    homepage.style.display='block';
    navBar.style.display='block';
    customers.style.display='none'
    products.style.display='none'
    shops.style.display='none'
});

var btnCustomers=document.getElementById("manageCustomers");
btnCustomers.addEventListener('click',function (){
    homepage.style.display='none';
    navBar.style.display='block';
    customers.style.display='block'
    products.style.display='none'
    shops.style.display='none'
});

var btnProducts=document.getElementById("manageProducts");
btnProducts.addEventListener('click',function (){
    homepage.style.display='none';
    navBar.style.display='block';
    customers.style.display='none'
    products.style.display='block'
    shops.style.display='none'
});

var btnShopping=document.getElementById("shopNow");
btnShopping.addEventListener('click',function (){
    homepage.style.display='none';
    navBar.style.display='block';
    customers.style.display='none'
    products.style.display='none'
    shops.style.display='block'

});

// ===========================================
