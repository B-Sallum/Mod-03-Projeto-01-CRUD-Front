const frontList = document.getElementById('list');
const apiUrl = 'http://localhost:3000/';

const getGamesList = async () => {
  const response = await fetch(apiUrl);
  const gamesList = await response.json();
  console.log(gamesList);
  gamesList.map((game) => {
    frontList.insertAdjacentHTML('beforeend', `
    <div class="card">
      <img src="${game.imgUrl}" alt="">
      <h2 class="title">${game.name}</h2>
      <div class="year">${game.year}</div>
      <div class="category">${game.category}</div>
    </div>
    `);
  });
};

getGamesList();