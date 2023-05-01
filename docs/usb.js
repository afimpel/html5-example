const alerts = document.getElementById("alerts");
const agents = document.getElementById("agents");
const jsondatahtml = document.getElementById("jsondatahtml");

function getLocation() {
  agents.innerHTML = navigator.userAgent;
  alerts.innerHTML = new Date() + "<hr />";
  jsondatahtml.innerHTML = new Date();
  jsondatahtml.style.display = "";
  navigator.usb.getDevices().then((devices) => {
    devices.forEach((device) => {
      alerts.innerHTML += device.productName + "<br />"; // "Arduino Micro"
      alerts.innerHTML += device.manufacturerName + "<hr />"; // "Arduino LLC"
    });
  });
}

window.onload = function () {
  getLocation();
  btn.addEventListener("click", getLocation);
};
