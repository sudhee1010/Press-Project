import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 bg-white text-gray-700 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-indigo-500 font-extrabold text-3xl">
            PrintPress
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/register-shop">
            <button className="bg-white text-black px-4 py-2 rounded-md ml-4 transition-all duration-500 cursor-pointer hover:text-gray-500">
              Work with Us
            </button>
          </Link>

          <Link to="/login-customer">
            <button className="bg-white text-black border cursor-pointer border-gray-300 px-4 py-2 rounded-md ml-4 transition-all duration-500 hover:bg-gray-100 hover:text-black">
              Login
            </button>
          </Link>

          <Link to="/register-customer">
            <button className="bg-indigo-500 text-white cursor-pointer px-4 py-2 rounded-md ml-4 transition-all duration-500 hover:bg-indigo-600">
              SignUp
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <svg
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {navLinks.map((link, i) => (
            <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}

          <Link to="/register-shop">
            <button className="bg-white text-black px-4 py-2 rounded-md ml-4 transition-all duration-500">
              Work with Us
            </button>
          </Link>

          <Link to="/login-customer">
            <button className="bg-white text-black border cursor-pointer border-gray-300 px-4 py-2 rounded-md ml-4 transition-all duration-500 hover:bg-gray-100 hover:text-black">
              Login
            </button>
          </Link>

          <Link to="/register-customer">
            <button className="bg-indigo-500 text-white cursor-pointer px-4 py-2 rounded-md ml-4 transition-all duration-500 hover:bg-indigo-600">
              SignUp
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
