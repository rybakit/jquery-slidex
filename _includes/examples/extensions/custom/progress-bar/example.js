$('.image-slides').slidex(null, function(slidex) {
    var bar = $('.slides .progress-bar p');

    $(slidex)
        .bind('start.slidex before.slidex', function () {
            bar.animate({ width: '100%' }, slidex.config.delay * 1000, function() {
                    bar.width(0);
                });
            })
        .bind('stop.slidex', function() {
            bar.stop(true, true);
        });
});