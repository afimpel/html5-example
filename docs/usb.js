const alerts = document.getElementById("alerts");
const agents = document.getElementById("agents");
const jsondatahtml = document.getElementById("jsondatahtml");
const jsonlisthtml = document.getElementById("jsonlisthtml");

function getUSB() {
  alerts.innerHTML = new Date() + "<hr />";
  navigator.usb
    .requestDevice({ filters: [] })
    .then((device) => {
      alerts.innerHTML += "ADD: " + newDevice(device) + "<hr />"; // "Arduino LLC"
      allusb();
      jsondatahtml.style.color = "green";
    })
    .catch((error) => {
      jsondatahtml.innerHTML = new Date() + " :: " + error.message;
      jsondatahtml.style.color = "red";
      console.error(error);
    });
  alerts.innerHTML += "<hr />";
}

const allusb = async (d) => {
  jsonlisthtml.innerHTML = "";
  return await navigator.usb
    .getDevices()
    .then((devices) => {
      jsondatahtml.style.color = "green";
      alerts.innerHTML +=
        "" + `Total devices: <b>${devices.length}</b>` + "<hr />"; // "Arduino LLC"
      console.log(`Total devices: ${devices.length}`);
      devices.forEach((device) => {
        jsonlisthtml.innerHTML += "<ul>"+newDevice(device) + "</ul>"; // "Arduino LLC"
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
  alerts.innerHTML = `${new Date()}<hr />`;
  jsondatahtml.innerHTML = new Date();
  jsondatahtml.style.display = "";
  const button = document.createElement("button");
  button.textContent = "Request USB device";
  button.addEventListener("click", getUSB);
  document.body.appendChild(button);
  allusb();
};
function newDevice(device) {
  console.log(`device: ${device.productName} >> `, device);
  console.table(device);
  let output = "";
  output += `manufacturerName: <b>${device.manufacturerName}</b>, `;
  output += `productName: <b>${device.productName}</b>, `;
  output += `serialNumber: <b>${device.serialNumber}</b>, `;
  output += `vendorId: <b>${device.vendorId}</b>, `;
  output += `productId: <b>${device.productId}</b>.`;
  return output;
}

/**
 * 
 * deviceClass : 0
deviceProtocol : 0
deviceSubclass : 0
deviceVersionMajor : 1
deviceVersionMinor : 0
deviceVersionSubminor : 0
manufacturerName : "Hewlett-Packard"
opened : false
productId : 22039
productName : "HP LaserJet M1120 MFP"
serialNumber : "268e2j47dt9euAn6"
usbVersionMajor : 2
usbVersionMinor : 0
usbVersionSubminor : 0
vendorId : 1008
 * 
 */
