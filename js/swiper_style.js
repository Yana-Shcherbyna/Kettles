let wrapper = document.querySelector('.wrapper');

// Settings for the slider
let pageSlider = new Swiper ('.page',{
    // my Classes
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",
    direction: 'vertical',
    slidesPerView: 'auto',
    parallax: true,

    keyboard: {
        enabled: true,
        onlyInViewPort: true,
        pageUpDown: true,
    },

    mousewheel: {
        sensitivity: 1,
    },

    // disabling the functionality if there are fewer slides than needed
    watchOverflow: true,
    
    speed: 800,

    // updating slider 
    observer: true,    
    observeParents: true,
    observeSlideChildren: true,

    // Navigation
    pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: 'page__bullet_active',
    },

    // Scroll
    scrollbar: {
        el: '.page__scroll',
        dragClass: "page__drag-scroll",
        draggable: true,
    },

    // Disable initialization
    init: false,

    // Events
    on: {
        // Event initialization
        init: function() {
            // changing slides with color change bg navigation menu (small teapots)
            menuSlider ();
            // turn on/off free mode (with content height check)
            setScrollType ();
            // starting animations in the _loaded class
            wrapper.classList.add('_loaded');
            // changing the scrolling of the slider depending on the size of the window
            showHorizontalVerticalSliderDirection();            
        },

        // Slide change event
        slideChange: function() {
            // bg color change when changing slide
            menuSliderRemove ();
            menuKettles.forEach(function(el){
                el.children[pageSlider.realIndex].classList.add('_active');
            })
        },
        
        //when changing the browser window, check the height of the content and turn on/off free mode
        resize: function () {
            setScrollType ();
             // changing the scrolling of the slider depending on the size of the window
             showHorizontalVerticalSliderDirection();
        },     

    },
})

// Changing bg on the navigation menu (small teapots)
let menuKettles = document.querySelectorAll('.screen__kettles')
Array.from(menuKettles)

function menuSlider (){

    menuKettles.forEach(function(el){
        el.children[pageSlider.realIndex].classList.add('_active');
        
            for (let i = 0; i < el.children.length; i++) {
                let menuKettlesItem = el.children[i];

                menuKettlesItem.addEventListener('click', function(e){
                    menuSliderRemove ();
                    pageSlider.slideTo(i, 800);
                    menuKettlesItem.classList.add('_active');
                    e.preventDefault();
                })                
            }
    })
}

function menuSliderRemove (){
    let menuKettlesItemActive = document.querySelectorAll('.screen__kettlesItem._active');
    if (menuKettlesItemActive) {
        menuKettlesItemActive.forEach(function(e){
            e.classList.remove('_active');
        })
    }
}

// for normal Scroll without Bullets
function setScrollType (){
    // check whether the wrapper has the _free class
    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        // turn off the free mode in the slider
        pageSlider.params.freeMode = false;
    }
    for (let i = 0; i < pageSlider.slides.length; i++) {
        const pageSlide = pageSlider.slides[i];
        // search content whith screen__content class
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        
        if (pageSlideContent) {
            // measure the height of the content
            const PageContentHight = pageSlideContent.offsetHeight;
            
            if (PageContentHight > window.innerHeight) {
                // clean Bullets
                wrapper.classList.add('_free');
                // turn on the free mode in the slider
                pageSlider.params.freeMode = true;
                // if content is larger than the height of the browser window, we break the cycle
                break;
            }
        }
    }
}

// changing the scrolling (vertical/horizontal) of the slider depending on the size of the window
function showHorizontalVerticalSliderDirection(){
    if (window.innerWidth > 300 && window.innerWidth < 900) {
        pageSlider.changeDirection('horizontal', true);
    } else {
        pageSlider.changeDirection('vertical', true);
    }
}

// turn on initialization (manually) for the correct slider works
pageSlider.init();
