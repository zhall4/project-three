import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [joke, setJoke] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("dev");

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((category) => {
          return !"explicit religion political".includes(category);
        });
        setCategories(data);
      })
      .catch((error) => console.log(error));

    getJoke("dev");
  }, []);

  function getJoke(category = "dev") {
    let url = `https://api.chucknorris.io/jokes/random?category=${category}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setJoke(data.value))
      .catch((error) => console.log(error));
  }

  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
    getJoke(category);
  }

  return (
    <div className="App">
      <h1>Chuck Norris Facts</h1>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <p>{joke}</p>
      <button onClick={() => getJoke(selectedCategory)}>Get New Joke</button>
      <img src="chuck-norris.jpg" alt="Chuck Norris" />
      <footer>
        <a href="https://github.com/zhall4/project-three.git" target="_blank">
          Github - Project 3
        </a>
      </footer>
    </div>
  );
}
