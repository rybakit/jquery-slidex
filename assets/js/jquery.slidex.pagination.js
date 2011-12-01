(function($) {
    ($.slidex.ext = $.slidex.ext || {}).pagination = function(slidex, container) {
        var pages = $(container).children().click(function(e) {
            e.preventDefault();
            slidex.show($(this).index());
        });

        for (var i = pages.length, len = slidex.slides.length; i < len; i++) {
            pages[i] = pages.last().clone(true).appendTo(container);
        }

        $(pages[slidex.index]).css('opacity', .8);

        $(slidex).bind('before.slidex', function(e, oldIndex, newIndex) {
            $(pages[oldIndex]).animate({ opacity: .4 }, slidex.config.speed);
            $(pages[newIndex]).animate({ opacity: .8 }, slidex.config.speed);
        });
    };
}(jQuery));