$('.image-slides').slidex(null, function(slidex) {
    var bar = $('.progress-bar p');

    function anim() {
        bar.animate({ width: '100%' }, slidex.config.delay * 1000, function() {
            $(this).width(0);
        });
    };

    anim();
    $(slidex).bind('before.slidex', anim);
});