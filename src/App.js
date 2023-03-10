import "./style.css";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import { CategoryFilter } from "./components/CategoryFilter";
import FactsList from "./components/FactsList";
import { useEffect, useState } from "react";
import supabase from "./components/supabase";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //  Run only once as soon as the component renders
  useEffect(function () {
    async function getFacts() {
      setIsLoading(true);
      const { data: facts, error } = await supabase
        .from("facts")
        .select("*")
        .order("votesInteresting", { ascending: false })
        .limit(1000);

      if (!error) setFacts(facts);
      else alert("There was a problem getting data");

      setIsLoading(false);
    }
    getFacts();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter />
        {isLoading ? <Loader /> : <FactsList facts={facts} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

export default App;
