const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <h3 className="text-slate-500 uppercase tracking-wider text-xs font-bold mb-4">
        Kategori Populer
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(isActive ? '' : cat)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all shadow-sm ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
              }`}
            >
              #{cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;