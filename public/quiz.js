var tracker = 0;

var cem= 0;
var cs = 0;
var cheme = 0;
var ce = 0;

// question one
var a1 = document.getElementById("a1");
var a2 = document.getElementById("a2");
var a3 = document.getElementById("a3");
var a4 = document.getElementById("a4");

// question two
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");

// question three
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var c4 = document.getElementById("c4");

// question four
var d1 = document.getElementById("d1");
var d2 = document.getElementById("d2");
var d3 = document.getElementById("d3");
var d4 = document.getElementById("d4");

// question five
var e1 = document.getElementById("e1");
var e2 = document.getElementById("e2");
var e3 = document.getElementById("e3");
var e4 = document.getElementById("e4");
var result = document.getElementById("result");

a1.addEventListener("click", result1);
a2.addEventListener("click", result2);
a3.addEventListener("click", result3);
a4.addEventListener("click", result4);

b1.addEventListener("click", result1);
b2.addEventListener("click", result2);
b3.addEventListener("click", result3);
b4.addEventListener("click", result4);

c1.addEventListener("click", result1);
c2.addEventListener("click", result2);
c3.addEventListener("click", result3);
c4.addEventListener("click", result4);

d1.addEventListener("click", result1);
d2.addEventListener("click", result2);
d3.addEventListener("click", result3);
d4.addEventListener("click", result4);

e1.addEventListener("click", result1);
e2.addEventListener("click", result2);
e3.addEventListener("click", result3);
e4.addEventListener("click", result4);

function result1() {
  cem++, tracker++;
  if (tracker >= 5) {
    finished();
  }
}
function result2() {
  cs++, tracker++;
  if (tracker >= 5) {
    finished();
  }
}
function result3() {
  cheme++, tracker++;
  if (tracker >= 5) {
    finished();
  }
}
function result4() {
  ce++, tracker++;
  if (tracker >= 5) {
    finished();
  }
}
function finished() {
  if (cem >= 3) {
    result.innerHTML = "Based on your answers, construction engineering management seems to be your best fit.";
  } else if (cs >3) {
    result.innerHTML =
      "Based on your answers, computer science seems to be your best fit.";
  } else if (cheme >3) {
    result.innerHTML = "Based on your answers, chemical engineering seems to be your best fit.";
  } else if (ce > 3) {
    result.innerHTML = "Based on your answers, civil engineering seems to be your best fit.";
  } else if (cem >=2) {
    result.innerHTML = "Based on your answers, construction engineering management seems to be your best fit.";
  } else if (cs >= 2) {
    result.innerHTML = "Based on your answers, computer science seems to be your best fit.";
  } else if (cheme >= 2) {
    result.innerHTML = "Based on your answers, chemical engineering seems to be your best fit.";
  } else if (ce >= 2) {
    result.innerHTML = "Based on your answers, civil engineering seems to be your best fit.";
  } else {
    result.innerHTML = "Based on your answers, we were unable to identify the best fit for you. Please retake the quiz.";
  }
}