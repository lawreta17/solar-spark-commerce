
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Sun, Battery, SolarPanel } from "lucide-react";
import { useShoppingCart } from "@/context/ShoppingCartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartQuantity } = useShoppingCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <SolarPanel className="h-8 w-8" />
            <span className="text-xl font-bold text-solar-dark">SolarSpark</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-solar-dark hover:text-solar-blue transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-solar-dark hover:text-solar-blue transition-colors"
            >
              Products
            </Link>
            <div className="flex items-center space-x-2">
              <SolarPanel className="h-5 w-5" />
              <Link
                to="/products?category=panels"
                className="text-solar-dark hover:text-solar-blue transition-colors"
              >
                Solar Panels
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Battery className="h-5 w-5" />
              <Link
                to="/products?category=batteries"
                className="text-solar-dark hover:text-solar-blue transition-colors"
              >
                Batteries
              </Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-solar-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-solar-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-solar-dark hover:text-solar-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-solar-dark hover:text-solar-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/products?category=panels"
              className="block py-2 text-solar-dark hover:text-solar-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Solar Panels
            </Link>
            <Link
              to="/products?category=batteries"
              className="block py-2 text-solar-dark hover:text-solar-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Batteries
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
