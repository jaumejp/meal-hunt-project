const apiKey = '?apiKey=3dc3d366720b41a9bcd7c6b7df76cc12'

/**
 * Given the data of the user, creats an specific end point for the api
 * Api documentation: https://spoonacular.com/food-api/docs#Generate-Meal-Plan 
 * @param {*} data 
 * @returns end point url
 */
export function mealPrepEndPoint(data) {

    data.diet === 'No Preference' ? data.diet = '' : data.diet
    const exclusions = [...data.foods, ...data.intolerances].toString().toLocaleLowerCase()
    const kcal = calculateKcal(data)

    const qty = 'week'
    const endPoint = `https://api.spoonacular.com/mealplanner/generate${apiKey}&timeFrame=${qty}&targetCalories=${kcal}&diet=${data.diet}&exclude=${exclusions}`

    return endPoint
}

/**
 * Given the id of the recipe generates the end point to get all the information of 
 * the specific recipe.
 * Api documentation: https://spoonacular.com/food-api/docs#Get-Recipe-Information
 * @param {*} id 
 * @returns 
 */
export function createRecipeEndPointOf(id) {

    const endPoint = `https://api.spoonacular.com/recipes/${id}/information${apiKey}&includeNutrition=false`;
    
    return endPoint;
}

/**
 * Given the data of the user, returns the daily kcals needed 
 * @param {*} user 
 * @returns 
 */
function calculateKcal(user) {
    /*
        Hombres TMB = (10 x peso de Kg) + (6,25 x altura en cm) – (5 x edad en años) + 5
        Mujeres TMB = (10 x peso en kg) + (6,25 x altura en cm) – (5 x edad en años) – 161
    */

    // Calculate "AMR" -> active metabolic rate
    let TMB = (10 * user.weight) + (6.25 * user.height) - (5 * user.age)

    // Add the proportion for genere
    user.gender === 'male' ? TMB += 5 : TMB -= 161;

    // If for some reason it a strange number, return 1500.
    if (TMB < 500) return 1500;

    // Add the kcal burned by fitness activity: 
    switch (user.dailyActivity) {
        case "sedentary": 
            TMB *= 1.2;
            break;
        case "light-activity": 
            TMB *= 1.375;
            break;
        case "moderate-activity": 
            TMB *= 1.55;
            break;
        case "very-active": 
            TMB *= 1.725;
            break;
        case "extra-active": 
            TMB *= 1.9;
            break;

    }

    // Add the kcal burned at work.
    TMB +=  parseInt(user.kcalProfession)

    // Rest the caloric deficil:
    TMB -= parseInt(user.dietIntensity)

    TMB = Math.round(TMB)

    return TMB     
}


  