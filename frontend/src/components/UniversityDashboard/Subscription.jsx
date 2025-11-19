import React from "react";
import "./Subscription.css";

export default function Subscription() {
  return (
    <div className="ud-page subscription-container">
      <div className="sub-header">
        <div>
          <h2>Subscription Plan</h2>
          <p>View current plan, manage licenses and payments, or upgrade anytime.</p>
        </div>

        <div className="sub-actions">
          <button className="btn btn-outline" aria-label="Manage Licenses" type="button">
            Manage Licenses
          </button>
          <button className="btn btn-primary" aria-label="Upgrade Plan" type="button">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="subscription-grid">
        {/* Current Subscription Card */}
        <div className="subscription-card current-sub card">
          <div className="card-top">
            <div className="plan-name">
              Yearly Subscription
              <span className="plan-badge">Main</span>
            </div>
            <div className="plan-price">
              ₹14,400.00 <span className="per">+ VAT</span>
            </div>
          </div>

          <div className="meta">
            <div>
              <small>Renew Date</small>
              <strong>28 March 2020</strong>
            </div>
            <div>
              <small>License</small>
              <strong>Main License + 8 Additional</strong>
            </div>
          </div>

          <div className="card-footer">
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-secondary" aria-label="Renew Now" type="button">
                Renew Now
              </button>
              <button className="btn btn-outline" aria-label="View Invoices" type="button">
                View Invoices
              </button>
            </div>
            <div className="small-muted">Active since 2019</div>
          </div>
        </div>

        {/* Additional License Card */}
        <div className="subscription-card additional-license card">
          <div className="license-header">
            <div className="license-icon" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#EEF2FF" />
                <path
                  d="M7 7V5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2"
                  stroke="#5B7CFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Additional License</h3>
          </div>

          <div className="price-large">
            ₹85 <span className="per">/mo</span>
          </div>

          <ul className="features-list">
            <li>Unlimited accounts</li>
            <li>No installation fee</li>
            <li>No maintenance fee</li>
            <li>No update fees</li>
          </ul>

          <button className="buy-button btn-primary" aria-label="Buy Additional License" type="button">
            Buy Additional License
          </button>
        </div>

        {/* Payment Section */}
        <div className="payment-section card">
          <h4>Payment</h4>

          <div className="payment-card">
            <div className="payment-info">
              <span className="status failed">Payment Failed</span>
              <span className="card-num">**** **** **** 0009 • VISA</span>
            </div>

            <div className="amount">₹100.39</div>
          </div>

          <div className="next-payment">
            <div>
              <small>Next Payment</small>
              <div>
                <strong>28 March 2020</strong>
              </div>
            </div>

            <div className="amount">₹131.00</div>
          </div>

          <div className="payment-actions">
            <button className="btn btn-outline" aria-label="Change Payment Method" type="button">
              Change Payment Method
            </button>
            <button className="btn btn-outline" aria-label="Payment History" type="button">
              Payment History
            </button>
          </div>
        </div>
      </div>

      {/* Billing Section */}
      <div className="billing-section card">
        <h4>Billing</h4>

        <div className="billing-details">
          <div className="billing-item">
            <label>Corporate Name</label>
            <p>XYZ</p>
          </div>

        <div className="billing-item">
            <label>Address</label>
            <p>, No:4, I...</p>
          </div>

          <div className="billing-item">
            <label>Tax Department</label>
            <p>ABCD</p>
          </div>

          <div className="billing-item">
            <label>Tax ID</label>
            <p>32948291000</p>
          </div>
        </div>

        <div className="billing-actions">
          <button className="btn btn-outline" aria-label="Change Billing" type="button">
            Change Billing
          </button>
          <button className="btn btn-outline" aria-label="Download Invoice" type="button">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

