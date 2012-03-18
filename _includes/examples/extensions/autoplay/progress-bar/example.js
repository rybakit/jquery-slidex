$('.image-slides').slidex(function(slidex) {

    var bar = $('.slides .progress-bar p'), interval = 5;

    slidex.$target.on({
        'stop.autoplay': function() {
            bar.stop(true, true);
        },
        'start.autoplay': function () {
            bar.animate({ width: '100%' }, interval * 1000, function() { bar.width(0); });
        }
    });

    //slidex.$target.trigger('start.autoplay');

    /*
    slidex.$target.hover(
        function() {
            slidex.$target.trigger('stop.autoplay');
        },
        function() {
            slidex.$target.trigger('start.autoplay');
        }
    );
    */

    $.slidex.ext.autoplay(slidex, interval);
});