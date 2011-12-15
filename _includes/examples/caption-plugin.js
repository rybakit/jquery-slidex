$('.image-slides').slidex(null, function (slidex) {
    var caption = $('.slidex-caption'),
        show = function() {
            var title = $(slidex.slides[slidex.index]).attr('title');
            caption.show().html('<span>' + title + '</span>');
        };

    show();
    $(this).bind({
        'before.slidex': function() {
            caption.find('>span').fadeOut(slidex.config.speed);
        },
        'after.slidex': show
    });
});