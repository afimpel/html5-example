const alerts = document.getElementById("alerts");
const agents = document.getElementById("agents");
const jsondatahtml = document.getElementById("jsondatahtml");

function getUSB() {
  agents.innerHTML = navigator.userAgent;
  alerts.innerHTML = new Date() + "<hr />";
  jsondatahtml.innerHTML = new Date();
  jsondatahtml.style.display = "";
  navigator.usb
    .requestDevice({ filters: [] })
    .then((devices) => {
      devices.forEach((device) => {
        alerts.innerHTML += device.productName + "<br />"; // "Arduino Micro"
        alerts.innerHTML += device.manufacturerName + "<hr />"; // "Arduino LLC"
      });
    })
    .catch((error) => {
      jsondatahtml.innerHTML += error.message;
      jsondatahtml.style.color = "red";
      console.error(error);
    });
}

window.onload = function () {
  getUSB();
};
