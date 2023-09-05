// drop-down menu when clicking on the link in the header
const headerMenuLinks = document.querySelectorAll('.header__menuLink');
const subMenu = document.querySelector('.header__subMenu');

headerMenuLinks.forEach(function (e) {
   
    e.addEventListener('click', function(el) {
       this.firstElementChild.nextElementSibling.classList.toggle('hidden');
       el.stopPropagation();
    })
})

document.body.addEventListener('click', function() {
    if (!subMenu.classList.contains('hidden')) {
        subMenu.classList.toggle('hidden');
    }
})

// drop-down menu when clicking in the burger-menu in the mobile version
const menuIcon = document.querySelector('.header__mobileIcon');
const mobileMenu = document.querySelector('.mobile__menu');

menuIcon.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
})

// drop-dowm menu from header PRODUCTS
const mobileMenuProducts = document.querySelector('#products');
const mobileFromHeaderProducts = document.querySelector('.mobile__fromHeaderProduct');
const mobileFromHeaderProductsBack = mobileFromHeaderProducts.querySelector('div');

mobileMenuProducts.addEventListener('click', function() {
    toggleClassHiddenFromMobileMenu ();
});

mobileFromHeaderProductsBack.addEventListener('click', function() {
    toggleClassHiddenFromMobileMenu ();
})

function toggleClassHiddenFromMobileMenu () {
    mobileFromHeaderProducts.classList.toggle('hidden');
}

// drop-down menu from header PRODUCTS (accordion)
const mobileFromHeaderAccordionItem = document.querySelectorAll('.mobile__fromHeaderAccordionItem');
Array.from(mobileFromHeaderAccordionItem);

mobileFromHeaderAccordionItem.forEach(function(el) {
     
    el.addEventListener('click', function(e) {
        e.preventDefault();
        
        let accordionIteam = e.target;
        let accordionSubIteam = e.target.firstElementChild
                   
        accordionIteam.classList.toggle('active');
        accordionSubIteam.classList.toggle('hide');
            
        if (!accordionSubIteam.classList.contains('hide')) {           
            accordionIteam.parentElement.style.maxHeight += accordionSubIteam.scrollHeight + 'px';
        }
    })
})

