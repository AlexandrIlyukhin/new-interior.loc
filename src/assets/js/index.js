//import divide from './lib.js';

//import 'core-js/features/promise';
/*let divide = function(first, second = 5){
    return first / second;
}*/


import $ from 'jquery';
//import 'svgxuse';
import 'owl.carousel2';

import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';



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

    /*Обертываение последнего слова в span*/
/*TODO решить вопрос с регулярным выражением*/
    //console.log($("[data-span]"));
    /*$("[data-span]").each(function () {

        this.innerHTML = this.innerHTML.replace(/^(.+?s)/, "<strong>$1</strong>");

        console.log(this.innerHTML);
        alert( this.innerHTML);
    });*/


    /*фотосвайп*/



    var initPhotoSwipeFromDOM = function(gallerySelector) {

        // parse slide data (url, title, size ...) from DOM elements
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for(var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes
                if(figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };



                if(figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }

                if(linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if(!clickedListItem) {
                return;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) {
                    continue;
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }



            if(index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};

            if(hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if(pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }

            };

            // PhotoSwipe opened from URL
            if(fromURL) {
                if(options.galleryPIDs) {
                    // parse real index when custom PIDs are used
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll( gallerySelector );

        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

// execute above function
    initPhotoSwipeFromDOM('.grid-container');




});




