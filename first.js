let apiKey = "474dbc39af1042cfae74eb1a4d4f5ce5";
let cardDeta = document.querySelector(".card-deta");
let searchBtn = document.querySelector("#search-btn");
let inputData = document.querySelector("#input-data");
let searhType = document.querySelector("#type");

const getData = async (input) => {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}`
    );
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status}`);
    }
    let jsonData = await res.json();
    console.log(jsonData.articles[0]);

    searhType.innerText = "Search : " + input;
    inputData.value = "";
    cardDeta.innerHTML = "";

    jsonData.articles.forEach(function (article) {
      console.log(article);

      let divs = document.createElement("div");
      divs.classList.add("card");
      cardDeta.appendChild(divs);

      let imageString = '<img src="' + article.urlToImage + '" alt="">';
      let h3String = "<h3>" + article.title + "</h3>";
      let pString = "<p>" + article.description + "</p>";
      divs.innerHTML = imageString + h3String + pString;

      divs.addEventListener("click", function () {
        window.open(article.url);
      });
    });
  } catch (error) {
    console.error("Error:", error);
    // Handle errors gracefully, e.g., display an error message to the user
  }
};

window.addEventListener("load", function () {
  getData("World");
});

searchBtn.addEventListener("click", function () {
  let inputText = inputData.value;
  getData(inputText);
});

function navClick(navName) {
  const navElements = document.querySelectorAll("#politics, #sports, #technology");
  navElements.forEach((nav) => (nav.style.color = "white"));

  document.querySelector(`#${navName}`).style.color = "Blue";
  getData(navName);
}
