function sendEmail() {
    $.post("backend/userData.php", {
        action: 'view',
        currentUser: sessionStorage.getItem("loggedUser")
    }, function (data, status) {
        const json = JSON.parse(data);
        const favouriteList = Object.values((json.favoriteList));
        productItems(favouriteList);
    });
}

function productItems(favouriteList) {
    let populatedList;
    $.post("backend/favourite.php", {
        action: 'getList',
        currentUser: sessionStorage.getItem("loggedUser"),
        favList: favouriteList
    }, function (data, status) {
        const jsonProducts = JSON.parse(data);
        let productItems = '';
        jsonProducts.forEach(function (item) {
            const jsonIterate = JSON.parse(item);
            jsonIterate.forEach(function (product) {

                productItems = productItems + `<div class="item card" style="color:#313131;text-align:left;box-sizing: border-box;position: relative;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;min-width: 0;word-wrap: break-word;background-color: #FFFFFF;background-clip: border-box;border: none !important;border-radius: 10px;margin-bottom: 15px;padding: 20px 20px 10px;-webkit-box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);-moz-box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);max-width: 580px !important;">
                    <div class="ui-grid-a d-flex align-items-center" style="box-sizing: border-box;overflow: hidden;display: flex!important;-webkit-box-align: center!important;-ms-flex-align: center!important;align-items: center!important;">
                        <div class="ui-block-a w40" style="box-sizing: border-box;margin: 0;padding: 0;border: 0;float: left;min-height: 1px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;clear: left;width: 40% !important;">
                            <img alt="product Image" class="img-fluid" src="` + product.image + `" height="auto" width="100px" style="box-sizing: border-box;vertical-align: middle;border-style: none;page-break-inside: avoid;max-width: 100%;height: auto;">
                        </div>
                        <div class="ui-block-b w60" style="box-sizing: border-box;margin: 0;padding: 0;border: 0;float: left;min-height: 1px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;width: 60% !important;">
                            <div class="prodContent" style="box-sizing: border-box;">
                                <div class="ui-grid-solo" style="box-sizing: border-box;overflow: hidden;">
                                    <div class="ui-block-a" style="box-sizing: border-box;margin: 0;padding: 0;border: 0;float: none;min-height: 1px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;clear: left;width: 100%;">
                                        <h4 class="mt-0 truncate font-weight-bold m-0" style="box-sizing: border-box;margin-top: 0!important;margin-bottom: .5rem;font-family: inherit;font-weight: var(--font-weight-bold) !important;line-height: 1.2;color: inherit;font-size: 16px;margin: 0!important;">` + product.name + `</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="price mt-2" style="box-sizing: border-box;margin-top: .5rem!important;">
                                <div class="font-size-s text-muted font-weight-bold" style="box-sizing: border-box;font-weight: var(--font-weight-bold) !important;color: #6c757d!important;font-size: 12px !important;">
                                    <del style="box-sizing: border-box;">20.99</del>
                                </div>
                                <div class="font-weight-heavy font-size-xl" style="box-sizing: border-box;font-size: 22px;font-weight: var(--font-weight-heavy) !important;">
                                    <div class="primary-color-red-text" style="box-sizing: border-box;color: var(--primary-color-red) !important;">
                                        <span class="font-size-m font-weight-bold" style="box-sizing: border-box;font-weight: var(--font-weight-bold) !important;font-size: 14px !important;">USD</span> ` + product.price + `
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            });

            populatedList = productItems;
        });
        Email.send({
            Host: "smtp.gmail.com",
            Username: "yaka.noice@gmail.com",
            Password: "kavi@1234",
            To: "abdulsmart100@gmail.com",//sessionStorage.getItem("loggedUser"),
            From: "yaka.noice@gmail.com",
            Subject: "Your Favourite Items",
            Body:
            `<div style = " background: #4444C8;padding: 16px;">
    <div style="box-sizing: border-box;color:white;">
        <div style="box-sizing: border-box;overflow: hidden;margin-top: 1.5rem!important;margin-bottom: 1.5rem!important;text-align: center!important;">
            <img alt = "LOGO" src="assets/img/wordmark-logo.svg" width="100px" style="box-sizing: border-box;vertical-align: middle;border-style: none;page-break-inside: avoid;max-width: 100%;height: auto;margin-bottom: 50px;">
            <h3 style="box-sizing: border-box;margin-top: 0;margin-bottom: .5rem;font-weight: 500;line-height: 1.2;font-size: 1.75rem;color: #FFFFFF;">Well hello there !</h3>
            "<h5 style="box-sizing: border-box;margin-top: 0;margin-bottom: 2.5rem;font-family: inherit;font-weight: 600 !important;line-height: 1.2;color: #FFFFFF !important;font-size: 1.25rem;"> Here are your favourite items </h5>
        </div>
        <div style="text-align: center">
            <div class = "items" style = 'display: inline-block'>
` + populatedList + `
            </div>
        </div>
        <div style='margin-top: 2.5rem;text-align: center'>
            <div style='display: inline-block'>
                <div style="box-sizing: border-box;padding-right: .5rem!important;font-size: 14px !important;"> Powered By</div>
                <img alt = 'footerLogo' src="assets/img/wooksMart-light.svg" width="100px" style="box-sizing: border-box;vertical-align: middle;border-style: none;page-break-inside: avoid;max-width: 100%;height: auto;">\\
            <div>
        </div>
    </div>
</div>`,
        }).then(
            window.location = "http://localhost/mobile-ux-ipad/success_email.html"
        );
    });
}


