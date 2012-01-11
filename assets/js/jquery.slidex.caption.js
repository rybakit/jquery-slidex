(function($) {
    ($.slidex.ext = $.slidex.ext || {}).caption = function(slidex, container) {
        container = $(container);

        var items = container.children(), target = $(slidex.target),
            pos = 'bottom', dim = 'height';

        if (container.css('top') == target.css('top')) {
            if (container.width() >= target.height()) {
                pos = 'top';
            } else {
                pos = container.css('left') == target.css('left') ? 'left' : 'right';
                dim = 'width';
            }
        }

        $(items[slidex.index]).show();

        $(slidex).bind('before.slidex', function(e, oldIndex, newIndex) {
            var props = { opacity: 'toggle' };
            props[pos] = '-' + container.css(dim);
            container.animate(props, 'slow', function() {
                $(items[oldIndex]).hide();
                $(items[newIndex]).show();
                props[pos] = 0;
                container.animate(props, 'slow');
            });
        });
    };
}(jQuery));