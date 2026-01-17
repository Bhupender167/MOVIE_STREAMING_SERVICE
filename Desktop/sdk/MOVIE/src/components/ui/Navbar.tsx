import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import logo from "../../assets/ChatGPT_Image_Jan_12__2026__06_44_47_AM-removebg-preview.png";
import { Input } from "../../components/ui/input";
import Genre from "./Genre";
import { SearchResultContext } from "../../context/searchResultContext";

/* Nav Item */
const NavItem = ({ to = "#", children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="
      relative block font-medium text-gray-800
      transition-all duration-300
      hover:translate-y-[-1px]
      after:absolute after:left-0 after:-bottom-1 after:h-[2px]
      after:w-0 after:bg-red-600 after:transition-all after:duration-300
      hover:after:w-full
    "
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const { searchText, setSearchText } = useContext(SearchResultContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.length === 0) {
      navigate("/movies");
    } else {
      navigate(`/search/${value}`);
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">

          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            className="h-10 md:h-14 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/")}
          />

          {/* Right Side */}
          <div className="flex items-center gap-5">

            {/* Search (Desktop) */}
            <div
              className={`
                hidden sm:flex items-center gap-2 rounded-full px-4 py-2
                transition-all duration-300
                shadow-sm
                ${focused
                  ? "bg-gray-200 ring-1 ring-gray-400"
                  : "bg-gray-100"}
              `}
            >
              <Search size={18} className="text-gray-500" />
              <Input
                type="text"
                value={searchText}
                onChange={handleChange}
                placeholder="Search movies, shows..."
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="
                  bg-transparent border-none text-black placeholder:text-gray-500
                  focus-visible:ring-0 focus-visible:ring-offset-0
                  w-32 md:w-48 transition-all
                "
              />
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8 text-base">
              <NavItem><Genre /></NavItem>
              <NavItem to="/movies">Movies</NavItem>
              <NavItem to="/tvshows">TV Shows</NavItem>
              <NavItem to="/latest">New & Popular</NavItem>
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg transition hover:bg-gray-200"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Right Slide Drawer */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-[75%] max-w-sm bg-white z-50
          transform transition-transform duration-300 ease-out
          shadow-xl
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="px-6 py-6 space-y-6">
          <NavItem to="/" onClick={() => setOpen(false)}>
            <Genre />
          </NavItem>
          <NavItem to="/movies" onClick={() => setOpen(false)}>Movies</NavItem>
          <NavItem to="/tvshows" onClick={() => setOpen(false)}>TV Shows</NavItem>
          <NavItem to="/latest" onClick={() => setOpen(false)}>New & Popular</NavItem>

          {/* Mobile Search */}
          <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-gray-100 mt-8 shadow-sm">
            <Search size={18} className="text-gray-500" />
            <Input
              type="text"
              value={searchText}
              onChange={handleChange}
              placeholder="Search..."
              className="
                bg-transparent border-none
                focus-visible:ring-0 focus-visible:ring-offset-0
              "
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
