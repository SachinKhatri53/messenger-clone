import React from "react";
import Sidebar from "../components/Sidebar";
import Profile from "./Profile";
import People from "./People";
export default function Layout() {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);
  const handleSideMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const renderMainContent = () => {
    switch (selectedMenuItem) {
      case "chat":
        return <h1>Chat</h1>;
      case "people":
        return <People />
      case "market":
        return <h1>Market</h1>;
      case "chat-request":
        return <h1>Chat Request</h1>;
      case "archive":
        return <h1>Archive</h1>;
        case "profile":
        return <Profile />
      default:
        return <h1>Chat</h1>;
    }
  };
  return (
    <div className="layout d-flex">
      <Sidebar onMenuItemClick={handleSideMenuClick} />
      <div className="main--content">{renderMainContent()}</div>
    </div>
  );
}
