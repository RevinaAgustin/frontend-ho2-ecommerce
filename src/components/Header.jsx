import { Link } from 'react-router-dom';

const Header = ({ search, setSearch }) => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      {/* Top Banner (Optional, adds premium feel) */}
      <div className="bg-gray-100 text-gray-500 text-[10px] sm:text-xs py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between">
          <span>Download Aplikasi All Some Mart Sekarang!</span>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-orange-500 transition">Tentang Kami</Link>
            <Link to="#" className="hover:text-orange-500 transition">Promo</Link>
            <Link to="#" className="hover:text-orange-500 transition">Bantuan</Link>
          </div>
        </div>
      </div>
      
      <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
        <Link to="/" className="text-2xl font-black text-orange-500 tracking-tighter whitespace-nowrap">
          All Some Mart
        </Link>
        
        {/* Search Bar */}
        <div className="w-full max-w-3xl relative group">
          <input 
            type="text" 
            placeholder="Cari smartphone, skincare, snack, laptop..." 
            value={search || ''}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-300 text-gray-800 px-5 py-2.5 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-500 p-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 text-gray-600">
          <Link to="#" className="hover:text-orange-500 transition relative" title="Wishlist">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </Link>
          <Link to="#" className="hover:text-orange-500 transition relative" title="Keranjang">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-white">2</span>
          </Link>
          <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
          <Link to="#" className="flex items-center gap-2 hover:text-orange-500 transition">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 overflow-hidden flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;