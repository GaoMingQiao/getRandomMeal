const btn = document.querySelector(".btn-outline-danger");
const container = document.querySelector(".container");

const renderRecette = function (data) {
  const ingredientPlusMesure = [];
  let param = data.meals[0].strYoutube.slice(-11);
  console.log(param);
  for (let i = 0; i <= 20; i++) {
    let ingredient = data.meals[0][`strIngredient${i}`];
    let mesure = data.meals[0][`strMeasure${i}`];

    if (ingredient && mesure) {
      ingredientPlusMesure.push(`${ingredient}: ${mesure}`);
    }
  }
  console.log(ingredientPlusMesure);
  const str = (document.querySelector(".ingre").innerHTML = ingredientPlusMesure
    .map((item) => {
      console.log(item);
      return `
    <ul>
    <li>${item}</li>
    </ul>
    `;
    })
    .join(""));

  // const str = ingredientPlusMesure.join("\r\n");
  // console.log(str);
  const html = `
    <div class="row gx-4 gx-lg-5 align-items-center">
    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="${data.meals[0].strMealThumb}" alt="recette" /></div>
    <div class="my-3 text-center">
    <a class="btn btn-outline-danger flex-shrink-0 px-5" type="button" href = "${data.meals[0].strYoutube}" target='_blanc'>
    <i class="fa-brands fa-youtube"></i>
    </a>
    </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${param}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <div class="col-md-6">
   
        <h1 class="display-5 fw-bolder">name: ${data.meals[0].strMeal}</h1>
        <div class="fs-5 mb-5">
            <span> country: ${data.meals[0].strArea} </span>
        </div>
        <p class="lead">instructions: <br>${data.meals[0].strInstructions}</p>
        
       
        <p class="lead ingre"> ingredients: ${str} </p>
        

        </div>
    </div>
    `;

  container.insertAdjacentHTML("beforeend", html);
};

const getRecette = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const data = await response.json();

  console.log({ data });

  renderRecette(data);
};

getRecette();
btn.addEventListener("click", () => {
  if (container.firstElementChild) container.firstElementChild.remove();
  getRecette();
});
