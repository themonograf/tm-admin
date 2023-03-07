export const sortOrder = (
  sortby: string,
  currentSortby: string,
  order: "asc" | "desc" | "",
) => {
  const newSort = order === "desc" && currentSortby === sortby ? "" : sortby;
  return {
    sortby: newSort,
    order:
      order === "" || currentSortby !== sortby
        ? "asc"
        : order === "asc"
        ? "desc"
        : "",
  } as { sortby: string; order: "asc" | "desc" | "" };
};
