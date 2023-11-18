// Retrieves recipe information from the API and passes it back to the website
async function getRecipes() {
    const ingredient = document.getElementById("ingredientSearch").value
    const recipes = await getResponseFromApi(recipeUrl, ingredient)
    const responseSection = document.getElementById("responseDiv")
    responseSection.innerHTML = ""

    for (let i = 0; i < recipes.hits.length; i++) {
        responseSection.innerHTML += `<h2>${recipes.hits[i].recipe.label}</h2>`
        responseSection.innerHTML += `<img src="${recipes.hits[i].recipe.images.SMALL.url}" alt="recipe photo">`
        responseSection.innerHTML += `<a href="${recipes.hits[i].recipe.url}">Click here for the recipe</a>`
    }
}

const recipeUrl = "https://api.edamam.com/api/recipes/v2?app_id=c020ed14&app_key=966338ac1fe900cc58ead0ba64203c79&type=pubtdc&q="
const nutritionUrl = "https://api.edamam.com/api/nutrition-data?app_id=27020b61&app_key=d38a0752cb2f5698ec1559bda78543c8&ingr="

async function getResponseFromApi(url, ingredient) {
    const response = await fetch(`${url}${ingredient}`)
    const data = await response.json()
    return data
}

// Retrieves nutrition information from the API and passes it back to the website
async function getNutrition() {
    const ingredient = document.getElementById("nutritionSearch").value
    const nutrition = await getResponseFromApi(nutritionUrl, ingredient)
    const responseSection = document.getElementById("responseDiv")
    responseSection.innerHTML = ""


    responseSection.innerHTML += `
    <h2 class="nutritionalTitle">Nutritional Information</h2>
    <table>
        <tr>
            <td>Calories:</td><td>${nutrition.calories}</td>
        </tr>
        <tr>
            <td>Fat:</td><td>${nutrition.totalNutrients.FAT.quantity}${nutrition.totalNutrients.FAT.unit}</td>
        </tr>
        <tr>
            <td>Sugar:</td><td>${nutrition.totalNutrients.SUGAR.quantity}${nutrition.totalNutrients.SUGAR.unit}</td>
        </tr>
        <tr>
            <td>Carbohydrates:</td><td>${nutrition.totalNutrients.CHOCDF.quantity}${nutrition.totalNutrients.CHOCDF.unit}</td>
        </tr>
        <tr>
            <td>Fibre:</td><td>${nutrition.totalNutrients.FIBTG.quantity}${nutrition.totalNutrients.FIBTG.unit}</td>
        </tr>
        <tr>
            <td>Protein:</td><td>${nutrition.totalNutrients.PROCNT.quantity}${nutrition.totalNutrients.PROCNT.unit}</td>
        </tr>
        <tr>
            <td>Salt:</td><td>${nutrition.totalNutrients.NA.quantity}${nutrition.totalNutrients.NA.unit}</td>
        </tr>
    </table>`
}
