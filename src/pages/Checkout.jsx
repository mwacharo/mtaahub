import { useState } from 'react';
import { MapPin, Phone, Mail, ShoppingBag, User, Home } from 'lucide-react';

import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        notes: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // You can use orderData for API calls if needed
        // const orderData = {
        //     customer: formData,
        //     items: cartItems,
        //     total: getCartTotal(),
        //     orderDate: new Date().toISOString()
        // };

        try {
            // Replace with your API call
            // await api.post('/orders', orderData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(true);
            clearCart();

            // Reset form
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                city: '',
                address: '',
                notes: ''
            });

            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Order submission failed:', error);
            alert('Failed to submit order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && !success) {
        return (
            <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No items in cart</h2>
                    <p className="text-gray-600">Please add items before checking out</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for your order. We'll contact you shortly to confirm delivery details.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form className="bg-white rounded-xl shadow-md p-8" onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Information</h2>

                            <div className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                                        <User size={18} className="mr-2 text-amber-600" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email & Phone */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                                            <Mail size={18} className="mr-2 text-amber-600" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                                            <Phone size={18} className="mr-2 text-amber-600" />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                                            placeholder="254712345678"
                                        />
                                    </div>
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                                        <MapPin size={18} className="mr-2 text-amber-600" />
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                                        placeholder="Nairobi"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 flex items-center">
                                        <Home size={18} className="mr-2 text-amber-600" />
                                        Delivery Address *
                                    </label>
                                    <textarea
                                        required
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                                        rows="3"
                                        placeholder="Street address, building, apartment number..."
                                    />
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                                        rows="2"
                                        placeholder="Any special delivery instructions..."
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => {
                                    const price = parseFloat(item.price.replace('KSh ', ''));
                                    const subtotal = price * item.quantity;
                                    return (
                                        <div key={item.id} className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-gray-800">KSh {subtotal}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">KSh {getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-xl">
                                    <span className="font-bold text-gray-800">Total</span>
                                    <span className="font-bold text-amber-600">
                                        KSh {getCartTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                By placing an order you agree to our terms and conditions
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;