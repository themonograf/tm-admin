import React from "react";
import { Table } from "@tm-wear/app/Reseller";
import useResellerStore from "@tm-wear/app/Reseller/store";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Reseller = () => {
  const { filter, setFilter } = useResellerStore();
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col p-8">
      <div className="flex flex-1 flex-col rounded bg-white shadow-md">
        <div className="flex justify-end gap-4 p-4">
          <input
            required
            type="text"
            name="keyword"
            id="keyword"
            autoComplete="given-name"
            placeholder="Keyword"
            className="block w-52 rounded-md border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={filter.keyword}
            onChange={(e) => setFilter({ keyword: e.target.value, page: 0 })}
          />
          <button
            onClick={() => navigate("/reseller/tambah")}
            className="flex items-center rounded bg-blue-500 p-2 text-white hover:shadow-lg"
          >
            <BsPlus fontSize={"19px"} />
            Tambah Reseller
          </button>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default Reseller;
