$(document).on('pagecreate', function (evt) {

    $("div[role='main']").on("swipeleft", function (e) {

        var currentPage = parseInt($("div.ui-content").find('.active').attr('id'));

        console.log(currentPage);

        var nextPage = currentPage + 1;

        if (nextPage < 5) {

            $('#' + currentPage.toString()).addClass('d-none');
            $('#' + currentPage.toString()).removeClass('active');

            $('#' + nextPage.toString()).removeClass('d-none');
            $('#' + nextPage.toString()).addClass('active');

            $('#c' + currentPage.toString()).removeClass('active');
            $('#c' + nextPage.toString()).addClass('active');

            console.log(nextPage);

        }

    });

    $("div[role='main']").on("swiperight", function (e) {

        var currentPage = parseInt($("div.ui-content").find('.active').attr('id'));

        console.log(currentPage);

        var previousPage = currentPage - 1;

        if (previousPage < 5 && previousPage > 0) {

            $('#' + currentPage.toString()).addClass('d-none');
            $('#' + currentPage.toString()).removeClass('active');

            $('#' + previousPage.toString()).removeClass('d-none');
            $('#' + previousPage.toString()).addClass('active');

            $('#c' + currentPage.toString()).removeClass('active');
            $('#c' + previousPage.toString()).addClass('active');

            console.log(previousPage);

        }

    });

});
