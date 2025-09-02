const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const result = document.getElementById("result");

async function fetchCharacter(name) {
  result.innerHTML = "⏳ Loading...";
  try {
    const response = await fetch(`https://api.disneyapi.dev/character?name=${name}`);
    const data = await response.json();

    if (data.data.length === 0) {
      result.innerHTML = "⚠️ No character found!";
      return;
    }

    const char = data.data[0];
    displayCharacter(char);
  } catch (error) {
    result.innerHTML = "❌ Error fetching character.";
    console.error(error);
  }
}

async function fetchRandomCharacter() {
  result.innerHTML = "⏳ Loading...";
  try {
    const randomId = Math.floor(Math.random() * 7439) + 1; // Total characters in API
    const response = await fetch(`https://api.disneyapi.dev/character/${randomId}`);
    const data = await response.json();
    displayCharacter(data);
  } catch (error) {
    result.innerHTML = "❌ Error fetching random character.";
    console.error(error);
  }
}

function displayCharacter(char) {
  result.innerHTML = `
    <div class="character">
      <img src="${char.imageUrl || 'https://via.placeholder.com/200'}" alt="${char.name}">
      <h2>${char.name}</h2>
      <p><strong>Films:</strong> ${char.films.length ? char.films.join(", ") : "None"}</p>
      <p><strong>TV Shows:</strong> ${char.tvShows.length ? char.tvShows.join(", ") : "None"}</p>
    </div>
  `;
}

searchBtn.addEventListener("click", () => {
  const name = document.getElementById("searchInput").value.trim();
  if (name) fetchCharacter(name);
});

randomBtn.addEventListener("click", fetchRandomCharacter);
