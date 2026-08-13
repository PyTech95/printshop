import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/auth/AuthContext";
import { Layout } from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import IndustriesPage from "@/pages/IndustriesPage";
import WhyChooseUsPage from "@/pages/WhyChooseUsPage";
import GalleryPage from "@/pages/GalleryPage";
import FaqPage from "@/pages/FaqPage";
import ContactPage from "@/pages/ContactPage";
import MarketAreasPage from "@/pages/MarketAreasPage";
import MarketAreaDetailPage from "@/pages/MarketAreaDetailPage";
import AreaDetailPage from "@/pages/AreaDetailPage";
import LoginPage from "@/pages/LoginPage";
import AdminPage from "@/pages/AdminPage";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/industries" element={<IndustriesPage />} />
                <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/market-areas" element={<MarketAreasPage />} />
                <Route path="/market-areas/:region" element={<MarketAreaDetailPage />} />
                <Route path="/market-areas/:region/:area" element={<AreaDetailPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
