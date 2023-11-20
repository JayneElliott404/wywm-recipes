const recipeUrl = "https://api.edamam.com/api/recipes/v2?app_id=c020ed14&app_key=966338ac1fe900cc58ead0ba64203c79&type=public&q="
const nutritionUrl = "https://api.edamam.com/api/nutrition-data?app_id=27020b61&app_key=d38a0752cb2f5698ec1559bda78543c8&ingr="

// Retrieves recipe information from the API and passes it back to the website
async function getRecipes() {
    try {
        const ingredient = document.getElementById("ingredientSearch").value
        const recipes = await getResponseFromApi(recipeUrl, ingredient)
        const responseSection = document.getElementById("responseDiv")
        responseSection.innerHTML = ""

        if (recipes.count === 0) {
            responseSection.innerHTML = "<h2>No entry found. Please try again</h2>"
        } else {
            for (let i = 0; i < recipes.hits.length; i++) {
                responseSection.innerHTML += `<h2>${recipes.hits[i].recipe.label}</h2>`
                responseSection.innerHTML += `<div><img src="${recipes.hits[i].recipe.images.SMALL.url}" alt="recipe photo"></div>`
                responseSection.innerHTML += `<a href="${recipes.hits[i].recipe.url}">Click here for the recipe</a>`
            }
        }
    } catch (err) {
        console.error(err)
    }
}

// Retrieves nutrition information from the API and passes it back to the website
async function getNutrition() {
    try {
        const ingredient = document.getElementById("nutritionSearch").value
        const nutrition = await getResponseFromApi(nutritionUrl, ingredient)
        const responseSection = document.getElementById("responseDiv")
        responseSection.innerHTML = ""

        if (nutrition.calories === 0) {
            responseSection.innerHTML = "<h2>No entry found. Please try again</h2>"
        } else {
            responseSection.innerHTML = `
            <h2 class="nutritionalTitle">Nutritional Information</h2>
            <table>
                <tr>
                    <td class="left-align">Calories:</td><td class="right-align">${nutrition.calories.toFixed(2)}</td>
                </tr>
                <tr>
                    <td class="left-align">Fat:</td><td class="right-align">${nutrition.totalNutrients.FAT.quantity.toFixed(2)}${nutrition.totalNutrients.FAT.unit}</td>
                </tr>
                <tr>
                    <td class="left-align">Sugar:</td><td class="right-align">${nutrition.totalNutrients.SUGAR.quantity.toFixed(2)}${nutrition.totalNutrients.SUGAR.unit}</td>
                </tr>
                <tr>
                    <td class="left-align">Carbohydrates:</td><td class="right-align">${nutrition.totalNutrients.CHOCDF.quantity.toFixed(2)}${nutrition.totalNutrients.CHOCDF.unit}</td>
                </tr>
                <tr>
                    <td class="left-align">Fibre:</td><td class="right-align">${nutrition.totalNutrients.FIBTG.quantity.toFixed(2)}${nutrition.totalNutrients.FIBTG.unit}</td>
                </tr>
                <tr>
                    <td class="left-align">Protein:</td><td class="right-align">${nutrition.totalNutrients.PROCNT.quantity.toFixed(2)}${nutrition.totalNutrients.PROCNT.unit}</td>
                </tr>
                <tr>
                    <td class="left-align">Salt:</td><td class="right-align">${nutrition.totalNutrients.NA.quantity.toFixed(2)}${nutrition.totalNutrients.NA.unit}</td>
                </tr>
            </table>`
        }
    } catch (err) {
        console.error(err)
    }
}

async function getResponseFromApi(url, ingredient) {
    const response = await fetch(`${url}${ingredient}`)
    const data = await response.json()
    return data
}
