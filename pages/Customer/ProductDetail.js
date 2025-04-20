import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'frontend/src/components/Rating';
import ProductCard from 'frontend/src/components/ProductCard';

const ProductDetail = ({ cartItems, setCartItems }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data
      const mockProduct = {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and frequent travelers.',
        price: 99.99,
        originalPrice: 129.99,
        discount: 23,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ],
        rating: 4.5,
        numReviews: 128,
        vendor: {
          id: 1,
          name: 'TechGadgets',
          rating: 4.5,
          reviews: 342,
          joinedDate: '2020'
        },
        specifications: {
          brand: 'SoundMaster',
          model: 'SM-BT2020',
          color: 'Black',
          connectivity: 'Bluetooth 5.0',
          batteryLife: '30 hours',
          weight: '250g'
        },
        variants: [
          { id: 1, color: 'Black', price: 99.99, stock: 15 },
          { id: 2, color: 'White', price: 104.99, stock: 8 },
          { id: 3, color: 'Blue', price: 109.99, stock: 5 }
        ],
        reviews: [
          {
            id: 1,
            user: 'Alex Johnson',
            rating: 5,
            date: '2023-05-15',
            comment: 'Amazing sound quality and very comfortable to wear for long periods.'
          },
          {
            id: 2,
            user: 'Sarah Miller',
            rating: 4,
            date: '2023-04-28',
            comment: 'Great headphones, but the battery life could be slightly better.'
          },
          {
            id: 3,
            user: 'Michael Chen',
            rating: 5,
            date: '2023-04-10',
            comment: 'Perfect noise cancellation for my daily commute. Highly recommend!'
          }
        ]
      };

      const mockRelatedProducts = [
        {
          id: 5,
          name: 'Wireless Earbuds',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.3,
          numReviews: 92,
          vendorId: 1,
          vendorName: 'TechGadgets'
        },
        {
          id: 6,
          name: 'Over-Ear Headphones',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.7,
          numReviews: 156,
          vendorId: 1,
          vendorName: 'TechGadgets'
        },
        {
          id: 7,
          name: 'Portable Bluetooth Speaker',
          price: 59.99,
          image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          rating: 4.1,
          numReviews: 64,
          vendorId: 1,
          vendorName: 'TechGadgets'
        }
      ];

      setProduct(mockProduct);
      setSelectedVariant(mockProduct.variants[0]);
      setRelatedProducts(mockRelatedProducts);
      setLoading(false);
    }, 800);
  }, [id]);

  const addToCart = () => {
    if (!selectedVariant) return;
    
    const cartItem = {
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: selectedVariant.price,
      image: product.images[0],
      quantity: quantity,
      vendor: product.vendor.name,
      color: selectedVariant.color
    };

    setCartItems([...cartItems, cartItem]);
  };

  const increaseQuantity = () => {
    if (selectedVariant && quantity < selectedVariant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 h-96">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-primary-500' : 'border-transparent'}`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
        <Rating value={product.rating} />
        <span className="text-gray-500 ml-2">({product.numReviews} reviews)</span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-green-600 font-medium">In Stock</span>
      </div>

      <div className="mb-6">
        {product.originalPrice && (
          <span className="text-gray-500 line-through mr-2">${product.originalPrice.toFixed(2)}</span>
        )}
        <span className="text-2xl font-bold text-gray-900">${selectedVariant?.price.toFixed(2) || product.price.toFixed(2)}</span>
        {product.discount && (
          <span className="ml-2 bg-primary-100 text-primary-800 text-sm font-semibold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Variants */}
      {product.variants && product.variants.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Color</h3>
          <div className="flex space-x-3">
            {product.variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 border rounded-md ${selectedVariant?.id === variant.id ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}`}
              >
                {variant.color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Quantity</h3>
        <div className="flex items-center">
          <button 
            onClick={decreaseQuantity}
            className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b border-gray-300">{quantity}</span>
          <button 
            onClick={increaseQuantity}
            className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
            disabled={selectedVariant ? quantity >= selectedVariant.stock : false}
          >
            +
          </button>
          <span className="text-sm text-gray-500 ml-3">
            {selectedVariant?.stock || 10} available
          </span>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={addToCart}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md transition flex items-center justify-center"
        >
          <i className="fas fa-shopping-cart mr-2"></i>
          Add to Cart
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md transition">
          <i className="far fa-heart"></i>
        </button>
      </div>

      {/* Vendor Info */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-semibold mb-2">Sold by</h3>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
            <img 
              src={`https://ui-avatars.com/api/?name=${product.vendor.name}&background=random`} 
              alt={product.vendor.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Link 
              to={`/vendor/${product.vendor.id}`} 
              className="font-medium hover:text-primary-600 transition"
            >
              {product.vendor.name}
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <Rating value={product.vendor.rating} size="sm" />
              <span className="ml-1">({product.vendor.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Specifications */}
  <div className="bg-white rounded-lg shadow-md p-6 mb-12">
    <h2 className="text-2xl font-bold mb-6">Specifications</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(product.specifications).map(([key, value]) => (
        <div key={key} className="border-b border-gray-100 pb-2">
          <span className="font-medium text-gray-700 capitalize">{key}:</span>
          <span className="ml-2 text-gray-600">{value}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Reviews */}
  <div className="bg-white rounded-lg shadow-md p-6 mb-12">
    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
    
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div className="mb-4 md:mb-0">
        <div className="flex items-center">
          <span className="text-4xl font-bold mr-3">{product.rating}</span>
          <div>
            <Rating value={product.rating} />
            <span className="text-gray-500 text-sm">Based on {product.numReviews} reviews</span>
          </div>
        </div>
      </div>
      <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md transition">
        Write a Review
      </button>
    </div>

    <div className="space-y-6">
      {product.reviews.map(review => (
        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">{review.user}</h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <Rating value={review.rating} />
          <p className="mt-2 text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Related Products */}
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map(product => (
        <ProductCard key={product.id} product={product} addToCart={() => {}} />
      ))}
    </div>
  </div>
</div>
);
};

export default ProductDetail;