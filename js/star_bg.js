var stars_cnt = 100;
var stars = $("#stars");
var r = 700; /*星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/
for (var i = 0; i < stars_cnt; i++) {
    var new_star = $CRE("div")
    new_star.classList.add("star")
    stars.append(new_star);
}

let star = $All(".star")
let s = 0.2 + (Math.random());
let curR = r + (Math.random() * 600);
for (let now of star) {
    now.style.transformOrigin = "0 0 " + curR + "px"
    now.style.transform = " translate3d(0,0,-" + curR + "px) rotateY(" + (Math.random() * 360) +
        "deg) rotateX(" + (Math.random() * -50) + "deg) scale(" + s + "," + s + ")"
}