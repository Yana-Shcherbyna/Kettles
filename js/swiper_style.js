let wrapper = document.querySelector('.wrapper');

// Настройки для слайдера
let pageSlider = new Swiper ('.page',{
    // свої класи
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",
    // вертикальний слайдер
    direction: 'vertical',
    // кіл-ть слайдів
    slidesPerView: 'auto',
    // паралакс ефект
    parallax: true,


    // керування клавіатурою
    keyboard: {
        // вкл./викл.
        enabled: true,
        // вкл./викл. тільки коли слайдер в межах вьюпорта
        onlyInViewPort: true,
        // вкл./викл. керування клавішами pageUp|pageDown
        pageUpDown: true,
    },

    // керуванням мишею
    mousewheel: {
        // чутливість колеса миші
        sensitivity: 1,
        // клас об"єкта на якому зпрацьовує колесо миші
        // eventsTarget: ".image-slider"
    },

    // відключення функціоналу, якщо слайдів менше ніж потрібно
    watchOverflow: true,

    // швидкість
    speed: 800,

    // оновити свайпер 
    // при зміні елементів слайдера
    observer: true,

    // при зміні батьківськтих елементів слайдера
    observeParents: true,

    // при зміні дочірніх елементів слайдера
    observeSlideChildren: true,

    // Навігація
    // Буллети, поточний стан, прогресбар
    pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: 'page__bullet_active',
    },

    // Скролл
    scrollbar: {
        el: '.page__scroll',
        dragClass: "page__drag-scroll",
        draggable: true,
    },

    // Потрібно вимкнути ініціалізацію для коректної роботи слайдера
    init: false,

    // Подія
    on: {
        // подія ініціалізації
        init: function() {
            // зміна слайдів зі зміною кольору bg меню навігації (мал.чайники)
            menuSlider ();
            // ввімк/вимк вільний режим (з перевіркою висоти контенту)
            setScrollType ();
            // запуск анімацій по класу _loaded при ініціалізації
            wrapper.classList.add('_loaded');
            // зміна прокрутки слайдера в залежності від розміру вікна
            showHorizontalVerticalSliderDirection();            
        },

        // подія зміни слайду
        slideChange: function() {
            // зміна кольору bg при зміні слайду
            menuSliderRemove ();
            menuKettles.forEach(function(el){
                el.children[pageSlider.realIndex].classList.add('_active');
            })
        },
        
        // при зміні вікна браузера перевірка висоти контенту та ввімк/вимк вільний режим
        resize: function () {
            setScrollType ();
             // зміна прокрутки слайдера в залежності від розміру вікна
             showHorizontalVerticalSliderDirection();
        },     

    },
})

// Зміна bg на меню навігації (мал.чайники)
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

// для звичайного Скроллу без Булітів
function setScrollType (){
    // перевіряємо чи є у wrapper клас _free
    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        // вимикаємо вільний режим в слайдера
        pageSlider.params.freeMode = false;
    }
    for (let i = 0; i < pageSlider.slides.length; i++) {
        const pageSlide = pageSlider.slides[i];
        // шукаємо контент з класом screen__content
        const pageSlideContent = pageSlide.querySelector('.screen__content');
        // 
        if (pageSlideContent) {
            // вимірюємо висоту контенту 
            const PageContentHight = pageSlideContent.offsetHeight;
            // якщо висота контенту > за висоту вікна браузера
            if (PageContentHight > window.innerHeight) {
                // прибираємо Булітли
                wrapper.classList.add('_free');
                // вмикаємо вільний режим в слайдера
                pageSlider.params.freeMode = true;
                // якщо хоч один контент більший за висоту вікнв браузера, перериваємо цикл
                break;
            }
        }
    }
}

// зміна прокрутки (вертикально/горизонтально) слайдера в залежності від розміру вікна
function showHorizontalVerticalSliderDirection(){
    if (window.innerWidth > 300 && window.innerWidth < 900) {
        pageSlider.changeDirection('horizontal', true);
    } else {
        pageSlider.changeDirection('vertical', true);
    }
}

// Потрібно ввімкнути ініціалізацію (вручну) для коректної роботи слайдера
pageSlider.init();