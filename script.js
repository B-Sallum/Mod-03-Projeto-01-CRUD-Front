
const API_URL = 'http://localhost:3000';

const frontList = document.getElementById('tapeList');
const inputName = document.getElementById('name');
const inputCategory = document.getElementById('category');
const inputYear = document.getElementById('year');
const inputImgUrl = document.getElementById('imgUrl');
const inputHavePlay = document.getElementById('havePlay');
const inputRating = document.getElementById('rating');
const inputButton = document.getElementById('submitButton');

let isEdit = false;
let editingGame;

const getGamesList = async () => {

  const response = await fetch(API_URL);
  const gamesList = await response.json();

  frontList.innerHTML = "";

  gamesList.map((game) => {
    frontList.insertAdjacentHTML('beforeend', `
    <div class="card-out" style="background-image: url('${game.imgUrl}'); background-size: cover; background-position: center;">
      <div class="card-in">
        <div class="category"><h3>${game.category}</h3></h4>
        <div class="year"><h3>${game.year}</h3></div>
        <div class="name"><h3>${game.name}</h3></div>
        <div class="row">
          <input type="checkbox" name="havePlay" id="havePlay" ${game.havePlay} />
          <input type="number" class="formBox" name="rating" id="rating" value="${game.rating}" />          
        </div>
        <div class="innerButtons">
          <button class="innerButton" onclick="editGame('${game.id}', '${game.name}', '${game.category}', '${game.year}', '${game.imgUrl}')">Edit</h2>
          <button class="innerButton" id="deleteGame" onclick="deleteGame('${game.id}', '${game.name}')">X</h2>
        </div>
      </div>
    </div>
    `);
  });
};

const submitForm = async (event) => {
  event.preventDefault();

  const newName = inputName.value;
  const newCategory = inputCategory.value;
  const newYear = inputYear.value;
  const newImgUrl = inputImgUrl.value;

  const request = new Request(

    isEdit ? `${API_URL}/edit/${editingGame}` : `${API_URL}/new`,

    {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify({
        name: newName,
        category: newCategory,
        year: newYear,
        imgUrl: newImgUrl,
        havePlay: false,
        rating: 0
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    }
  );

  const response = await fetch(request);
  
  if (response.status === 409) {
    const json = await response.json();
    alert(json.message);
    return;
  }
  
  inputName.value = "";
  inputCategory.value = "";
  inputYear.value = "";
  inputImgUrl.value = ""; 
  isEdit = false;
  editingGame = undefined;
  inputButton.style.backgroundColor = "#008f47";
  inputButton.value = "Add New Game";


  getGamesList();
}

const deleteGame = async (gameId, gameName) => {

  const confirmDel = window.confirm(
    `Want to Delete ${gameName}?`
  );

  if (confirmDel) {

    const request = new Request(`${API_URL}/delete/${gameId}`, {
      method: "DELETE",
    });

    await fetch(request);
    getGamesList();
  }
};

const editGame = async (id, name, category, year, imgUrl) => {

  isEdit = true;
  editingGame = id;
  inputButton.value = "Edit Game";
  inputButton.style.backgroundColor = "#FF9000";
  inputName.value = name;
  inputCategory.value = category;
  inputYear.value = year;
  inputImgUrl.value = imgUrl;

}



getGamesList();