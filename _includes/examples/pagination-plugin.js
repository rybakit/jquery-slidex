$('.slides').slidex({ filter: 'img' }, function(slidex) {
    $.slidex.ext.pagination(slidex, '.slidex-pagination');
});