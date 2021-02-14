const currencyElement_one = document.getElementById('currency-one');
const amountElement_one = document.getElementById('amount-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rate and update the DOM
function calculate () {
  // get request
  const currency_one = currencyElement_one.value;
  const currency_two = currencyElement_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
  // jsonファイルを取得する
  .then(res => res.json())
  .then(data => {
    // dataを使用した処理を実行する
    const rate = data.rates[currency_two];
    rateElement.innerText = ` 1 ${currency_one} = ${rate} ${currency_two}`;
    amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
  });
}

// Event listeners
currencyElement_one.addEventListener('change', calculate);
amountElement_one.addEventListener('input', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_two.addEventListener('input', calculate);

// 変換するボタン
swap.addEventListener('click', () => {
  // 変換する前にcurrencyElement_oneの値を一時的に定数temporaryに格納しておく
  const temporary = currencyElement_one.value;
  // currencyElement_oneとcurrencyElement_twoの値を入れ替える
  currencyElement_one.value = currencyElement_two.value;
  // currencyElement_twoの値を定数temporaryに格納する
  currencyElement_two.value = temporary;
  calculate();
});

calculate();


