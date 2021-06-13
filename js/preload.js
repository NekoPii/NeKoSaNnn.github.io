document.onreadystatechange = show;

function show() {
    if (document.readyState == "complete" || document.readyState == "interactive") {
        document.body.classList.add('loaded');
        setTimeout(function() {
            $("#loader-wrapper").style.display = "none"
        }, 400);
        /*这里400ms是由main.css里的.loaded #loader以及#loader-wrapper的动画时间为0.3s决定 */
    }
}