const x = document.getElementById("alerts");
const btn = document.getElementById("getLocation");
const anchor = document.getElementById("links");
const googleMaps = document.getElementById("googleMaps");
const agents = document.getElementById("agents");
const jsondatahtml = document.getElementById("jsondatahtml");

const getData = async () => {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      jsondatahtml.style.color = "green";
      jsondatahtml.innerHTML = JSON.stringify(Object.entries(position));
      showPosition(position);
    } catch (error) {
      x.innerHTML += "<br />" + "No se pudo obtener la ubicación actual";
      if (error.code === error.PERMISSION_DENIED) {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
          linkers("App-Prefs:Privacy&path=LOCATION");
        } else if (navigator.userAgent.indexOf("Android 12") != -1) {
          linkers(
            "intent://#Intent;action=android.settings.LOCATION_SOURCE_SETTINGS;category=android.intent.category.DEFAULT;category=android.intent.category.VOICE_LAUNCH;end"
          );
        } else if (navigator.userAgent.match(/(Android)/)) {
          linkers("location-settings://");
        } else if (navigator.userAgent.match(/(Chrome)/)) {
          linkers("chrome://settings");
        }
        x.innerHTML +=
          "<br />" +
          "Por favor habilite la <b>ubicación</b> en su dispositivo para utilizar esta función.";
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        x.innerHTML +=
          "<br />" +
          "Lo sentimos, no se puede acceder a su ubicación en este momento. Por favor, inténtelo más tarde.";
      } else {
        x.innerHTML +=
          "<br />" +
          "Se produjo un error al intentar acceder a su ubicación. Por favor, inténtelo más tarde.";
      }
      jsondatahtml.style.color = "red";
      jsondatahtml.innerHTML = JSON.stringify(Object.entries(error));
    }
  } else {
    x.innerHTML +=
      "<br />" + "La geolocalización no está soportada por este navegador";
  }
};
const linkers = (links) => {
  anchor.href = links;
  anchor.style.display = "";
  anchor.click();
};

function showPosition(position) {
  x.innerHTML +=
    "<br />" +
    "<em style='color: green;'>" +
    position.timestamp +
    "</em><br />Latitude: <b>" +
    position.coords.latitude +
    "</b><br />Longitude: <b>" +
    position.coords.longitude +
    "</b>";
  googleMaps.href = `https://www.google.com/maps?saddr=My+Location&daddr=${position.coords.latitude},${position.coords.longitude}&dirflg=d`;
}

function getLocation() {
  agents.innerHTML = navigator.userAgent;
  x.innerHTML = "welcome.";
  let navegadosss = true;
  if (navigator.geolocation) {
    navegadosss = false;
    getData();
  }
  if (navigator.permissions) {
    x.innerHTML += "<br />" + "navigator.permissions";
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then((permission) => {
        if (permission.state === "granted") {
          x.innerHTML += "<br />" + "La geolocalización está permitida.";
        } else if (permission.state === "prompt") {
          if (navegadosss) {
            getData();
          }
        }
      })
      .catch((error) => {
        jsondatahtml.style.color = "red";
        jsondatahtml.innerHTML = JSON.stringify(Object.entries(error));
      });
  } else {
    x.innerHTML += "<br />" + "El navegador no admite la API Permissions.";
  }
}

window.onload = function () {
  getLocation();
  btn.addEventListener("click", getLocation);
};
