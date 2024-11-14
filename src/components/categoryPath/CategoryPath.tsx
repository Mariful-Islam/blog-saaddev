import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

type Category = {
  id: number;
  name: string;
  subcategories?: Category[];
};

function CategoryPath({category}: {category: string}) {
  const { results } = useSelector((state: RootState)=>state.categories)
  const categories = results

  function findCategoryPath(
    categories: Category[],
    targetName: string,
    path: string[] = []
  ): string[] | null {
    for (const category of categories) {
      if (category.name.toLowerCase() === targetName.toLowerCase()) {
        return [...path, category.name];
      }
      if (category.subcategories) {
        const result = findCategoryPath(category.subcategories, targetName, [
          ...path,
          category.name,
        ]);
        if (result) return result;
      }
    }
    return null; // Return null if the category is not found
  }
  return (
    <div className="text-gray-600 text-sm">
      {findCategoryPath(categories, category.split("-").join(" "))?.join("  >  ")}
    </div>
  );
}

export default CategoryPath;
