import { Link } from 'react-router-dom';

const Header = ({ search, setSearch }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <nav className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-black text-blue-700 tracking-tight">
          All Some Mart
        </Link>
        <div className="w-full sm:w-1/2 lg:w-1/3 relative">
          <input 
            type="text" 
            placeholder="Cari produk..." 
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100/70 border border-gray-200 text-gray-800 px-5 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
          />
          <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </nav>
    </header>
  );
};

export default Header;