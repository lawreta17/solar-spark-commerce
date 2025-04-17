import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sun as SolarIcon, Battery, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateParallax = (multiplier: number) => {
    return -scrollY * multiplier;
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="hero-section bg-gradient-to-b from-white to-gray-100 py-20 md:py-0"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between min-h-[90vh]">
          <div className="md:w-1/2 z-10 mt-16 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-heading leading-tight">
                Sustainable Energy Solutions for the Future
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                High-performance solar panels and battery systems to power your home and reduce your carbon footprint.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-solar-dark hover:bg-solar-dark/90 text-white"
                  >
                    Shop Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products?category=panels">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-solar-dark text-solar-dark hover:bg-solar-dark hover:text-white"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 relative mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ 
                transform: `translateY(${calculateParallax(0.1)}px)`,
              }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
                <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-solar-blue/10 rounded-full animate-spin-slow"></div>
                <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-white p-8 rounded-full flex items-center justify-center shadow-lg z-10 animate-float">
                  <SolarIcon className="w-full h-full text-solar-blue" />
                </div>
                <div className="absolute top-[10%] right-[10%] w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-white p-4 rounded-full flex items-center justify-center shadow-lg animate-float" style={{animationDelay: "1s"}}>
                  <Battery className="w-full h-full text-solar-accent" />
                </div>
                <div className="absolute bottom-[15%] left-[15%] w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-white p-3 rounded-full flex items-center justify-center shadow-lg animate-float" style={{animationDelay: "1.5s"}}>
                  <Zap className="w-full h-full text-solar-blue" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SolarSpark</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology and premium quality for all your solar energy needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-50 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-solar-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <SolarIcon className="h-8 w-8 text-solar-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">High Efficiency Panels</h3>
              <p className="text-gray-600">
                Our solar panels offer industry-leading efficiency ratings, capturing more sunlight and generating more power in limited space.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-solar-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Battery className="h-8 w-8 text-solar-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Advanced Battery Storage</h3>
              <p className="text-gray-600">
                Store excess solar energy with our cutting-edge battery systems, ensuring power availability even when the sun isn't shining.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-8 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-solar-dark/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-solar-dark" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Energy Management</h3>
              <p className="text-gray-600">
                Our integrated systems intelligently manage power flow between your panels, batteries, and home for optimal efficiency.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-solar-blue hover:text-solar-accent flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-solar-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Switch to Solar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of customers who have already made the switch to cleaner, renewable energy with SolarSpark.
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="bg-white text-solar-dark hover:bg-gray-100"
            >
              Browse Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
