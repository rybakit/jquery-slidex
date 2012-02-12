$('.slides').slidex({ delay: 2 }).hover(
    function() { $(this).data('slidex').stop(); },
    function() { $(this).data('slidex').start(); }
);

/*
$('.slides').slidex(function(slidex) {
    slidex.options.delay = 2;
    slidex.$target.hover(
        function() { slidex.stop(); },
        function() { slidex.start(); }
    );
});
*/