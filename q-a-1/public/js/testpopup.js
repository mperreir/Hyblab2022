mobiscroll.settings = {
    lang: 'fr',
    theme: 'material',
    themeVariant: 'light'
};

var account = mobiscroll.popup('#demo', {
        display: 'center'
    }),
    popup = mobiscroll.popup('#list', {
        display: 'center',
        onSet: function (event, inst) {
            var checked = document.querySelector('input[name="update"]:checked');
            document.getElementById('showPopup').value = checked ? checked.value : '';
        }
    }),
    scrollable = mobiscroll.popup('#scrollable', {
        display: 'center',
        scrollLock: false,
        cssClass: 'mbsc-no-padding md-content-scroll',
        buttons: []
    });

mobiscroll.listview('#listview', {
    enhance: true,
    swipe: false,
    onItemTap: function () {
        scrollable.hide();
        mobiscroll.toast({
            message: event.target.textContent + ' clicked'
        });
    }
});

document
    .getElementById('showAccount')
    .addEventListener('click', function () {
        account.show();
    }, false);

document
    .getElementById('showPopup')
    .addEventListener('click', function () {
        popup.show();
    }, false);

document
    .getElementById('showScrollable')
    .addEventListener('click', function () {
        scrollable.show();
    }, false);