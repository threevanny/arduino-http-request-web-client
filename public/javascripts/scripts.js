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
const tagTemperature = document.getElementById('tagTemperature')
const tagIllumination = document.getElementById('tagIllumination')

function getData() {
  let xhr
  if (window.XMLHttpRequest) xhr = new XMLHttpRequest()
  else xhr = new ActiveXObject("Microsoft.XMLHTTP")

  xhr.open('GET', '/getdata')

  xhr.addEventListener('load', (data) => {
    const dataJSON = JSON.parse(data.target.response);
    if (dataJSON.length != 0) {
      for (const d of dataJSON) {
        console.log(`Temp:${d.temperature}, illum:${d.illumination}`)
        if (d.temperatur === -404) {
          temperature.innerText = `No Data`
        } else {
          tagTemperature.innerHTML = ""
          temperature.innerText = `${d.temperature}°`
          if (d.temperature <= 15)
            tagTemperature.innerHTML += `<span class="tag is-info">Baja</span>`
          else if (d.temperature <= 25)
            tagTemperature.innerHTML += `<span class="tag is-warning">Regular</span>`
          else if (d.temperature > 25)
            tagTemperature.innerHTML += `<span class="tag is-success">Alta</span>`
          else
            tagTemperature.innerHTML += `<span class="tag is-light">Normal</span>`
        }
        if (d.illumination === -404) {
          illumination.innerText = `No Data`
        } else {
          tagIllumination.innerHTML = ""
          illumination.innerText = d.illumination
          if (d.illumination <= 35)
            tagIllumination.innerHTML += `<span class="tag is-danger">Baja</span>`
          else if (d.illumination <= 50)
            tagIllumination.innerHTML += `<span class="tag is-warning">Regular</span>`
          else if (d.illumination > 50)
            tagIllumination.innerHTML += `<span class="tag is-success">Alta</span>`
          else
            tagIllumination.innerHTML += `<span class="tag is-light">Normal</span>`
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