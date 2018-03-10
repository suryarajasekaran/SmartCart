//JS to get store number of times user has visited site earlier as well as to how time of the previous visit

if (typeof Storage !== "undefined") {
  if (localStorage.visitcount) {
    document.getElementById("count").innerHTML ="Welcome back, you have been here " +localStorage.visitcount +
      " time/s before";
    localStorage.visitcount = Number(localStorage.visitcount) + 1;
    document.getElementById("sessiontime").innerHTML = "Your previous visit was at " + localStorage.getItem("sessiontime");
    localStorage.setItem('sessiontime', new Date());
  }
  else {
    localStorage.visitcount = 1;
    document.getElementById("count").innerHTML =
      "This is your first time here! Welcome.";
     document.getElementById("sessiontime").innerHTML= "Time of your first visit is "+ new Date();
    localStorage.setItem('sessiontime', new Date());
    console.log("localstorage time now: " + localStorage.getItem("sessiontime"));
    console.log("localstorage visit count now: " + localStorage.sessiontime);
  }
} else {
   alert("Sorry,use a different browser as your browser does not support web storage.");
  document.getElementById("count").innerHTML =
    "Sorry, use a different browser as your browser does not support web storage...";
}
console.log("localstorage visit count now: " + localStorage.visitcount);