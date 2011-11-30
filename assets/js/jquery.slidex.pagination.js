(function($) {
    ($.slidex.ext = $.slidex.ext || {}).pagination = function(slidex, container) {
        var pages = $(container).children().click(function() {
            slidex.show($(this).index());
        });

        for (var i = pages.length, len = slidex.slides.length; i < len; i++) {
            pages[i] = pages.last().clone(true).appendTo(container);
        }

        $(slidex).bind({
            'before.slidex': function(e, oldIndex, newIndex) {
                $(pages[oldIndex]).animate({ opacity: 0.4 }, slidex.config.speed);
                $(pages[newIndex]).animate({ opacity: 0.8 }, slidex.config.speed);
            }
        });
    };
}(jQuery));