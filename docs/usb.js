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
      const button = document.createElement("button");
      button.textContent = "Request USB device";
      button.addEventListener("click", getUSB);
      jsondatahtml.innerHTML += error.message;
      jsondatahtml.style.color = "red";
      document.body.appendChild(button);
      console.error(error);
    });
}

window.onload = function () {
  getUSB();
};
