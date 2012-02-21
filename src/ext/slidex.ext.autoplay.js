(function($) {
    "use strict";

    ($.slidex.ext = $.slidex.ext || {}).autoplay = function(slidex, interval) {

        if ('undefined' === typeof interval) {
            interval = 5;
        }

        var timer;

        slidex.$target.bind({
            'before stop.autoplay': function() {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            },
            'after start.autoplay': function() {
                if (!timer) {
                    timer = setTimeout(function() { slidex.show(); }, interval * 1000);
                }
            }
        })

        // autostart
        slidex.$target.trigger('start.autoplay');
    };
}(window.jQuery));