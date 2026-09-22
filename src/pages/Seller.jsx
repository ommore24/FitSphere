import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Store, Plus, CheckCircle, ShieldCheck, ArrowLeft, Package, Clock, Sparkles } from 'lucide-react';

export const Seller = () => {
  const { currentUser } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState('register'); // 'register', 'add-product', 'my-products'

  // Seller registration form
  const [sellerData, setSellerData] = useState({
    businessName: '',
    email: currentUser?.email || '',
    phone: '',
    description: ''
  });
  const [isSellerRegistered, setIsSellerRegistered] = useState(false);

  // Add product form
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    category: 'Protein',
    price: '',
    originalPrice: '',
    stock: '50',
    description: '',
    ingredients: '',
    imageUrl: ''
  });
  const [submittedProducts, setSubmittedProducts] = useState([
    {
      id: 'demo-prod-1',
      name: 'FitSphere Clean Whey Isolate (Vanilla 1kg)',
      brand: 'FitSphere Native',
      category: 'Protein',
      price: 3499,
      stock: 50,
      status: 'LIVE'
    }
  ]);

  const handleSellerRegister = async (e) => {
    e.preventDefault();

    if (isSupabaseConfigured && currentUser?.id) {
      try {
        await supabase.from('sellers').insert({
          user_id: currentUser.id,
          business_name: sellerData.businessName,
          contact_email: sellerData.email,
          contact_phone: sellerData.phone,
          business_description: sellerData.description,
          verification_status: 'PENDING'
        });
      } catch (err) {
        console.warn('Seller registration error:', err);
      }
    }

    setIsSellerRegistered(true);
    showToast('Seller application submitted! Pending Admin Verification.', 'success');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const newProd = {
      id: 'seller-prod-' + Math.floor(1000 + Math.random() * 9000),
      product_name: productForm.name,
      name: productForm.name,
      brand: productForm.brand,
      category: productForm.category,
      price: Number(productForm.price),
      price_inr: Number(productForm.price),
      original_price_inr: productForm.originalPrice ? Number(productForm.originalPrice) : Number(productForm.price),
      stock_quantity: Number(productForm.stock),
      stock: Number(productForm.stock),
      description: productForm.description,
      ingredients: productForm.ingredients,
      publication_status: 'PENDING',
      status: 'PENDING'
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').insert({
          product_name: productForm.name,
          brand: productForm.brand,
          category: productForm.category,
          price_inr: Number(productForm.price),
          original_price_inr: productForm.originalPrice ? Number(productForm.originalPrice) : Number(productForm.price),
          stock_quantity: Number(productForm.stock),
          description: productForm.description,
          ingredients: productForm.ingredients,
          publication_status: 'PENDING'
        });
      } catch (err) {
        console.warn('Product submission error:', err);
      }
    }

    setSubmittedProducts([newProd, ...submittedProducts]);
    showToast(`Product "${productForm.name}" submitted for Admin approval!`, 'success');
    setProductForm({
      name: '',
      brand: '',
      category: 'Protein',
      price: '',
      originalPrice: '',
      stock: '50',
      description: '',
      ingredients: '',
      imageUrl: ''
    });
    setActiveTab('my-products');
  };

  return (
    <div className="section" style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            <ArrowLeft size={16} />
            <span>Return to Marketplace</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge badge-mint">
              <Store size={13} /> FitSphere Seller Portal
            </span>
          </div>
          <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.35rem' }}>
            Seller & Brand Hub
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            List verified fitness products, manage stock levels, and reach thousands of dedicated athletes.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
          <button
            className={`btn btn-sm ${activeTab === 'register' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('register')}
          >
            <Store size={15} />
            <span>Seller Onboarding</span>
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'add-product' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('add-product')}
          >
            <Plus size={15} />
            <span>Submit New Product</span>
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'my-products' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('my-products')}
          >
            <Package size={15} />
            <span>My Submitted Products ({submittedProducts.length})</span>
          </button>
        </div>

        {/* TAB 1: SELLER REGISTRATION */}
        {activeTab === 'register' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Seller Business Application</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Only verified brands and authorized distributors are permitted to list items on the marketplace.
            </p>

            {isSellerRegistered ? (
              <div style={{ padding: '1.5rem', background: 'rgba(0, 245, 155, 0.1)', border: '1px solid var(--accent-mint)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <CheckCircle size={40} color="var(--accent-mint)" style={{ margin: '0 auto 0.75rem' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>Application Under Review</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Your business verification is currently in status <strong style={{ color: 'var(--accent-mint)' }}>PENDING / UNDER REVIEW</strong>. You can proceed to submit products for admin approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSellerRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Business / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Nutrition India"
                    value={sellerData.businessName}
                    onChange={(e) => setSellerData({ ...sellerData, businessName: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="seller@brand.com"
                      value={sellerData.email}
                      onChange={(e) => setSellerData({ ...sellerData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={sellerData.phone}
                      onChange={(e) => setSellerData({ ...sellerData, phone: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Business Description & Product Types</label>
                  <textarea
                    rows={3}
                    placeholder="Authorized manufacturer of clinical whey protein isolates and organic vegan supplements..."
                    value={sellerData.description}
                    onChange={(e) => setSellerData({ ...sellerData, description: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                  <span>Submit Seller Application</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: ADD PRODUCT */}
        {activeTab === 'add-product' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '720px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Submit Product for Marketplace Publication</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Products submitted will enter state <strong style={{ color: 'var(--accent-coral)' }}>PENDING ADMIN REVIEW</strong> before appearing live.
            </p>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ultra Pure Creatine Monohydrate"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MuscleBlaze"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: '#111827', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  >
                    <option value="Protein">Protein</option>
                    <option value="Creatine">Creatine</option>
                    <option value="Pre-Workout">Pre-Workout</option>
                    <option value="Vitamins">Vitamins</option>
                    <option value="Healthy Foods">Healthy Foods</option>
                    <option value="Recovery & Accessories">Recovery & Accessories</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Selling Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="2499"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Initial Stock *</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Clinical breakdown, benefits, recommended dosage..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                <Plus size={16} />
                <span>Submit Product for Approval</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MY SUBMITTED PRODUCTS */}
        {activeTab === 'my-products' && (
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Seller Submitted Catalog</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {submittedProducts.map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-mint)', fontWeight: 700 }}>{p.brand} • {p.category}</div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Stock: {p.stock} units</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>₹{Number(p.price).toLocaleString('en-IN')}</div>
                    <span className={`badge ${p.status === 'LIVE' ? 'badge-mint' : 'badge-coral'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seller;
