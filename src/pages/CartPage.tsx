
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Trash, 
  ChevronLeft, 
  Plus, 
  Minus,
  CreditCard,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { getProductById } from "@/data/products";

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    increaseCartQuantity, 
    decreaseCartQuantity,
    clearCart
  } = useShoppingCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Simulate checkout process
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
      setIsCheckingOut(false);
    }, 2000);
  };
  
  const cartProducts = cartItems.map((item) => {
    const product = getProductById(item.id);
    return {
      ...item,
      product
    };
  });
  
  const subtotal = cartProducts.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);
  
  const shipping = subtotal > 500 ? 0 : 25;
  
  const total = subtotal + shipping;
  
  if (cartItems.length === 0) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <div className="mb-8">
            <div className="bg-gray-100 inline-flex p-4 rounded-full mb-4">
              <ShoppingCart className="h-12 w-12 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={() => navigate("/products")}>
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ul className="divide-y">
                {cartProducts.map((item) => (
                  <motion.li 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 first:pt-0 last:pb-0"
                  >
                    {item.product ? (
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                          <Link to={`/products/${item.id}`}>
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </Link>
                        </div>
                        
                        <div className="flex-1">
                          <Link 
                            to={`/products/${item.id}`}
                            className="text-lg font-medium text-gray-900 hover:text-solar-blue transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          
                          <div className="mt-1 text-sm text-gray-500">
                            Category: {item.product.category}
                          </div>
                          
                          <div className="mt-2 flex justify-between">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => decreaseCartQuantity(item.id)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <div className="w-8 text-center text-sm">
                                {item.quantity}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => increaseCartQuantity(item.id)}
                                disabled={item.quantity >= (item.product?.stock || 0)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="mr-4 text-right">
                                <div className="text-sm text-gray-500">
                                  ${item.product.price.toLocaleString()} each
                                </div>
                                <div className="font-medium">
                                  ${(item.product.price * item.quantity).toLocaleString()}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        Product not available
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-6 flex justify-between items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-500 border-red-200">
                      <Trash className="mr-2 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all items from your cart. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearCart} className="bg-red-500 hover:bg-red-600">
                        Clear Cart
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <div className="text-gray-500 text-sm">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-green-600 text-sm">
                    You qualified for free shipping!
                  </div>
                )}
                
                {shipping > 0 && (
                  <div className="text-gray-500 text-sm">
                    Add ${(500 - subtotal).toLocaleString()} more to qualify for free shipping
                  </div>
                )}
                
                <div className="pt-4">
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-solar-dark hover:bg-solar-dark/90"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <div className="flex items-center">
                        <svg 
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          ></circle>
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Checkout
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-6 text-xs text-gray-500">
                  <p>By checking out, you agree to our <Link to="/terms" className="text-solar-blue hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-solar-blue hover:underline">Privacy Policy</Link>.</p>
                  <p className="mt-2">We accept credit cards, PayPal, and bank transfers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
