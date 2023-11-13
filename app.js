document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultDiv = document.getElementById("result");
  
    function displaySuperheroes(superheroes) {
      const resultString = superheroes
        .map((hero) => `<p>${hero.name} (${hero.alias})</p>`)
        .join("");
      resultDiv.innerHTML = `<h2>Result:</h2>${resultString}`;
    }
  
    function displaySpecificSuperhero(superhero) {
      const specificResultString = `
        <h2>Result:</h2>
        <h3>${superhero.name}</h3>
        <p>A.K.A ${superhero.alias}</p>
        <p>${superhero.biography}</p>`;
      resultDiv.innerHTML = specificResultString;
    }
  
    function displaySuperheroNotFound() {
      resultDiv.innerHTML = "<h2>Result:</h2>\n<h5>SUPERHERO NOT FOUND</h5>";
    }

    searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();
      const sanitizedSearchTerm = encodeURIComponent(searchTerm);
      const url = `/superheroes.php?query=${sanitizedSearchTerm}`;
      fetch(url)
        .then((response) => response.json())
        .then((superheroes) => {

          const specificSuperhero = superheroes.find(
            (hero) =>
              hero.name.toLowerCase() === searchTerm.toLowerCase() ||
              hero.alias.toLowerCase() === searchTerm.toLowerCase()
          );
  
          if (searchTerm === "") {
            displaySuperheroes(superheroes);
          } else if (specificSuperhero) {
            displaySpecificSuperhero(specificSuperhero);
          } else {
            displaySuperheroNotFound();
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  });