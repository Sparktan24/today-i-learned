import "./style.css";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import { CategoryFilter } from "./components/CategoryFilter";
import FactsList from "./components/FactsList";
import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {showForm ? <NewFactForm /> : null}

      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </>
  );
}

export default App;
