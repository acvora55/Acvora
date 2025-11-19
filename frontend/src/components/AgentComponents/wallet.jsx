import React, { useState, useMemo, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './wallet.css';

const Wallet = () => {
  const [balance, setBalance] = useState(3200.5);
  const [transactions, setTransactions] = useState([
    {
      id: uuidv4(),
      date: '2025-08-10',
      student: 'John Doe',
      course: 'Computer Science',
      amount: 500,
      status: 'Credited',
      paymentMethod: 'N/A',
      paymentDetails: {},
    },
    {
      id: uuidv4(),
      date: '2025-08-12',
      student: 'Jane Smith',
      course: 'Mathematics',
      amount: 450,
      status: 'Credited',
      paymentMethod: 'N/A',
      paymentDetails: {},
    },
    {
      id: uuidv4(),
      date: '2025-08-09',
      student: 'Alice Johnson',
      course: 'Physics',
      amount: 200,
      status: 'Withdrawn',
      paymentMethod: 'Bank Transfer',
      paymentDetails: {
        accountHolder: 'Alice Johnson',
        accountNumber: '1234567890',
        ifsc: 'HDFC0001234',
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');

  const [form, setForm] = useState({
    amount: '',
    method: 'Bank Transfer',
    upiId: '',
    accountNumber: '',
    ifsc: '',
    accountHolder: '',
    paypalEmail: '',
    attachment: null,
  });

  const amountInputRef = useRef(null);
  useEffect(() => {
    if (isModalOpen && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [isModalOpen]);

  const openWithdrawModal = () => {
    setIsModalOpen(true);
    setNote('');
  };

  const closeWithdrawModal = () => {
    setIsModalOpen(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, attachment: file }));
  };

  const resetForm = () => {
    setForm({
      amount: '',
      method: 'Bank Transfer',
      upiId: '',
      accountNumber: '',
      ifsc: '',
      accountHolder: '',
      paypalEmail: '',
      attachment: null,
    });
  };

  const validateForm = () => {
    const amount = parseFloat(form.amount);
    if (!amount || amount <= 0) return 'Please enter a valid withdrawal amount.';
    if (amount > balance) return 'Insufficient balance for withdrawal.';

    if (form.method === 'Bank Transfer') {
      if (!form.accountHolder || !form.accountNumber || !form.ifsc) {
        return 'Please fill Account Holder, Account Number and IFSC for Bank Transfer.';
      }
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.trim().toUpperCase())) {
        return 'Please enter a valid IFSC (e.g., HDFC0001234).';
      }
    } else if (form.method === 'UPI') {
      if (!form.upiId) return 'Please enter your UPI ID.';
      if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(form.upiId.trim())) return 'Please enter a valid UPI ID (e.g., name@bank).';
    } else if (form.method === 'PayPal') {
      if (!form.paypalEmail) return 'Please enter your PayPal email.';
      if (!/^\S+@\S+\.\S+$/.test(form.paypalEmail.trim())) return 'Please enter a valid email for PayPal.';
    }
    return '';
  };

  const handleSubmitWithdraw = (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      alert(err);
      return;
    }

    const amount = parseFloat(form.amount);
    const paymentDetails =
      form.method === 'Bank Transfer'
        ? {
            accountHolder: form.accountHolder,
            accountNumber: form.accountNumber,
            ifsc: form.ifsc,
          }
        : form.method === 'UPI'
        ? { upiId: form.upiId }
        : { paypalEmail: form.paypalEmail };

    setBalance((b) => b - amount);
    setTransactions((prev) => [
      ...prev,
      {
        id: uuidv4(),
        date: new Date().toISOString().split('T')[0],
        student: 'N/A',
        course: 'N/A',
        amount,
        status: 'Withdrawn',
        paymentMethod: form.method,
        paymentDetails,
      },
    ]);

    if (form.attachment) {
      console.log('Attachment selected:', {
        name: form.attachment.name,
        size: form.attachment.size,
        type: form.attachment.type,
      });
    }

    setNote(`Withdrawal of $${amount.toFixed(2)} via ${form.method} submitted successfully!`);
    closeWithdrawModal();
    resetForm();
  };

  const shortId = (id) => (id ? id.slice(0, 8) + '…' : '');

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions]);

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">Agent Panel – Commission Wallet</h1>
      <p className="wallet-subtitle">Track credits & withdrawals, and manage your payout preferences.</p>

      <section className="wallet-hero">
        <div className="wallet-balance-card" role="region" aria-label="Current balance">
          <p className="wallet-balance-title">Current Balance</p>
          <p className="wallet-balance-amount">${balance.toFixed(2)}</p>
          <p className="wallet-card-hint">Withdraw to Bank / UPI / PayPal</p>

          <button className="wallet-btn" onClick={openWithdrawModal}>
            Withdraw Funds
          </button>

          {note ? (
            <div className="wallet-inline-note" role="status">
              {note}
            </div>
          ) : null}
        </div>
      </section>

      <section className="wallet-table-container">
        <h2 className="wallet-title">
          Transaction History
        </h2>
        <div className="wallet-table-wrapper">
          <table className="wallet-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Student</th>
                <th>Course</th>
                <th>Amount ($)</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td title={tx.id}>{shortId(tx.id)}</td>
                  <td>{tx.date}</td>
                  <td>{tx.student}</td>
                  <td>{tx.course}</td>
                  <td>{tx.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className={`wallet-status ${
                        tx.status === 'Credited' ? 'wallet-status-credited' : 'wallet-status-withdrawn'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>{tx.paymentMethod}</td>
                  <td>
                    {tx.status === 'Withdrawn' && (
                      <button
                        className="wallet-btn"
                        onClick={() => alert("Receipt download stub (jsPDF needs to be included)")}
                        aria-label={`Download receipt for transaction ${tx.id}`}
                      >
                        Download Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="wallet-modal-overlay" onClick={closeWithdrawModal}>
          <div
            className="wallet-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Withdraw funds"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="wallet-modal-header">
              <h3 className="wallet-modal-title">Withdraw Funds</h3>
              <button className="wallet-modal-close" aria-label="Close withdraw modal" onClick={closeWithdrawModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitWithdraw}>
              <div className="wallet-modal-body">
                <div className="wallet-input-group">
                  <label htmlFor="amount" className="wallet-input-label">Withdrawal Amount ($)</label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    className="wallet-text-input"
                    value={form.amount}
                    onChange={onChange}
                    ref={amountInputRef}
                    placeholder="e.g., 150.00"
                  />
                </div>

                <div className="wallet-input-group">
                  <label htmlFor="method" className="wallet-input-label">Payment Method</label>
                  <select
                    id="method"
                    name="method"
                    className="wallet-select-input"
                    value={form.method}
                    onChange={onChange}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="UPI">UPI</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>

                {form.method === 'Bank Transfer' && (
                  <>
                    <div className="wallet-input-group">
                      <label htmlFor="accountHolder" className="wallet-input-label">Account Holder Name</label>
                      <input
                        id="accountHolder"
                        name="accountHolder"
                        type="text"
                        className="wallet-text-input"
                        value={form.accountHolder}
                        onChange={onChange}
                        placeholder="As per bank records"
                      />
                    </div>
                    <div className="wallet-input-group">
                      <label htmlFor="accountNumber" className="wallet-input-label">Account Number</label>
                      <input
                        id="accountNumber"
                        name="accountNumber"
                        type="text"
                        className="wallet-text-input"
                        value={form.accountNumber}
                        onChange={onChange}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div className="wallet-input-group">
                      <label htmlFor="ifsc" className="wallet-input-label">IFSC Code</label>
                      <input
                        id="ifsc"
                        name="ifsc"
                        type="text"
                        className="wallet-text-input"
                        value={form.ifsc}
                        onChange={onChange}
                        placeholder="e.g., HDFC0001234"
                      />
                    </div>
                  </>
                )}

                {form.method === 'UPI' && (
                  <div className="wallet-input-group">
                    <label htmlFor="upiId" className="wallet-input-label">UPI ID</label>
                    <input
                      id="upiId"
                      name="upiId"
                      type="text"
                      className="wallet-text-input"
                      value={form.upiId}
                      onChange={onChange}
                      placeholder="e.g., name@bank"
                    />
                  </div>
                )}

                {form.method === 'PayPal' && (
                  <div className="wallet-input-group">
                    <label htmlFor="paypalEmail" className="wallet-input-label">PayPal Email</label>
                    <input
                      id="paypalEmail"
                      name="paypalEmail"
                      type="email"
                      className="wallet-text-input"
                      value={form.paypalEmail}
                      onChange={onChange}
                      placeholder="your@email.com"
                    />
                  </div>
                )}

                <div className="wallet-input-group">
                  <label htmlFor="attachment" className="wallet-input-label">
                    Optional Attachment (Proof/Receipt – PDF/PNG/JPG)
                  </label>
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    className="wallet-file-input"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={onFileChange}
                  />
                  {form.attachment && (
                    <small style={{ display: 'block', marginTop: '0.25rem', color: '#6b7280' }}>
                      Selected: {form.attachment.name}
                    </small>
                  )}
                </div>
              </div>

              <div className="wallet-modal-footer">
                <button type="button" className="wallet-btn-secondary" onClick={closeWithdrawModal}>
                  Cancel
                </button>
                <button type="submit" className="wallet-btn">
                  Submit Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
