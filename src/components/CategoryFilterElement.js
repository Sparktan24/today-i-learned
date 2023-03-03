function Category({ cat }) {
  return (
    <li key={cat.name} className="category">
      <button
        className="btn btn-category"
        style={{ backgroundColor: cat.color }}
      >
        {cat.name}
      </button>
    </li>
  );
}

export default Category;
