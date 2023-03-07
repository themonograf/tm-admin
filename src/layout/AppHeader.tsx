import React, { useState } from "react";
import { Box, Popover } from "@tm-wear/core";
import { IoApps } from "react-icons/io5";
import { FcShop } from "react-icons/fc";
import { Link } from "react-router-dom";
import apps from "./apps";

const AppHeader = () => {
  const [popoverRef, setPopoverRef] = useState<Element | null>(null);
  return (
    <div className="relative z-20 flex h-16 min-h-[4rem] items-center justify-between bg-white px-8 font-bold shadow-md">
      <Link to={"/"} className="flex items-center">
        <span className="flex items-center self-center whitespace-nowrap font-dancingScript text-xl font-semibold text-gray-700">
          <FcShop className="mr-2" size={25} />
          TM - Admin
        </span>
      </Link>
      <div className="">
        <IoApps
          className="h-7 w-7 cursor-pointer hover:text-blue-700 focus:text-blue-700"
          onClick={(event) => setPopoverRef(event.currentTarget)}
        />
        <Popover
          anchorRef={popoverRef}
          onClose={() => setPopoverRef(null)}
          overlay
          className="relative z-30 min-h-[22.5em] min-w-[22.5em] max-w-[22.5em] p-4"
        >
          {apps.map(({ category, app }, index) => (
            <Box key={category} className="flex flex-col pb-3">
              <span className="mb-2 text-sm font-bold">{category}</span>
              <Box className="flex flex-wrap pb-4">
                {app.map(({ icon: Icon, path, title }) => (
                  <Link
                    key={path}
                    to={path}
                    className="flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-md p-2 hover:bg-slate-100"
                    onClick={() => setPopoverRef(null)}
                  >
                    {Icon}
                    <span className="text-sm">{title}</span>
                  </Link>
                ))}
              </Box>

              {apps.length - 1 !== index ? (
                <Box className="h-[1px] w-full bg-gray-100" />
              ) : null}
            </Box>
          ))}
        </Popover>
      </div>
    </div>
  );
};

export default AppHeader;
