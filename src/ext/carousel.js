(function($) {
    "use strict";

    ($.slidex.ext = $.slidex.ext || {}).carousel = function(slidex, interval) {

        if ('undefined' === typeof interval) {
            interval = 5;
        }

        var timer, $target = slidex.$target;

        $target.on({
            'stop.carousel': function() {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            },
            'start.carousel': function() {
                if (!timer) {
                    timer = setTimeout(function() { slidex.show(); }, interval * 1000);
                }
            },
            'before': function() {
                $target.trigger('stop.carousel');
            },
            'after': function() {
                $target.trigger('start.carousel');
            }
        });

        // autostart
        $target.trigger('start.carousel');
    };
}(window.jQuery));