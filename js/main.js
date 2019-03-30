let coin = 0;

const addCoin = () => {
  let coinCount = document.getElementById('coin-count');
  let add = document.getElementById('add');
  let start = document.getElementById('start');
  coin++;
  coinCount.innerHTML = coin + "/4";
  if (coin == 4) {
    add.style.display = "none";
    start.style.display = "block";
    start.style.animation = "fade 2s ease-in-out"
  }
}
