import "./style.css";
import NewFactForm from "./components/NewFactForm";
import { CategoryFilter } from "./components/CategoryFilter";
import FactsList from "./components/FactsList";
import { useState } from "react";

function App() {
  // 1. DEFINE STATE VARIABLE
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img
            src="logo.png"
            height="68"
            width="68"
            alt="Today I Learned Logo"
          />
          <h1>Today I Learned</h1>
        </div>

        <button
          className="btn btn-large btn-open"
          //3. UPDATE STATE VARIABLE
          onClick={() => setShowForm((state) => !state)}
        >
          Share a fact
        </button>
      </header>

      {/* 2. USE STATE VARIABLE */}
      {showForm ? <NewFactForm /> : null}

      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </>
  );
}

export default App;
