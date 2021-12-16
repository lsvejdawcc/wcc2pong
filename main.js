let cnv;
let cnx;
let hrac1nahoru = false;
let hrac1dolu = false;
let hrac2nahoru = false;
let hrac2dolu = false;
function stiskKlavesy(udalost) {
    if (udalost.key == "w") {
        hrac1nahoru = true;
    }
    if (udalost.key == "s") {
        hrac1dolu = true;
    }
    if (udalost.key == "ArrowUp") {
        hrac2nahoru = true;
    }
    if (udalost.key == "ArrowDown") {
        hrac2dolu = true;
    }
}
function uvolneniKlavesy(udalost) {
    if (udalost.key == "w") {
        hrac1nahoru = false;
    }
    if (udalost.key == "s") {
        hrac1dolu = false;
    }
    if (udalost.key == "ArrowUp") {
        hrac2nahoru = false;
    }
    if (udalost.key == "ArrowDown") {
        hrac2dolu = false;
    }
}
function poNacteni() {
    document.addEventListener("keydown", stiskKlavesy);
    document.addEventListener("keyup", uvolneniKlavesy);

    cnv = document.getElementById("platno");
    ctx = cnv.getContext("2d");

    //nastaveni pozice hracu
    hrac1x = 20;
    hrac1y = cnv.height / 2;
    hrac2x = cnv.width - 20 - HRAC_SIRKA;
    hrac2y = hrac1y;

    novyMic();

    setInterval(animace, 30);
}
const HRAC_SIRKA = 10;
const HRAC_VYSKA = 60;
let hrac1x;
let hrac1y;
let hrac1body = 0;
let hrac2x;
let hrac2y;
let hrac2body = 0;
const KRUH_POLOMER = 10;
let kruhX;
let kruhY;
let kruhRychlostX;
let kruhRychlostY;
function novyMic() {
    //zobrazeni stavu
    document.getElementById("stav").innerHTML = hrac1body + ":" + hrac2body;

    //nastaveni mice
    kruhX = cnv.width / 2;
    kruhY = cnv.height / 2;
    do {
        kruhRychlostX = Math.floor(Math.random() * 20) - 10; //nahodne cislo od -10 do +10
    } while (kruhRychlostX == 0); //rychlost nesmi byt 0
    do {
        kruhRychlostY = Math.floor(Math.random() * 20) - 10; //nahodne cislo od -10 do +10
    } while (kruhRychlostY == 0); //rychlost nesmi byt 0
}
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
    if (hrac2nahoru) {
        hrac2y = hrac2y -4;
    }
    if (hrac2dolu) {
        hrac2y = hrac2y +4;
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = "blue";
    ctx.rect(hrac2x, hrac2y, HRAC_SIRKA, HRAC_VYSKA);
    ctx.fill();

    //kruh (plny) - micek
    kruhX = kruhX + kruhRychlostX;
    kruhY = kruhY + kruhRychlostY;
    //odrazeni od hrace 1
    if (kruhX <= hrac1x + HRAC_SIRKA + KRUH_POLOMER && kruhY >= hrac1y && kruhY <= hrac1y + HRAC_VYSKA) { 
        kruhRychlostX = -1 * kruhRychlostX;
    }
    //odrazeni od hrace 2
    if (kruhX >= hrac2x - KRUH_POLOMER && kruhY >= hrac2y && kruhY <= hrac2y + HRAC_VYSKA) { 
        kruhRychlostX = -1 * kruhRychlostX;
    }
    //bod pro hrace 2
    if (kruhX < KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        hrac2body = hrac2body + 1;
        novyMic();
    }
    //bod pro hrace 1
    if (kruhX > cnv.width - KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        hrac1body = hrac1body + 1;
        novyMic();
    }
    //odrazeni od horni strany
    if (kruhY < KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        kruhRychlostY = -1 * kruhRychlostY;
    }
    //odrazeni od dolni strany
    if (kruhY > cnv.height - KRUH_POLOMER) { //stred kruhu je v mensi vzdalenosti nez jeho polomer
        kruhRychlostY = -1 * kruhRychlostY;
    }

    ctx.beginPath();
    ctx.fillStyle = "magenta";
    ctx.arc(kruhX, kruhY, KRUH_POLOMER, 0, 2*Math.PI);
    ctx.fill();
}