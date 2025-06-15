const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");
const modeToggle = document.getElementById("modeToggle");

modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", modeToggle.checked);
});

searchBtn.addEventListener("click", () => {
  const word = searchInput.value.trim();
  if (word !== "") {
    fetchWord(word);
  }
});

async function fetchWord(word) {
  resultDiv.innerHTML = "Loading...";
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (data.title) {
      resultDiv.innerHTML = `<p>No results found for <strong>${word}</strong>.</p>`;
      return;
    }

    const entry = data[0];
    const phonetic = entry.phonetic || "";
    const meanings = entry.meanings
      .map(m => `
        <h4>${m.partOfSpeech}</h4>
        <ul>${m.definitions.map(d => `<li>${d.definition}</li>`).join("")}</ul>
      `).join("");

    const audio = entry.phonetics.find(p => p.audio);

    resultDiv.innerHTML = `
      <h2>${entry.word}</h2>
      <p>${phonetic}</p>
      ${audio ? `<audio controls src="${audio.audio}"></audio>` : ""}
      ${meanings}
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p>Error fetching data.</p>`;
  }
}
