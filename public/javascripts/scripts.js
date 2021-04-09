document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

const temperature = document.getElementById('temperature')
const illumination = document.getElementById('illumination')

function getData() {
  let xhr
  if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
  else xhr = new ActiveXObject("Microsoft.XMLHTTP")

  xhr.open('GET', '/getdata')

  xhr.addEventListener('load', (data) => {
    const dataJSON = JSON.parse(data.target.response);
    if (dataJSON.length != 0) {
      for (const d of dataJSON) {
        console.log(`T:${d.temperature}, i:${d.illumination}`)
        if (d.temperatur === -404) {
          temperature.innerText = `No Data`
        } else {
          temperature.innerText = `${d.temperature}°`
        }
        if (d.illumination === -404) {
          illumination.innerText = `No Data`
        } else {
          illumination.innerText = d.illumination
        }
      }
    } else {
      console.error('No Data')
    }
  });
  xhr.send();

  setTimeout(getData, 5000);
}

getData();