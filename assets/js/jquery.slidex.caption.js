(function($) {
    ($.slidex.ext = $.slidex.ext || {}).caption = function(slidex, container) {
        container = $(container);
        var items = container.children();

        $(items[slidex.index]).show();

        $(slidex).bind('before.slidex', function(e, oldIndex, newIndex) {
            container.animate({ bottom: '-' + container.css('height'), opacity: 0 }, 'slow', function() {
                $(items[oldIndex]).hide();
                $(items[newIndex]).show();
                container.animate({ bottom: 0, opacity: 1 }, 'slow');
            });
        });
    };
}(jQuery));