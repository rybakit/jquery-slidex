(function($) {
    ($.slidex.ext = $.slidex.ext || {}).pagination = function(slidex, config) {
        // TODO refactor
        var container = $(config.container);
        var pages = container.children();
        var plen = pages.length, slen = slidex.slides.length;

        if (!plen || !slen) {
            $.error('No pages/slides were found.');
        }

        while (plen < slen) {
            pages.last().clone().appendTo(container);
            plen++;
        }
        pages = container.children();

        pages.click(function() {
            slidex.show($(this).index());
        });
        $(slidex).bind({
            'before.slidex': function(e, oldIndex, newIndex) {
                //pages[oldIndex].animate({ opacity: 0.4 }, slidex.config.speed);
                //pages[newIndex].animate({ opacity: 0.8 }, slidex.config.speed);
            }
        });
    }
}(jQuery));