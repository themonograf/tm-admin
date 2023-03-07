import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ProductData } from "../types";
import { useGetProduct } from "../queries";
import { Link } from "react-router-dom";
import { Pagination } from "@tm-wear/core";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiLinkExternal, BiPencil } from "react-icons/bi";
import appConfig from "@tm-wear/app.config";
import { useDebounce } from "@tm-wear/utils";
import useProductStore from "../store";

const columnHelper = createColumnHelper<ProductData>();

const columns = [
  columnHelper.accessor("name", {
    header: "Nama",
  }),
  columnHelper.accessor("variant", {
    header: "Varian",
  }),
  columnHelper.accessor((row) => row, {
    header: "URL",
    maxSize: 20,
    cell: (info) => (
      <div className="flex items-center gap-4">
        <Link
          to={`${appConfig.ecommerceSite}/product/${info.getValue().slug}`}
          target="_blank"
        >
          <BiLinkExternal size={17} />
        </Link>
        <Link to={`/product/edit/${info.getValue().id}`}>
          <BiPencil size={17} />
        </Link>
      </div>
    ),
  }),
];

export default function Table() {
  const { filter, setFilter } = useProductStore();
  const debounced = useDebounce(filter);
  const { data: products, isFetching } = useGetProduct(debounced);
  const total = products?.data?.total || 0;
  const data = products?.data?.data || [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-blue-100 text-sm uppercase text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="px-6 py-5" key={header.id}>
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
    </div>
  );
}
