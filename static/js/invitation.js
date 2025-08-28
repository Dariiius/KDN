$(window).on('load', function () {
    $('.wrapper').fadeOut('fast');
    $('.loader-wrapper').fadeOut('slow', function () {
        $('.wrapper').fadeIn();
    });

    $('.wrapper').hover(
        function() {
            $('.content-cover').fadeOut('slow')
        },
        function() {
            $('.content-cover').fadeIn('slow')
        }
    );

    new CircleType(document.getElementById('header')).radius(240);
});