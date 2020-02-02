const btn = document.getElementById("js-btn");

console.log(btn.children[0]);
btn.onclick = function(e) {
    e.preventDefault();
    setTimeout(function() {
        window.location(btn.children.attr("href"));
    }, 1000);
};