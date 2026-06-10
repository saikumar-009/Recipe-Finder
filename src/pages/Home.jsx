import React,{useState, useEffect} from 'react'
import { fetchRecipes } from '../utils/api';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import "./Home.css";
import RecipeModal from '../components/RecipeModal';
import SearchBar from '../components/SearchBar';

const Home = ({resetHome}) => {
  const [chickenRecipes,setChickenRecipes] = useState([]);
  const[soupRecipes,setSoupRecipes] = useState([]);
  const[exploreAll,setExploreAll] = useState([]);
  const[visibleCount,setVisibleCount] = useState(15);
  const[loading, setLoading] = useState(true);
  const[selectedRecipe, setSelectedRecipe] = useState(null);//clicking deatile recipe
 
  const[searchQuery,setSearchQuery] = useState("")
  const[recipes,setRecipes] = useState([])

/* checking for data is comeing or not
useEffect(()=>{
   console.log(selectedRecipe);
},[selectedRecipe])

*/

  useEffect(()=>{
    setSearchQuery("");
    setRecipes([]);
  },[resetHome])

  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true);
        const chicken = await fetchRecipes("chicken")
        setChickenRecipes(chicken.slice(0, 6));
        const soup = await fetchRecipes("soup")
        setSoupRecipes(soup.slice(0, 6));
        const all = await fetchRecipes("a");
        setExploreAll(all);
        setLoading(false);
    }
    fetchData();
  },[])

  const handleSearch = async(query)=>{
    setSearchQuery(query)

    if (query.trim() === "") return
    setLoading(true)
    const result = await fetchRecipes(query)
    setRecipes(result);
    setLoading(false);
  }
const clearSearch = ()=>{
  setSearchQuery("");
  setRecipes([]);
}
  const showMore = ()=>{
    setVisibleCount((prev)=> prev + 5);
  }
  if(loading) return <Loader/>
  return (
    <div className="home-container" > 
    <SearchBar onSearch={handleSearch} onClear={clearSearch} />
   {
    searchQuery ? (<div className='section' >
      <h2>search Results for "{searchQuery}"</h2>
      {
        recipes.length > 0 ? (
          <div className='recipe-grid' >
            {
              recipes.map((r)=>(
                <RecipeCard key={r.idMeal} recipe={r} onClick={() => setSelectedRecipe(r)} />
              ))
            } </div>
        ):(
          <p>no recipe found for "{searchQuery}"</p>
        )
      }
    </div>):(
    <>
     <div className='section' >
      <h2>chicken Recipes</h2>
      <div className='recipe-grid' >
        {
          chickenRecipes.map((r)=>(
              <RecipeCard key={r.idMeal} recipe={r} selected={setSelectedRecipe}/> //sending prop to recipecard 
          ))
        }
      </div>
    </div> 

    <div className='section' >
      <h2>soup Recipes</h2>
      <div className='recipe-grid' >
        {
          soupRecipes.map((r)=>(
              <RecipeCard key={r.idMeal} recipe={r}  selected={setSelectedRecipe} />
          ))
        }
      </div>
    </div> 

    <div className='section' >
      <h2>Explore All Recipes</h2>
      <div className='recipe-grid' >
        {
          exploreAll.slice(0, visibleCount).map((r)=>(
              <RecipeCard key={r.idMeal} recipe={r} selected={setSelectedRecipe} />
          ))
        }
      </div>
      {
        visibleCount < exploreAll.length && <button onClick={showMore}  className='load-more' >Show More</button>
      }
    </div> 
    </>)
   }
    {
      selectedRecipe && (
        <RecipeModal recipe={selectedRecipe}  onClose={()=>setSelectedRecipe(null) } />
      )
    }
    </div>
  )
}

export default Home