$(window).on('load', function () {
    // General
    $('.wrapper').fadeOut('fast');
    $('.loader-wrapper').fadeOut('slow', function () {
        $('.wrapper').fadeIn();
    });

    $('.wrapper').hover(
        function () {
            $('.content-cover').fadeOut('slow')
        },
        function () {
            $('.content-cover').fadeIn('slow')
        }
    );

    new CircleType(document.getElementById('header')).radius(240);

    $('.btn-next').on('click', function (e) {
        $('.content').fadeOut('slow');
    });

    $('.btn-previous').on('click', function (e) {
        $('.content').fadeIn('slow');
    });

    // Maps
    const LAT = 7.415486;
    const LNG = 125.802588;
    const LABEL = "Kaiden's 1st Birthday Venue";

    function openMaps(lat, lng, label) {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isIos = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
        const isAndroid = /Android/.test(ua);

        const q = encodeURIComponent(label || `${lat},${lng}`);
        const googleWeb = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        const appleMaps = `maps://maps.apple.com/?q=${q}&ll=${lat},${lng}`;
        const geoUri = `geo:${lat},${lng}?q=${lat},${lng}(${q})`;
        const googleIntent = `intent://maps.google.com/maps?daddr=${lat},${lng}#Intent;scheme=https;package=com.google.android.apps.maps;end`;

        if (isIos) {
            window.location.href = appleMaps;
            setTimeout(() => { window.open(googleWeb, "_blank", "noopener"); }, 800);
        } else if (isAndroid) {
            window.location.href = googleIntent;
            setTimeout(() => { window.location.href = geoUri; }, 700);
            setTimeout(() => { window.open(googleWeb, "_blank", "noopener"); }, 1500);
        } else {
            window.open(googleWeb, "_blank", "noopener");
        }
    }

    $("#open_maps").on("click", function () {
        openMaps(LAT, LNG, LABEL);
    });
});