let bag = "";
let fields = document.querySelectorAll(".field");
fields.forEach(function (field) {
  if (field.innerText == "DEL") {
    field.addEventListener("click", myDel);
  } else if (field.innerText == "+") {
    field.addEventListener("click", myAdd);
  } else if (field.innerHTML == "-") {
    field.addEventListener("click", mySub);
  } else if (field.innerHTML == "=") {
    field.addEventListener("click", myRes);
  } else if (field.innerHTML == "/") {
    field.addEventListener("click", myDiv);
  } else if (field.innerHTML == "*") {
    field.addEventListener("click", myMul);
  } else if (field.innerHTML == "RESET") {
    field.addEventListener("click", myReset);
  } else {
    field.addEventListener("click", myFun);
  }
});

const themeBtn = document.querySelector("#theme-btn");
 
// Load saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.innerText = "☀️";
} else {
  themeBtn.innerText = "🌙";
}
 
// Toggle on click
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
 
  if (document.body.classList.contains("dark")) {
    themeBtn.innerText = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.innerText = "🌙";
    localStorage.setItem("theme", "light");
  }
})

function myFun(event) {
  bag = bag + event.target.innerHTML;
  document.querySelector("#input-field").innerText = bag;
}
function myDel() {
  bag = bag.slice(0, bag.length - 1);
  document.querySelector("#input-field").innerText = bag;
}
function myAdd() {
    bag = bag + "+";
    document.querySelector("#input-field").innerText = bag;
}
function myMul() {
    bag = bag + "*";
    document.querySelector("#input-field").innerText = bag;
}
function myDiv() {
    bag = bag + "/";
    document.querySelector("#input-field").innerText = bag;
}
function mySub() {
    bag = bag + "-";
    document.querySelector("#input-field").innerText = bag;
}
function myReset() {
    bag=""
    document.querySelector("#input-field").innerText = bag;
}
function myRes() {
    if (!bag) return;
    const last = bag[bag.length - 1];
    if (["+", "-", "*", "/"].includes(last)) return;
    document.querySelector("#input-field").innerText = parseFloat(Number(eval(bag)).toPrecision(10));
    bag=""+eval(bag)
}
document.addEventListener("keydown", function(e) {
  if ("0123456789".includes(e.key)) {
    bag += e.key;
    document.querySelector("#input-field").innerText = bag;
  } 
  else if (["+", "-", "*", "/"].includes(e.key)) {
    const last = bag[bag.length - 1];
    if (["+", "-", "*", "/"].includes(last)) {
      bag = bag.slice(0, -1); // replace instead of stack
    }
    bag += e.key;
    document.querySelector("#input-field").innerText = bag;
  }
  else if (e.key === ".") myFun({ target: { innerHTML: "." } });
  else if (e.key === "Enter" || e.key === "=") myRes();
  else if (e.key === "Backspace") myDel();
  else if (e.key === "Escape") myReset();
});