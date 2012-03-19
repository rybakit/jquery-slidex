$('.image-slides').slidex(function(slidex) {

    var bar = $('.slides .progress-bar p'), interval = 5;

    slidex.$target.on({
        'stop.carousel': function() {
            bar.stop(true, true);
        },
        'start.carousel': function () {
            bar.animate({ width: '100%' }, interval * 1000, function() { bar.width(0); });
        }
    });

    $.slidex.ext.carousel(slidex, interval);
});