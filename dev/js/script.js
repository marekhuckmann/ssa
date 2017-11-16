$(document).ready(function () {
    $('.swipebox').swipebox();
    $('[data-toggle="tooltip"]').tooltip();
});

{
    if (document.querySelector(".materials") !== null) {
        var x = document.querySelector(".materials").clientHeight;

        var heightSetter = document.createElement('style');
        heightSetter.type = 'text/css';

        if (x <= 200) {
            x *= 2;
            heightSetter.innerHTML = '.materials::before {height: ' + x + 'px;}';
            document.getElementsByTagName('head')[0].appendChild(heightSetter);
        } else if (x <= 300) {
            x *= 1.816;
            heightSetter.innerHTML = '.materials::before {height: ' + x + 'px;}';
            document.getElementsByTagName('head')[0].appendChild(heightSetter);
        }
    }
}