let cnv;
let cnx;
let hrac1nahoru = false;
let hrac1dolu = false;
function stiskKlavesy(udalost) {
    if (udalost.key == "w") {
        hrac1nahoru = true;
    }
    if (udalost.key == "s") {
        hrac1dolu = true;
    }
}
function uvolneniKlavesy(udalost) {
    if (udalost.key == "w") {
        hrac1nahoru = false;
    }
    if (udalost.key == "s") {
        hrac1dolu = false;
    }
}
function poNacteni() {
    document.addEventListener("keydown", stiskKlavesy);
    document.addEventListener("keyup", uvolneniKlavesy);

    cnv = document.getElementById("platno");
    ctx = cnv.getContext("2d");

    setInterval(animace, 30);
}
const HRAC_SIRKA = 10;
const HRAC_VYSKA = 60;
let hrac1x = 20;
let hrac1y = 200;
let hrac1body = 0;
const KRUH_POLOMER = 10;
let kruhX = 320;
let kruhY = 200;
let kruhRychlostX = -5;
let kruhRychlostY = -1;
function animace() {
    //vycisteni platna
    ctx.clearRect(0,0,cnv.width,cnv.height);

    //obdelnik - hrac1 
    if (hrac1nahoru) {
        hrac1y = hrac1y -4;
    }
    if (hrac1dolu) {
        hrac1y = hrac1y +4;
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = "green";
    ctx.rect(hrac1x, hrac1y, HRAC_SIRKA, HRAC_VYSKA);
    ctx.fill();

    //obdelnik - hrac2
    //TODO vykresleni a pohyb hrace 2

    //kruh (plny) - micek
    kruhX = kruhX + kruhRychlostX;
    kruhY = kruhY + kruhRychlostY;
    if (kruhX <= hrac1x + HRAC_SIRKA + KRUH_POLOMER && kruhY >= hrac1y && kruhY <= hrac1y + HRAC_VYSKA) { 
        kruhRychlostX = -1 * kruhRychlostX;
    }
    if (kruhX < KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        kruhRychlostX = -1 * kruhRychlostX;
        //TODO pocitani bodu
    }
    if (kruhX > cnv.width - KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        kruhRychlostX = -1 * kruhRychlostX; //zatim nechame odrazeni
        hrac1body = hrac1body + 1;
        document.getElementById("stav").innerHTML = hrac1body + ":0";
    }
    if (kruhY < KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        kruhRychlostY = -1 * kruhRychlostY;
    }
    if (kruhY > cnv.height - KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        kruhRychlostY = -1 * kruhRychlostY;
    }
    ctx.beginPath();
    ctx.fillStyle = "magenta";
    ctx.arc(kruhX, kruhY, KRUH_POLOMER, 0, 2*Math.PI);
    ctx.fill();
}