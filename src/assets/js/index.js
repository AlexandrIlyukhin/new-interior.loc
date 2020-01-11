//import divide from './lib.js';

//import 'core-js/features/promise';
/*let divide = function(first, second = 5){
    return first / second;
}*/


import $ from 'jquery';
//import 'svgxuse';
import 'owl.carousel2';


/*window.onload = function (e) {
    let images = document.images;
    let images_total_count = images.length;
    let images_loader_count = 0;
    let preloadrer = document.getElementById('page-preloader');
    let perc_display = document.getElementById('load-perc');


    for (let i = 0; i < images_total_count; i++)
    {
        let image_clone = new Image();
        image_clone.onload = image_loaded;
        image_clone.onerror = image_loaded;
        image_clone.src = images[i].src;
    }

    function image_loaded() {
        images_loader_count++;
        perc_display.innerHTML = (((100 / images_total_count) * images_loader_count) << 0) + '%';

        if (images_loader_count >= images_total_count)
        {
            setTimeout(function () {
                if (!preloadrer.classList.contains('done'))
                {
                    preloadrer.classList.add('done');
                }
            }, 1000);
        }
    };


    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
                center: [55.90168286, 37.62851714],
                zoom: 15
            }, {
                searchControlProvider: 'yandex#search'
            }),
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
            myPlacemark = new ymaps.Placemark([55.90168286, 37.62851714], {
                    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
                    balloonContentHeader: "ТЦ Нагорное",
                    balloonContentBody: "Продажа отдельно стоящего здания. Общая площадь 1300 кв.м.",
                    balloonContentFooter: "отдел продаж: (495) 1368831",
                    hintContent: "Свой съезда на МКАД"
                },
                {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: 'assets/img/ball.png',
                    // Размеры метки.
                    iconImageSize: [48, 52],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-24, -24],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [15, 15],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayout
                }
            );
        myMap.geoObjects.add(myPlacemark);

    }

};*/


$(document).ready(function () {

    /*Выпалающее меню*/

    let $taBl = $('.nav ul li');
    /*$taBl.on('click', function () {
        let flag = $(this);
        if (flag.hasClass('item-animate')) {
            return;
        }
        $taBl.not(flag).find('.nav-2').slideUp(400);
        flag.addClass('item-animate');

        flag.find('.nav-2').slideToggle(400, function () {

            flag.removeClass('item-animate');
        });


    });*/
    $taBl.on('click', function () {
        let $navNavS = $(this).children('.nav-2');
        $navNavS.stop(true).slideToggle(400);
        $('.nav-2').not($navNavS).stop(true).slideUp(400);
        $taBl.parent().find('.nav-arrow').removeClass('arrow-border');
        $navNavS.parent().find('.nav-arrow').addClass('arrow-border');

    });

    /*Динамически появяляющаяся стрелка при наличии контента*/


    $taBl.each(function (i, elem) {
        if ($(this).children('.nav-2').hasClass('nav-2')) {

        }
        else {
            $(this).find('.nav-arrow').css('display', 'none');
        }

    });

    /*Поворот стрелки и рамки в случае активации развернутого меню*/
    let $navNav = $('.nav .nav-2');

    $navNav.on('click', function () {
        $navNav.parent().find('.nav-arrow').removeClass('arrow-border');
        $(this).parent().find('.nav-arrow').addClass('arrow-border');
    });

    /*Кнопка Гамбургер*/
    let $hamBurger = $(".hamburger");
    let $naV = $('.nav');
    $hamBurger.click(function () {
        $(this).toggleClass("hamburger-active");
        $naV.slideToggle(600)
    });

    /*Первая карусель*/
    $(".slide-one").owlCarousel({
        center: true,
        responsive: {
            0: {
                items: 1,

            },

            500: {
                items: 2,

            },
            768: {
                items: 4,

            },
            1000: {
                items: 5,


            }
        },
        items: 5,
        loop: true,
        autoplay: true,
        autoWidth: true,
        stagePadding: 50,
        margin: 100
    });

    /*Вторя Карусель МЫ КАТЮША*/
    $(".slide-two").owlCarousel({
        //center: true,
        items: 1,
        loop: true,
        autoplay: true,
        //autoplayTimeout: 2000,
        //smartSpeed: 2000,
        animateOut: "slideOutDown",

        animateIn: "slideInDown"

    });
    $(".slide-three").owlCarousel({
        //center: true,
        items: 1,
        loop: true,
        autoplay: true,
        center: true,
        touchDrag: true
        //autoplayTimeout: 2000,
        //smartSpeed: 2000,


    });
});




