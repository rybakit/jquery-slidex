$('.image-slides').slidex(null, function(slidex) {
    $.slidex.ext.pagination(slidex, '.slidex-pagination');
    $.slidex.ext.caption(slidex, '.slidex-caption');
});