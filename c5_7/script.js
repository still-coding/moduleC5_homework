const btnNode = document.querySelector('.btn');
const resultNode = document.querySelector('.result')

function displayPics(jsonData) {
  let cards = '';      
  jsonData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <a href="${item.download_url}">
          <img src="${item.download_url}" class="card-image"/>
        </a>
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });    
  resultNode.innerHTML = cards;
}


async function fetchPics(url) {
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      displayPics(json);
      localStorage.setItem('myJSON', JSON.stringify(json));
    })
    .catch(() => {
      resultNode.append(
        document.createTextNode("Ошибка при выполнении запроса...")
      )
    });
}


async function btnClick() {
  resultNode.innerHTML = ''

  const pageValue = Number(document.querySelector('.page').value)
  let wrongInput = ""
  if (isNaN(pageValue) || pageValue < 1 || pageValue > 10) {
    wrongInput = "Номер страницы"
  }
  const limitValue = Number(document.querySelector('.limit').value)
  console.log(limitValue)
  if (isNaN(limitValue) || limitValue < 1 || limitValue > 10) {
    wrongInput = wrongInput == "" ? "Лимит" : "Номер страницы и лимит"
  }
  if (wrongInput) {
    resultNode.append(
      document.createTextNode(`${wrongInput} вне диапазона от 1 до 10`)
    )
    return
  }
  await fetchPics(`https://picsum.photos/v2/list?page=${pageValue}&limit=${limitValue}`)
}

btnNode.addEventListener('click', btnClick);

const myJSON = localStorage.getItem('myJSON');
if (myJSON) {
  displayPics(JSON.parse(myJSON))
}
