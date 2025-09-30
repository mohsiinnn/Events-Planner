import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="bg-emerald-700 text-white px-10 py-5 shadow">
      <div className="flex justify-center items-center ">
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-xl font-bold">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/create-event" className="hover:text-gray-200">
              Create Event
            </Link>
          </li>
          <li>
            <Link to="/all-events" className="hover:text-gray-200">
              All Events
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
