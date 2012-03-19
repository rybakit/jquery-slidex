$('.image-slides').slidex(function(slidex) {
    slidex.$target.hover(
        function() { slidex.$target.trigger('stop.carousel'); },
        function() { slidex.$target.trigger('start.carousel'); }
    );

    $.slidex.ext.carousel(slidex, 2);
});