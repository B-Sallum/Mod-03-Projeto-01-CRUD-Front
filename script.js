const frontList = document.getElementById('tapeList');
const apiUrl = 'http://localhost:3000/';

const getGamesList = async () => {
  const response = await fetch(apiUrl);
  const gamesList = await response.json();
  console.log(gamesList);
  gamesList.map((game) => {
    frontList.insertAdjacentHTML('beforeend', `
    <div class="card" style="background-image: url('${game.imgUrl}'); background-size: cover; background-position: center;">
      <div class="card-info">
        <h3 class="title">${game.name}</h3>
        <div class="year-rating">
          <div class="year">${game.year}</div>
          <div class="rating">${game.rating}</div>
        </div>
        <div class="category">${game.category}</div>
      </div>
    </div>
    `);
  });
};

getGamesList();

// ${game.id}
// ${game.name}
// ${game.category}
// ${game.year}
// ${game.imgUrl}
// ${game.havePlay}
// ${game.rating}