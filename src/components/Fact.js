import { useState } from "react";
import { CATEGORIES } from "./CategoryFilter";
import supabase from "./supabase";

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUploading] = useState(false);
  const ifDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUploading(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id) //  Update the one where id is = to fact.id
      .select(); // Select this fact from supabase so we can update our local facts state array
    setIsUploading(false);

    console.log(updatedFact);
    if (!error)
      //  Creating a new array based on the initial array
      setFacts(
        (facts) => facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)) // Reeplace the current object with the updated object and keep the same if id is !=
      );
  }
  return (
    <li className="fact">
      <p>
        {ifDisputed ? <span className="disputed">[⛔️Disputed]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default Fact;
