export const fetchRecipes = async(query = "")=>{ //using query becasue when we filter any item in api we dont use it call every item
    try{
        const res =await fetch
    (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    {cache:"no-store"}//cache for displaying unnesseary data like it give everything
    );
    const data = await res.json();
    return data.meals  || [];//when no item in recipe we can handle so we can writen empty array.
    }catch(err){
        console.log("error handling data:",err);
        return [];
    }
};