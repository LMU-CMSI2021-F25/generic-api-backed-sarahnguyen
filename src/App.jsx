import { useState, useEffect } from "react";
import { searchMealsByIngredient } from "./api";
import "./App.css";

export default function App() {
  const [ingredient, setIngredient] = useState("chicken");
  const [input, setInput] = useState("chicken");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setLoading(true);
    setErr("");
    searchMealsByIngredient(ingredient)
      .then((meals) => {
        setMeals(meals);
      })
      .catch(() => {
        setMeals([]);
        setErr("We couldn't process your request, please try another ingredient!");
      })
      .finally(() => setLoading(false));
  }, [ingredient]);  

  function search() {
    const next = (input || "").trim();
    setIngredient(next || "chicken");
  }

  return (
    <div className="App">
      <header>
      <h1>What food can you make with this ingredient?</h1>
      <img
      className="fun-img"
      src="https://i.pinimg.com/originals/93/5e/f3/935ef3e9c164fe37ddde01ccd8cec4ba.gif"
      alt="Playful cooking scene"/>

      </header>

      <main>
        <h2><strong>Type an ingredient and we will inspire you with some dishes!</strong></h2>

        <section className="form">
          <p>
            Ingredient:&nbsp;
            <input
              id="ing"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g.chicken, tofu, tomato…"
            />
          </p>
          <button type="button" onClick={search}>Search</button>
        </section>

        {loading && <div className="status">Loading…</div>}
        {err && <div className="status error">{err}</div>}

        <h2><strong>Results</strong></h2>
        <section className="results-box">
          <div className="grid">
            {meals.length === 0 ? (
              !loading && <p className="muted">No recipes found</p>
            ) : (
              meals.map((m) => (
                <figure key={m.idMeal} className="card">
                  <img src={m.strMealThumb} alt={m.strMeal} />
                  <figcaption>{m.strMeal}</figcaption>
                </figure>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <h5>
          <p>Created by Sarah Nguyen!</p>
        </h5>
      </footer>
    </div>
  );
}