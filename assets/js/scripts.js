document.addEventListener('DOMContentLoaded',function () {

    'use strict';
    loadIn();
    mobileMenu();
    loadOut();
    hideHeader();

    let filters = (document.getElementById('filters'))
    
    if (document.body.contains(filters)) {
      filterToggle();
    } else {
      
    }
    
  }, false);


/*--------------------------------------------------
Function Document Load Out (Page Transition)
---------------------------------------------------*/


function loadOut() {
document
.querySelectorAll('header nav li a, .page-link')
  .forEach(e => {
    e.addEventListener('click', function () {
      event.preventDefault()

      var i = this.getAttribute('href')
      var wrapper = document.querySelector('.wrapper')
      var pageLoader = document.querySelector('.page-loader')

      wrapper.classList.remove('is-loaded'),
      setTimeout(function () {
        pageLoader.classList.remove('is-loaded')
      }, 80),
      setTimeout(function () {
        window.location = i
      }, 100)
    })
  })
}


/*--------------------------------------------------
Function Document On Load (Page Transition)
---------------------------------------------------*/


function loadIn() {
  var i = new WOW()

  var pageLoader = document.querySelector('.page-loader')
  var wrapper = document.querySelector('.wrapper')
  var grid = document.querySelector('.gallery-masonry')
  var intro = document.querySelector('#intro')

  // Add is-loaded class
  pageLoader.classList.add('is-loaded'),
  setTimeout(function () {
    wrapper.classList.add('is-loaded'), i.init()
  }, 50),
  // Initalise Isotope for gallery-selector class
  new Isotope(grid, {
    itemSelector: '.gallery-selector',
    layoutMode: 'packery'
  })
  // Initalise Isotope for masonry class via assigned variable
  var iso = document.querySelector('.masonry')
  var o = new Isotope(iso)

  document.querySelectorAll('#filters li').forEach(e => {
    e.addEventListener('click', function () {
      var t = this.getAttribute('data-filter')
      o.arrange({ filter: t }) 

      // Add the active class
      this.classList.add('active')
      // Loop through each link
      for (let sibling of this.parentNode.children) {
        if (sibling !== this) sibling.classList.remove('active')
      }
    }),
    o.arrange({ layoutMode: 'packery', itemSelector: '.selector' })
  })

}

/*--------------------------------------------------
Function Mobile Menu
---------------------------------------------------*/


function mobileMenu() {
document
  .querySelector('#mobile-menu-icon')
  .addEventListener('click', function (t) {
    var nav = document.querySelector('#mobile-nav')
    t.stopPropagation(), t.preventDefault(), nav.classList.toggle('show')
  })
}


/*--------------------------------------------------
Function Filter Toggle
---------------------------------------------------*/


function filterToggle() {
  let f = document.querySelector('.filters-button');
  
      if (window.innerWidth > 767) {
      f.addEventListener( 'mouseover', function() {
        document.querySelector('.arrow-up').classList.toggle('is-active'),
        document.querySelector('.arrow-down').classList.toggle('is-active')
      }),
      f.addEventListener( 'mouseout', function() {
        document.querySelector('.arrow-up').classList.toggle('is-active'),
        document.querySelector('.arrow-down').classList.toggle('is-active')
      }),
      f.addEventListener( 'click', function() {
        document.querySelector('.arrow-up').classList.toggle('is-active'),
        document.querySelector('.arrow-down').classList.toggle('is-active'),
        document.querySelector('.filters').classList.toggle('item-delay_on')
      }),
        document.addEventListener( 'scroll', function() {
        document.querySelector('.filters').classList.remove('item-delay_on')
      })
    } else {
      f.addEventListener( 'click', function() {
        document.querySelector('.arrow-up').classList.toggle('is-active'),
        document.querySelector('.arrow-down').classList.toggle('is-active'),
        document.querySelector('.filters').classList.toggle('item-delay_on')
      })
    }
}


/*--------------------------------------------------
Function Hide Header
---------------------------------------------------*/


function hideHeader () {

  var lastKnownScrollY = 0;
  var currentScrollY = 0;
  var ticking = false;
  var idOfHeader = 'header';
  var eleHeader = null;
  const classes = {
    pinned: 'header-pin',
    unpinned: 'header-unpin',
  };
  function onScroll() {
    currentScrollY = window.pageYOffset;
    requestTick();
  }
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
    }
    ticking = true;
  }
  function update() {
    if (currentScrollY < lastKnownScrollY) {
      pin();
    } else if (currentScrollY > lastKnownScrollY) {
      unpin();
    }
    lastKnownScrollY = currentScrollY;
    ticking = false;
  }
  function pin() {
    if (eleHeader.classList.contains(classes.unpinned)) {
      eleHeader.classList.remove(classes.unpinned);
      eleHeader.classList.add(classes.pinned);
    }
  }
  function unpin() {
    if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
      eleHeader.classList.remove(classes.pinned);
      eleHeader.classList.add(classes.unpinned);
    }
  }
  window.onload = function() {
    eleHeader = document.getElementById(idOfHeader);
    document.addEventListener('scroll', onScroll, false);
  }

  }


// /*--------------------------------------------------
// Function Magnific Popup (jQuery)
// ---------------------------------------------------*/


// $(document).ready(function () {
//   $('.lightbox').magnificPopup({
//     delegate: 'a',
//     type: 'image',
//     tClose: 'Close (Esc)',
//     tLoading: '',
//     gallery: {
//       enabled: !0,
//       tPrev: 'Previous (Left arrow)',
//       tNext: 'Next (Right arrow)',
//       tCounter: '%curr% of %total%'
//     },
//     image: { tError: 'The image can not be loaded.' },
//     mainClass: 'mfp-zoom-in',
//     removalDelay: 300,
//     callbacks: {
//       beforeOpen: function () {
//         $('.lightbox a').each(function () {
//           $(this).attr(
//             'title',
//             $(this)
//               .find('img')
//               .attr('title')
//           )
//         })
//       },
//       open: function () {
//         ;($.magnificPopup.instance.next = function () {
//           var t = this
//           t.wrap.removeClass('mfp-image-loaded'),
//           setTimeout(function () {
//             $.magnificPopup.proto.next.call(t)
//           }, 120)
//         }),
//         ($.magnificPopup.instance.prev = function () {
//           var t = this
//           t.wrap.removeClass('mfp-image-loaded'),
//           setTimeout(function () {
//             $.magnificPopup.proto.prev.call(t)
//           }, 120)
//         })
//       },
//       imageLoadComplete: function () {
//         var $ = this
//         setTimeout(function () {
//           $.wrap.addClass('mfp-image-loaded')
//         }, 16)
//       }
//     }
//   })
// })