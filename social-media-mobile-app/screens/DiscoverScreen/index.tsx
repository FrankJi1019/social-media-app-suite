import DiscoverScreen from "./DiscoverScreen";
import { useFetchAllCategories } from "../../api-hooks/category";
import { useMemo, useState, useCallback } from "react";

const DiscoverScreenBuilder = () => {
  const { data: categories } = useFetchAllCategories();

  const [filter, setFilter] = useState("all");

  const filterOptions = useMemo(() => {
    if (categories.length === 0) return [];
    return [
      { text: "Home", filter: "all" },
      { text: "Followed", filter: "followed" },
      ...categories.map(({ name }) => ({
        text:
          name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase(),
        filter: name,
      })),
    ];
  }, [categories]);

  const changeFilterHandler = useCallback(
    (newFilter: string) => setFilter(newFilter),
    [setFilter]
  );

  return (
    <DiscoverScreen
      currentFilter={filter}
      filterOptions={filterOptions}
      onChangeFilter={changeFilterHandler}
    />
  );
};

export default DiscoverScreenBuilder;
