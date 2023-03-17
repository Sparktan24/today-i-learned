import { useState } from "react";
import { CATEGORIES } from "./CategoryFilter";
import supabase from "./supabase";

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  async function handleSubmit(e) {
    // 1.Prevent the browser reload
    e.preventDefault();
    console.log(text, source, category);
    //  2. Check if data is valid. If so, create a new fact
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      //  3. Create a new fact object
      /* const newFact = {
        id: Math.round(Math.random() * 100000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      }; */

      // 3.   Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts") //  Table
        .insert([{ text, source, category }]) //  Info to insert
        .select(); //
      setIsUploading(false);
      //  console.log("NewFact: ", newFact);
      //  4. Add the new fact object to the UI: add the fact to state
      //  Take out all elements of previous facts array and place them in the new array
      setFacts((facts) => [newFact[0], ...facts]); //  fact added to supabase and local state

      //  5. Reset input fields (Already resets as default beheavior)
      /*       setText("");
      setSource("");
      setCategory(""); */
      //  6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

export default NewFactForm;
