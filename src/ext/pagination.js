(function($) {
    "use strict";

    ($.slidex.ext = $.slidex.ext || {}).pagination = function(slidex, container) {
        var $container = $(container),
            pages = $container.children(),
            cls = 'active';

        $container.on('click', pages[0].tagName, function(e) {
            e.preventDefault();
            //console.log('pagination click on index: ' + $(this).index());
            slidex.show($(this).index());
            return false;
        });

        pages.removeClass(cls);
        $(pages[slidex.index]).addClass(cls);

        slidex.$target.on('before', function(e, toIndex) {
            //console.log('pagination before: ' + toIndex);
            pages.removeClass(cls);
            $(pages[toIndex]).addClass(cls);
        });

        /*
        var pages = $(container).children().click(function(e) {
            e.preventDefault();
            slidex.show($(this).index());
        }), cls = 'active';

        for (var i = pages.length, len = slidex.slides.length; i < len; i++) {
            pages[i] = pages.last().clone(true).appendTo(container);
        }

        // create init event and move this code to bind?
        pages.removeClass(cls);
        $(pages[slidex.index]).addClass(cls);

        slidex.$target.on('before', function(e, toIndex) {
            $(container).children().removeClass(cls);
            $(pages[toIndex]).addClass(cls);
        });
        */
    };
}(window.jQuery));