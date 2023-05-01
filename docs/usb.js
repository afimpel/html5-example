const alerts = document.getElementById("alerts");
const agents = document.getElementById("agents");
const jsondatahtml = document.getElementById("jsondatahtml");

function getUSB() {
  alerts.innerHTML = new Date() + "<hr />";
  navigator.usb
    .requestDevice({ filters: [] })
    .then((device) => {
      console.log("device :>> ", device);
      alerts.innerHTML += `ADD: Product name: ${device.productName}, serial number: <b>${device.serialNumber}`;
      allusb();
      jsondatahtml.style.color = "green";
    })
    .catch((error) => {
      jsondatahtml.innerHTML = new Date() + " :: " + error.message;
      jsondatahtml.style.color = "red";
      console.error(error);
    });
}

const allusb = async (d) => {
  return await navigator.usb
    .getDevices()
    .then((devices) => {
      jsondatahtml.style.color = "green";
      alerts.innerHTML +=
        "<hr />" + `Total devices: <b>${devices.length}</b>` + "<hr />"; // "Arduino LLC"
      console.log(`Total devices: ${devices.length}`);
      devices.forEach((device) => {
        console.log("device :>> ", device);
        alerts.innerHTML +=
          `Product name: <b>${device.productName}</b>, serial number: <b>${device.serialNumber}</b>` +
          "<br />"; // "Arduino LLC"
      });
    })
    .catch((error) => {
      jsondatahtml.innerHTML = new Date() + " :: " + error.message;
      jsondatahtml.style.color = "orange";
      console.error(error);
    });
};

window.onload = function () {
  agents.innerHTML = navigator.userAgent;
  alerts.innerHTML = new Date() + "<hr />";
  jsondatahtml.innerHTML = new Date();
  jsondatahtml.style.display = "";
  const button = document.createElement("button");
  button.textContent = "Request USB device";
  button.addEventListener("click", getUSB);
  document.body.appendChild(button);
  allusb();
};
