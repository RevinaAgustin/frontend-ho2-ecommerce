import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#F7F9FC]">
        <Header search={search} setSearch={setSearch} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home search={search} setSearch={setSearch} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;