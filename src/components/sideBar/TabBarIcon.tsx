import React from "react";
import { useStore } from "../../store";

interface ISideBarIcon {
  children: string;
}

const TabBarIcon: React.FC<ISideBarIcon> = ({ children, ...props }) => {
  const selectTab = useStore((state) => state.selectTab);
  const handleTabSelection = () => {
    if (children !== "Character") {
      return;
    }
    selectTab(children);
  };

  return (
    <div className="sidebar-icon group" onClick={handleTabSelection}>
      {children.charAt(0)}
      <span className="sidebar-tooltip scale-0 group-hover:scale-100">{children} 💡</span>
    </div>
  );
};

export default TabBarIcon;
