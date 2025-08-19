// 1 misoll
function MinNumber(arr) {
    return Math.min.apply(Math, arr);
}
var mass = [1, 2, 3, 4, 5, 6, 5];
console.log(MinNumber(mass));
// 2- misoll
var sozlar = ["salom", "qalesan", "dost"];
var birlashtirish = function (matn) {
    return matn.join(', ');
};
console.log(birlashtirish(sozlar));
var user = ["Shuhrat", new Date(), true];
console.log(user);
var username = user[0], sana = user[1], aktiv = user[2];
console.log("Tizimga kirganmi:", aktiv ? "Ha" : "Yo'q");
// 4-misoll
