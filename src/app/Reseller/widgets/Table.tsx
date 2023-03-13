import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetReseller, useRemoveReseller } from "../queries";
import { Link } from "react-router-dom";
import { Pagination } from "@tm-wear/core";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useDebounce } from "@tm-wear/utils";
import useResellerStore from "../store";
import { Confirmation } from "@tm-wear/core/custom";
import { useMemo, useState } from "react";
import { ResellerDataSchema } from "../validator";

export default function Table() {
  const { filter, setFilter } = useResellerStore();
  const debounced = useDebounce(filter);
  const { data: reseller, isFetching, refetch } = useGetReseller(debounced);
  const { mutate: onRemoveReseller } = useRemoveReseller((res) => {
    if (res.success) {
      refetch();
      setRemove(null);
    }
  });
  const total = reseller?.data?.total || 0;
  const data = reseller?.data?.data || [];

  const [remove, setRemove] = useState<ResellerDataSchema | null>(null);

  const columns = useMemo<ColumnDef<ResellerDataSchema | null>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama",
        size: 33.33,
      },
      {
        accessorKey: "username",
        header: "Username",
        size: 33.33,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 33.33,
      },
      {
        accessorKey: "isAdmin",
        header: "Admin",
        size: 33.33,
        cell: (info) => (
          <div className="flex justify-center">
            {info.getValue() ? (
              <AiOutlineCheckCircle size={20} className="text-blue-500" />
            ) : (
              <AiOutlineCloseCircle size={20} className="text-red-500" />
            )}
          </div>
        ),
      },
      {
        id: "url",
        header: " ",
        accessorFn: (row) => row,
        cell: (info) => {
          return (
            <div className="inline-flex w-16 items-center justify-center gap-4 overflow-hidden">
              <Link
                to={`/reseller/edit/${
                  info.cell.getValue<ResellerDataSchema>().id
                }`}
              >
                <BiPencil size={17} />
              </Link>
              <button
                onClick={() => setRemove(info.getValue<ResellerDataSchema>())}
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
        title={`Hapus Reseller`}
        message={`Apakah anda yakin ingin hapus produk ini?`}
        onSubmit={() => remove?.id && onRemoveReseller(remove?.id)}
      />
    </div>
  );
}
