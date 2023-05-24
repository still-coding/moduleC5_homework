const btnNode = document.querySelector('.btn');
const resultNode = document.querySelector('.result')

async function loadPic(url) {
  let response = await fetch(url)
  if (response.status === 200) {
    const imageBlob = await response.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    const image = document.createElement('img')
    image.src = imageObjectURL
    resultNode.append(image)
  }
  else {
      console.log("HTTP-Error: " + response.status)
  }
}

function isValueCorrect(value) {
  return !isNaN(value) && value >= 100 && value <= 300
}

async function btnClick() {
  const widthValue = Number(document.querySelector('.width').value)
  const heightValue = Number(document.querySelector('.height').value)
  resultNode.innerHTML = ''
  if (isValueCorrect(widthValue) && isValueCorrect(heightValue))
    await loadPic(`https://picsum.photos/${widthValue}/${heightValue}`)
  else {
    resultNode.append(
      document.createTextNode("Одно из чисел вне диапазона от 100 до 300")
    )
  }
}

btnNode.addEventListener('click', btnClick);

