import DiscoverScreen from "./DiscoverScreen";
import { useFetchAllCategories } from "../../api-hooks/category";
import { useMemo, useState, useCallback } from "react";
import { useFetchAllMoments } from "../../api-hooks/moment";

const DiscoverScreenBuilder = () => {
  const [filter, setFilter] = useState("all");

  const filterOption = useMemo(() => {
    if (filter === "all" || filter === "followed") {
      return undefined;
    } else {
      return {
        category: filter,
      };
    }
  }, [filter]);

  const { data: categories } = useFetchAllCategories();
  const { data: moments } = useFetchAllMoments(filterOption);

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

  // console.log(JSON.stringify(moments, null, 2));

  return (
    <DiscoverScreen
      moments={moments}
      currentFilter={filter}
      filterOptions={filterOptions}
      onChangeFilter={changeFilterHandler}
    />
  );
};

export default DiscoverScreenBuilder;