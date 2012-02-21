$('.image-slides').slidex(null, function(slidex) {
    slidex.$target.hover(
        function() {
            slidex.$target.trigger('stop.autoplay');
        },
        function() {
            slidex.$target.trigger('start.autoplay');
        }
    );

    $.slidex.ext.autoplay(slidex, 2);
});