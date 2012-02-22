(function($) {
    "use strict";

    ($.slidex.ext = $.slidex.ext || {}).pagination = function(slidex, container) {
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

        slidex.$target.bind('after', function() {
            pages.removeClass(cls);
            $(pages[slidex.index]).addClass(cls);
        });
    };
}(window.jQuery));