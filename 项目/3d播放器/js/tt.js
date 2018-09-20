var xs=document.getElementById('xs');
var img=document.getElementById("tp");
function  openModal(){
   xs.style.display = "block";
}
function currentSlide(n) {
    switch (n) {
        case 1:
            img.src="img/zjx-1.jpg";
            break;
        case 2:
            img.src="img/zjx-2.jpg";
            break;
        case 3:
            img.src="img/zjx-3.jpg";
            break;
        case 4:
            img.src="img/zjx-4.jpg";
            break;
        case 5:
            img.src="img/zjx-5.jpg";
            break;
        case 6:
            img.src="img/zjx-6.jpg";
            break;
    }
}
function closeModal() {
    xs.style.display = "none";
}
