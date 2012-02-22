(function($) {
    "use strict";

    ($.slidex.ext = $.slidex.ext || {}).caption = function(slidex, container) {
        var $container = $(container),
            items = $container.children(),
            co = $container.offset(), to = slidex.$target.offset(),
            pos = 'bottom', dim = 'height';

        if (co.top === to.top) {
            if ($container.width() >= $container.height()) {
                pos = 'top';
            } else {
                pos = co.left === to.left ? 'left' : 'right';
                dim = 'width';
            }
        }

        $(items[slidex.index]).show();

        slidex.$target.bind('before', function(e, toIndex) {
            var props = { opacity: 'toggle' };
            props[pos] = '-' + $container.css(dim);
            $container.animate(props, 'slow', function() {
                $(items[slidex.index]).hide();
                $(items[toIndex]).show();
                props[pos] = 0;
                $container.animate(props, 'slow');
            });
        });
    };
}(window.jQuery));