const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEL = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEL = document.getElementById("single-meal");

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEL.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
           ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
           ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
            </ul>
        </div>
    </div>
    
    `;
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      console.log(meal);
      addMealToDOM(meal);
    });
}

function searchMeal(e) {
  e.preventDefault();

  // clear single meal
  single_mealEL.innerHTML = "";

  // get search term
  const term = search.value;
  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try Again!</p>`;
        } else {
          mealsEL.innerHTML = data.meals
            .map(
              (meal) => `
                  <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h4>${meal.strMeal}</h4>
                    </div>
                </div>
                `
            )
            .join("");
        }
      });

    // clear search text
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

function getRandomMeal() {
  // clear meals & heading
  mealsEL.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEL.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealById(mealID);
  }
});
