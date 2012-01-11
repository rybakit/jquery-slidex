(function($) {
    ($.slidex.ext = $.slidex.ext || {}).caption = function(slidex, container) {
        container = $(container);

        var items = container.children(),
            co = container.offset(), to = $(slidex.target).offset(),
            pos = 'bottom', dim = 'height';

        if (co.top == to.top) {
            if (container.width() >= container.height()) {
                pos = 'top';
            } else {
                pos = co.left == to.left ? 'left' : 'right';
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