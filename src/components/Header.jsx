import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          SISTECH Shop
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;