
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { 
    id, 
    name, 
    price, 
    image, 
    category,
    rating,
    reviews,
    bestseller,
    new: isNew
  } = product;
  
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/products/${id}`} className="block relative">
        <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
          <img 
            src={image} 
            alt={name} 
            className="h-full object-contain" 
          />
        </div>
        
        {(bestseller || isNew) && (
          <div className="absolute top-4 left-4">
            {bestseller && (
              <Badge className="bg-solar-accent text-white mr-2">
                Bestseller
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-solar-blue text-white">
                New
              </Badge>
            )}
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${id}`}>
          <div className="text-sm text-gray-500 uppercase mb-1">
            {category}
          </div>
          <h3 className="font-semibold text-lg mb-2 hover:text-solar-blue transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-500 mr-2">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${price.toLocaleString()}</span>
          <Button
            size="sm"
            onClick={() => increaseCartQuantity(id)}
            className="bg-solar-dark hover:bg-solar-dark/90"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
