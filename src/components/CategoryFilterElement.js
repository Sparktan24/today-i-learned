function Category({ cat, setCurrentCategory }) {
  return (
    <li key={cat.name} className="category">
      <button
        className="btn btn-category"
        style={{ backgroundColor: cat.color }}
        onClick={() => setCurrentCategory(cat.name)}
      >
        {cat.name}
      </button>
    </li>
  );
}

export default Category;
