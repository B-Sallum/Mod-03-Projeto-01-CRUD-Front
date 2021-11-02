const frontList = document.getElementById('tapeList');
const apiUrl = 'http://localhost:3000/';

const getGamesList = async () => {
  const response = await fetch(apiUrl);
  const gamesList = await response.json();
  console.log(gamesList);
  gamesList.map((game) => {
    frontList.insertAdjacentHTML('beforeend', `
    <div class="card-out" style="background-image: url('${game.imgUrl}'); background-size: cover; background-position: center;">
      <div class="card-in">
        <div class="category"><h3>${game.category}</h3></h4>
        <div class="year"><h3>${game.year}</h3></div>
        <div class="rating"><h3>${game.rating}</h3></div>
        <div class="name"><h3>${game.name}</h3></div>
      </div>
    </div>
    `);
  });
};

const gamePlay = () => {
  
}

getGamesList();

// ${game.id}
// ${game.name}
// ${game.category}
// ${game.year}
// ${game.imgUrl}
// ${game.havePlay}
// ${game.rating}