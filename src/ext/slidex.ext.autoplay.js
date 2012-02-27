(function($) {
    "use strict";

    ($.slidex.ext = $.slidex.ext || {}).autoplay = function(slidex, interval) {

        if ('undefined' === typeof interval) {
            interval = 5;
        }

        var timer;

        slidex.$target.on({
            'stop.autoplay': function() {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            },
            'start.autoplay': function() {
                if (!timer) {
                    timer = setTimeout(function() { slidex.show(); }, interval * 1000);
                }
            },
            'before': function() {
                slidex.$target.trigger('stop.autoplay');
            },
            'after': function() {
                slidex.$target.trigger('start.autoplay');
            }
        })

        // autostart
        slidex.$target.trigger('start.autoplay');
    };
}(window.jQuery));