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
    .then((device) => {
      console.log("device :>> ", device);
      alerts.innerHTML +=
        `Product name: ${device.productName}, serial number: <b>${device.serialNumber}` +
        "<br />"; // "Arduino LLC"
      jsondatahtml.style.color = "green";
    })
    .catch((error) => {
      jsondatahtml.innerHTML += "<br />" + error.message;
      jsondatahtml.style.color = "red";
      console.error(error);
    });
}

const allusb = (d) => {
  navigator.usb.getDevices().then((devices) => {
    jsondatahtml.innerHTML +=
      `Total devices: <b>${devices.length}</b>` + "<hr />"; // "Arduino LLC"
    console.log(`Total devices: ${devices.length}`);
    devices.forEach((device) => {
      console.log("device :>> ", device);
      jsondatahtml.innerHTML +=
        `Product name: <b>${device.productName}</b>, serial number: <b>${device.serialNumber}</b>` +
        "<br />"; // "Arduino LLC"
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
