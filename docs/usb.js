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
      console.log("devices :>> ", devices);
      alerts.innerHTML += JSON.stringify(devices) + "<hr />"; // "Arduino LLC"
    })
    .catch((error) => {
      jsondatahtml.innerHTML += error.message;
      jsondatahtml.style.color = "red";
      console.error(error);
    });
}

window.onload = function () {
  const button = document.createElement("button");
  button.textContent = "Request USB device";
  button.addEventListener("click", getUSB);
  document.body.appendChild(button);
  getUSB();
};
