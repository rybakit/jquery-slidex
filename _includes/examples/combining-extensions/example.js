$('.image-slides').slidex(null, function(slidex) {
    $.slidex.ext.caption(slidex, '.slidex-caption');
    $.slidex.ext.pagination(slidex, '.slidex-pagination');
});