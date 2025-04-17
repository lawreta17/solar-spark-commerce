
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  ChevronLeft, 
  Star, 
  Minus, 
  Plus, 
  Check,
  Truck,
  Shield,
  RotateCcw,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { getProductById } from "@/data/products";
import { toast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || "0");
  const product = getProductById(productId);
  const { increaseCartQuantity, getItemQuantity, decreaseCartQuantity } = useShoppingCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const itemInCartQuantity = getItemQuantity(productId);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-solar-accent mb-4" />
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    );
  }
  
  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: "Maximum quantity reached",
        description: `Sorry, we only have ${product.stock} units in stock.`,
      });
    }
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      increaseCartQuantity(productId);
    }
    setQuantity(1);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <motion.div 
              className="bg-gray-100 rounded-lg flex items-center justify-center p-8 h-[400px] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.gallery[selectedImage]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </motion.div>
            
            <div className="flex gap-2 overflow-x-auto">
              {product.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 border rounded-md cursor-pointer p-1 ${
                    selectedImage === index ? "border-solar-blue" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                  {product.category}
                </Badge>
                {product.bestseller && (
                  <Badge className="ml-2 bg-solar-accent text-white">
                    Bestseller
                  </Badge>
                )}
                {product.new && (
                  <Badge className="ml-2 bg-solar-blue text-white">
                    New
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-700">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">{product.reviews} reviews</span>
              </div>
              
              <div className="text-2xl font-bold mb-4">${product.price.toLocaleString()}</div>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-solar-blue mr-2" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-solar-blue mr-2" />
                  <span>1-year warranty included</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <RotateCcw className="h-4 w-4 text-solar-blue mr-2" />
                  <span>30-day return policy</span>
                </div>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 text-center">{quantity}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 rounded-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="bg-solar-dark hover:bg-solar-dark/90 text-white"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                {itemInCartQuantity > 0 && (
                  <Button
                    onClick={() => decreaseCartQuantity(productId)}
                    variant="outline"
                    size="lg"
                  >
                    <Minus className="mr-2 h-4 w-4" />
                    Remove from Cart ({itemInCartQuantity} in cart)
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features">
            <TabsList className="mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications">
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <div className="border rounded-md overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div 
                    key={key} 
                    className={`flex flex-col sm:flex-row sm:items-center py-3 px-4 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <span className="font-medium w-full sm:w-1/3 mb-1 sm:mb-0">{key}</span>
                    <span className="text-gray-600 w-full sm:w-2/3">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="warranty">
              <h3 className="text-xl font-semibold mb-4">Warranty Information</h3>
              <div className="space-y-4">
                <p>All SolarSpark products come with a comprehensive warranty package to ensure your peace of mind.</p>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Solar Panels</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>25-year performance warranty</li>
                    <li>12-year product warranty covering manufacturing defects</li>
                    <li>Guaranteed minimum 80% output after 25 years</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Battery Systems</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>10-year performance warranty</li>
                    <li>Minimum 70% capacity retention after 10 years</li>
                    <li>Full replacement for manufacturing defects within first 2 years</li>
                  </ul>
                </div>
                
                <p>Please register your product within 30 days of purchase to activate your full warranty coverage.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
