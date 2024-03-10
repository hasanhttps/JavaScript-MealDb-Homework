let submit = document.getElementById('search');
let maletxt = document.getElementById('mealName');
let mealname = document.getElementById('name');
let ingredients = document.getElementById('ingredients');
let instructions = document.getElementById('instructions');
let api = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
let img = document.getElementById('mealImg');
let video = document.getElementById('mealVideo');
img.style.visibility = "hidden";

submit.addEventListener('click', () => {
    getMealInfo();
});

async function getMealInfo(){
    const data = await fetch(api + maletxt.value)
        .then(res => res.json()).then(res => res);
    let meal = data.meals != null ? data.meals[0] : null;

    if (meal != null){
        img.style.visibility = "visible";
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;

        ingredients.innerHTML = '<b>Ingredients<br/><br/></b>';
        let i = 1;
        while (meal[`strIngredient${i}`] != ""){
            ingredients.innerHTML += `${i}) ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}<br/>`;
            if (++i == 21) break;
        }
        instructions.innerText = '𝐈𝐧𝐬𝐭𝐫𝐮𝐜𝐭𝐢𝐨𝐧𝐬\n\n';
        instructions.innerText += meal.strInstructions;

        video.src = `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`; 
        mealname.innerText = meal.strMeal;
    }
}