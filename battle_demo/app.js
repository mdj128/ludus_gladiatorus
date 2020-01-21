var head = document.getElementById("head");
var torso = document.getElementById("torso");
var leg = document.getElementById("legs");
var img1 = document.getElementById("headslash");
var img2 = document.getElementById("bodyslash");
var img3 = document.getElementById("legslash");

head.onclick = function() {
  var damage = Math.ceil(Math.random() * 10);
  var num = Math.ceil(Math.random() * 4);
  document.getElementById("dmg").innerHTML = `Head hit: ${damage} damage!`;
  $("#headslash").replaceWith(`<img id="headslash" src="images/lg_slash${num}.png">`)
  $("#headslash").fadeOut();
}

torso.onclick = function() {
  var damage = Math.ceil(Math.random() * 10);
  var num = Math.ceil(Math.random() * 4);
  document.getElementById("dmg").innerHTML = `Body hit: ${damage} damage!`;
  $("#bodyslash").replaceWith(`<img id="bodyslash" src="images/lg_slash${num}.png">`)
  $("#bodyslash").fadeOut();
}

leg.onclick = function() {
  var damage = Math.ceil(Math.random() * 10);
  var num = Math.ceil(Math.random() * 4);
  document.getElementById("dmg").innerHTML = `Leg hit: ${damage} damage!`;
  $("#legslash").replaceWith(`<img id="legslash" src="images/lg_slash${num}.png">`)
  $("#legslash").fadeOut();
}

