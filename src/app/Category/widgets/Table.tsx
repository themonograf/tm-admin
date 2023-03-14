import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetCategory, useRemoveCategory } from "../queries";
import { Link } from "react-router-dom";
import { Pagination } from "@tm-wear/core";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useDebounce } from "@tm-wear/utils";
import useCategoryStore from "../store";
import { Confirmation } from "@tm-wear/core/custom";
import { useMemo, useState } from "react";
import { CategoryDataSchema } from "../validator";

export default function Table() {
  const { filter, setFilter } = useCategoryStore();
  const debounced = useDebounce(filter);
  const { data: category, isFetching, refetch } = useGetCategory(debounced);
  const { mutate: onRemoveCategory } = useRemoveCategory((res) => {
    if (res.success) {
      refetch();
      setRemove(null);
    }
  });
  const total = category?.data?.total || 0;
  const data = category?.data?.data || [];

  const [remove, setRemove] = useState<CategoryDataSchema | null>(null);

  const columns = useMemo<ColumnDef<CategoryDataSchema | null>[]>(
    () => [
      {
        accessorKey: "category",
        header: "Nama Kategory",
        size: 100,
      },
      {
        id: "url",
        header: " ",
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="inline-flex w-16 items-center justify-center gap-4 overflow-hidden">
              <Link
                to={`/category/edit/${
                  info.cell.getValue<CategoryDataSchema>().id
                }`}
              >
                <BiPencil size={17} />
              </Link>
              <button
                onClick={() => setRemove(info.getValue<CategoryDataSchema>())}
              >
                <BiTrash size={17} />
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-x-auto">
      <table className="text-left text-sm text-gray-500">
        <thead className="bg-blue-100 text-sm uppercase text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="px-6 py-5"
                  key={header.id}
                  style={{ width: `${header.getSize()}%` }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {!isFetching
            ? table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b bg-white hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {isFetching ? (
        <div className="flex h-80 items-center justify-center">
          <AiOutlineLoading3Quarters size={25} className="animate-spin" />
        </div>
      ) : null}
      <div className="flex justify-end p-4">
        <Pagination
          currentPage={Math.ceil((filter.page + 1) / filter.limit)}
          totalItems={total}
          itemsPerPage={filter.limit}
          maxPageNumbers={8}
          onPageChange={(pageNumber) =>
            setFilter({ page: (pageNumber - 1) * filter.limit })
          }
        />
      </div>
      <Confirmation
        open={!!remove}
        onClose={() => setRemove(null)}
        title={`Hapus Category`}
        message={`Apakah anda yakin ingin hapus produk ini?`}
        onSubmit={() => remove?.id && onRemoveCategory(remove?.id)}
      />
    </div>
  );
}
