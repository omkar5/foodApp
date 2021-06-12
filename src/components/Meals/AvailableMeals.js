import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import {useEffect,useState} from 'react';


const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [isError,setError] = useState(null);
  useEffect(()=>{
    const fetchMeals= async()=>{
      const response=await fetch('http://localhost:8080/api/v1/getAllMeals');
      if(!response.ok){
        throw new Error('Something went worng!!');
      }
      const responseData=await response.json();
      const loadedMeals=[];
      for(const key in responseData){
        loadedMeals.push({
          id:responseData[key].id,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
      }
      setMeals(loadedMeals);
    };
    
    fetchMeals().catch((error)=>{
      setError(error.message);
    });
    
      
    
  },[]);
  
  if(isError){
    return (
      <section className={classes.mealsError}>Failed to retrieve data</section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
