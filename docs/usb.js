const alerts = document.getElementById("alerts");
const agents = document.getElementById("agents");
const jsondatahtml = document.getElementById("jsondatahtml");

function getUSB() {
  agents.innerHTML = navigator.userAgent;
  alerts.innerHTML = new Date() + "<hr />";
  jsondatahtml.innerHTML = new Date() + "<hr />";
  jsondatahtml.style.display = "";
  navigator.usb
    .requestDevice({ filters: [] })
    .then((devices) => {
      console.log("devices :>> ", devices);
      alerts.innerHTML += JSON.stringify({ ...devices }) + "<hr />"; // "Arduino LLC"
      jsondatahtml.style.color = "green";
    })
    .catch((error) => {
      jsondatahtml.innerHTML += error.message;
      jsondatahtml.style.color = "red";
      console.error(error);
    });
}

const allusb = (d) => {
  navigator.usb.getDevices().then((devices) => {
    console.log(`Total devices: ${devices.length}`);
    devices.forEach((device) => {
      console.log(
        `Product name: ${device.productName}, serial number ${device.serialNumber}`
      );
    });
  });
};

window.onload = function () {
  const button = document.createElement("button");
  button.textContent = "Request USB device";
  button.addEventListener("click", getUSB);
  document.body.appendChild(button);
  allusb();
};
