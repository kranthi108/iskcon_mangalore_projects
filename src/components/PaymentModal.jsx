import './PaymentModal.css';

export default function PaymentModal({ isOpen, status, details, onClose }) {
  if (!isOpen) return null;

  const isSuccess = status === 'success';

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-modal-close" onClick={onClose}>✕</button>
        
        <div className={`payment-icon ${isSuccess ? 'success' : 'failure'}`}>
          {isSuccess ? '✓' : '✗'}
        </div>
        
        <h2 className="payment-modal-title">
          {isSuccess
            ? (details?.isSubscription ? 'Monthly Seva Activated!' : 'Thank You!')
            : 'Payment Failed'}
        </h2>
        
        <p className="payment-modal-message">
          {isSuccess
            ? (details?.isSubscription
              ? 'Your e-mandate has been set up successfully. Monthly deductions will happen automatically. May Lord Krishna bless you abundantly.'
              : 'Your generous contribution has been received. May Lord Krishna bless you abundantly.')
            : details?.reason || 'Something went wrong. Please try again.'}
        </p>

        {isSuccess && details && (
          <div className="payment-details">
            <div className="payment-detail-row">
              <span>Seva Type</span>
              <strong>{details.sevaType}</strong>
            </div>
            <div className="payment-detail-row">
              <span>{details.isSubscription ? 'Monthly Amount' : 'Amount'}</span>
              <strong>₹{Number(details.amount).toLocaleString('en-IN')}{details.isSubscription ? '/month' : ''}</strong>
            </div>
            {details.isSubscription && details.totalMonths && (
              <div className="payment-detail-row">
                <span>Duration</span>
                <strong>{details.totalMonths} months (₹{(details.amount * details.totalMonths).toLocaleString('en-IN')} total)</strong>
              </div>
            )}
            {details.isSubscription && (
              <div className="payment-detail-row">
                <span>e-Mandate</span>
                <strong className="mandate-active">Active ✓</strong>
              </div>
            )}
            <div className="payment-detail-row">
              <span>{details.isSubscription ? 'Subscription ID' : 'Payment ID'}</span>
              <strong className="payment-id">{details.subscriptionId || details.paymentId}</strong>
            </div>
          </div>
        )}

        <button
          className={`payment-modal-btn ${isSuccess ? 'btn-success' : 'btn-retry'}`}
          onClick={onClose}
        >
          {isSuccess ? 'Hare Krishna 🙏' : 'Try Again'}
        </button>
      </div>
    </div>
  );
}
