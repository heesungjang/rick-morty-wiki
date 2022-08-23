import React from "react";

interface ISideBarIcon {
  children: string;
}

const SideBarIcon: React.FC<ISideBarIcon> = ({ children }) => {
  return (
    <div
      className="group relative mx-auto mt-2 mb-2 flex h-12 w-12 items-center justify-center rounded-3xl bg-gray-800
    font-semibold text-green-400
    transition-all duration-300 ease-linear hover:rounded-xl
    hover:bg-green-500 hover:text-white
    "
    >
      {children.charAt(0)}
      <span className="  absolute left-14 m-2 w-auto min-w-max origin-left scale-0 scale-0 rounded-md bg-gray-900 p-2 text-xs font-bold text-white shadow-md transition-all duration-100 group-hover:scale-100">
        {children} 💡
      </span>
    </div>
  );
};

export default SideBarIcon;
