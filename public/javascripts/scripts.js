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
        temperature.innerText = `${d.temperature}°`
        illumination.innerText = d.illumination
      }
    } else {
      console.error('No Data')
    }
  });
  xhr.send();

  setTimeout(getData, 5000);
}

getData();