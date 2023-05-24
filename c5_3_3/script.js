function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };
  
  const resultNode = document.querySelector('.j-result');
  const btnNode = document.querySelector('.j-btn-request');


  function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="https://cataas.com/cat/${item._id}"
            class="card-image"
          />
          <p>${item.tags[0]}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
  }
  
function btnClick() {
  resultNode.innerHTML = ''
  const inputValue = Number(document.querySelector('input').value);
  if (isNaN(inputValue) || inputValue < 1 || inputValue > 10) {
    resultNode.append(
      document.createTextNode('Число вне диапазона от 1 до 10')
    )
    return
  }
  useRequest(`https://cataas.com/api/cats?limit=${inputValue}`, displayResult);
}


btnNode.addEventListener('click', btnClick);
