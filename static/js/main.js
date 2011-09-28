(function(window, $) {

    var button = $('.btn');

    button.click(function(e) {
        e.preventDefault();
        $.ajax({
            cache: false,
            url: '/random',
            success: function(data) {
                var button = $('.btn'),
                    catchphrase = $('.catchphrase');
                catchphrase.text(data.catchphrase);
                button.text(data.action);
            }
        });
    });

})(window, jQuery);
