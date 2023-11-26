// API endpoints
const mealTypeUrl = "https://api.edamam.com/api/recipes/v2?app_id=c020ed14&app_key=966338ac1fe900cc58ead0ba64203c79&type=public&dishType=Main%20course&random=true&mealType="
const recipeUrl = "https://api.edamam.com/api/recipes/v2?app_id=c020ed14&app_key=966338ac1fe900cc58ead0ba64203c79&random=true&type=public&q="
const nutritionUrl = "https://api.edamam.com/api/nutrition-data?app_id=27020b61&app_key=d38a0752cb2f5698ec1559bda78543c8&ingr="

// Retrieves random recipes based on meal type and updates the page (Feature 1)
async function getRecipesByMealType(mealType) {
    try {
        const mealTypeRecipes = await getResponseFromApi(mealTypeUrl, mealType)
        displayRecipe(mealTypeRecipes)
    } catch (err) {
        // If any errors with API or updating Html, log error to console
        console.error(err)
    }
}

// Retrieves recipe information from the API and updates the page (Feature 2)
async function getRecipes() {
    try {
        const ingredient = document.getElementById("ingredientSearch").value
        const recipes = await getResponseFromApi(recipeUrl, ingredient)
        displayRecipe(recipes)
    } catch (err) {
        // If any errors with API or updating Html, log error to console
        console.error(err)
    }
}

// Retrieves nutrition information from the API and updates the page (Feature 3)
async function getNutrition() {
    try {
        const ingredient = document.getElementById("nutritionSearch").value
        const responseSection = document.getElementById("responseDiv")

        // Ensures response section is empty before adding new content
        responseSection.innerHTML = ""

        if (!ingredient) {
            responseSection.innerHTML = "<h2>No entry found. Please try again</h2>"
        } else {
            const nutrition = await getResponseFromApi(nutritionUrl, ingredient)

            // If response has a total weight of zero then return message as ingredient not found
            // otherwise populate nutrition table
            if (nutrition.totalWeight === 0) {
                responseSection.innerHTML = "<h2>No entry found. Please try again</h2>"
            } else {
                responseSection.innerHTML = `
            <h2 class="nutritionTitle">Nutritional Information</h2>
            <table>
                <tr>
                    <td class="left-align">Calories:</td><td class="right-align">${nutrition.calories?.toFixed(2) ?? 0}</td>
                </tr>
                <tr>
                    <td class="left-align">Fat:</td><td class="right-align">${nutrition.totalNutrients.FAT?.quantity.toFixed(2) ?? 0}${nutrition.totalNutrients.FAT?.unit ?? "g"}</td>
                </tr>
                <tr>
                    <td class="left-align">Sugar:</td><td class="right-align">${nutrition.totalNutrients.SUGAR?.quantity.toFixed(2) ?? 0}${nutrition.totalNutrients.SUGAR?.unit ?? "g"}</td>
                </tr>
                <tr>
                    <td class="left-align">Carbohydrates:</td><td class="right-align">${nutrition.totalNutrients.CHOCDF?.quantity.toFixed(2) ?? 0}${nutrition.totalNutrients.CHOCDF?.unit ?? "g"}</td>
                </tr>
                <tr>
                    <td class="left-align">Fibre:</td><td class="right-align">${nutrition.totalNutrients.FIBTG?.quantity.toFixed(2) ?? 0}${nutrition.totalNutrients.FIBTG?.unit ?? "g"}</td>
                </tr>
                <tr>
                    <td class="left-align">Protein:</td><td class="right-align">${nutrition.totalNutrients.PROCNT?.quantity.toFixed(2) ?? 0}${nutrition.totalNutrients.PROCNT?.unit ?? "g"}</td>
                </tr>
                <tr>
                    <td class="left-align">Salt:</td><td class="right-align">${nutrition.totalNutrients.NA?.quantity.toFixed(2) ?? 0}${nutrition.totalNutrients.NA?.unit ?? "g"}</td>
                </tr>
            </table>`
            }
        }
    } catch (err) {
        // If any errors with API or updating Html, log error to console
        console.error(err)
    }
}

// Reusable function to call APIs and return response as JSON
async function getResponseFromApi(url, param) {
    const response = await fetch(`${url}${param}`)
    const data = await response.json()
    return data
}

function displayRecipe(recipes) {
    const responseSection = document.getElementById("responseDiv")
    // Ensures response section is empty before adding new content
    responseSection.innerHTML = ""

    // If no matching recipes are found then return message 
    // otherwise loop through recipes and insert into the div

    if (recipes.count === 0) {
        responseSection.innerHTML = "<h2>No entry found. Please try again</h2>"
    } else {
        for (let i = 0; i < recipes.hits.length; i++) {
            responseSection.innerHTML += `<h2>${recipes.hits[i].recipe.label}</h2>`
            responseSection.innerHTML += `<div><img src="${recipes.hits[i].recipe.images.SMALL.url}" alt="recipe photo"></div>`
            responseSection.innerHTML += `<p class="links"><a href="${recipes.hits[i].recipe.url}">Click here for the recipe</a></p>`
        }
    }
}
