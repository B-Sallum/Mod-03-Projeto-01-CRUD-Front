
const API_URL = 'http://localhost:3000/';

const frontList = document.getElementById('tapeList');

const getGamesList = async () => {

  const response = await fetch(API_URL);
  const gamesList = await response.json();

  gamesList.map((game) => {
    frontList.insertAdjacentHTML('beforeend', `
    <div class="card-out" style="background-image: url('${game.imgUrl}'); background-size: cover; background-position: center;">
      <div class="card-in">
        <input type="hidden" id="${game.id}">
        <div class="category"><h3>${game.category}</h3></h4>
        <div class="year"><h3>${game.year}</h3></div>
        <div class="name"><h3>${game.name}</h3></div>
        <div class="row">
          <input type="checkbox" name="havePlay" id="havePlay" ${game.havePlay} />
          <input type="number" class="formBox" name="rating" id="rating" value="${game.rating}" />          
        </div>
      </div>
    </div>
    `);
  });
};

getGamesList();

