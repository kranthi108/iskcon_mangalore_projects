import { useState } from 'react';
import './DonorForm.css';

export default function DonorForm({ isOpen, onSubmit, onClose, isLoading }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    pan: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Name is mandatory');
      return;
    }
    if (!form.phone.trim()) {
      setError('Phone number is mandatory');
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="donor-form-overlay" onClick={onClose}>
      <div className="donor-form-modal" onClick={(e) => e.stopPropagation()}>
        <button className="donor-form-close" onClick={onClose}>✕</button>

        <h2 className="donor-form-title">Donor Information</h2>
        <p className="donor-form-subtitle">Please provide your details to proceed with the donation</p>

        {error && <div className="donor-form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name <span className="required">*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone <span className="required">*</span></label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          </div>

          <div className="form-section-label">Address</div>

          <div className="form-row">
            <div className="form-group">
              <label>House / Flat No.</label>
              <input
                type="text"
                name="houseNo"
                value={form.houseNo}
                onChange={handleChange}
                placeholder="House / Flat No."
              />
            </div>
            <div className="form-group">
              <label>Street Name</label>
              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Street / Area"
              />
            </div>
          </div>

          <div className="form-row form-row-3">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                maxLength={6}
              />
            </div>
          </div>

          <div className="form-group">
            <label>PAN Number <span className="optional">(Optional — for 80G tax receipt)</span></label>
            <input
              type="text"
              name="pan"
              value={form.pan}
              onChange={handleChange}
              placeholder="ABCDE1234F"
              maxLength={10}
              style={{ textTransform: 'uppercase' }}
            />
          </div>

          <button type="submit" className="donor-form-submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}
