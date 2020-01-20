//import divide from './lib.js';

//import 'core-js/features/promise';
/*let divide = function(first, second = 5){
    return first / second;
}*/


import $ from 'jquery';
//import 'svgxuse';
import 'owl.carousel2';





$(document).ready(function () {

    /*быстрый старт*/

    if ($('.main').children().hasClass('sure-start')) {
        let $sureStart = $('.sure-start');
        let sure = function () {
            $sureStart.slideDown(600);
        };
        setTimeout(sure, 6000);
        /*Сокрытие формаы Неуверенный старт*/
        let clBtn = $('.cl-btn');
        clBtn.on('click', function () {
            $sureStart.slideUp(600);
        });
    }


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


    $taBl.each(function () {
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




