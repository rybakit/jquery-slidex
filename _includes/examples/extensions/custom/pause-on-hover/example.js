$('.slides').slidex({ delay: 2 }, function(slidex) {
    $(slidex.target).hover(
        function() { slidex.stop(); },
        function() { slidex.start(); }
    );
});
