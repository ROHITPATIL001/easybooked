import { useState } from 'react'
import ProblemCard from '../components/ProblemCard.jsx'
import { PHONE_BRANDS, REPAIR_PROBLEMS, formatPrice, getProblemById } from '../utils/prices.js'
import { createBooking } from '../utils/bookingStorage.js'

const emptyForm = { brand: '', problemId: '', name: '', mobile: '' }

function validate(form) {
  const errors = {}
  if (!form.brand) errors.brand = 'Please select your phone brand.'
  if (!form.problemId) errors.problemId = 'Please select your phone problem.'
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(form.mobile)) {
    errors.mobile = 'Please enter a valid 10-digit mobile number.'
  }
  return errors
}

export default function BookRepair() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  const selectedProblem = getProblemById(form.problemId)

  const handleChange = (e) => {
    const { name, value } = e.target
    const cleanValue = name === 'mobile' ? value.replace(/\D/g, '').slice(0, 10) : value
    setForm((f) => ({ ...f, [name]: cleanValue }))
    setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleProblemSelect = (problemId) => {
    setForm((f) => ({ ...f, problemId }))
    setErrors((er) => ({ ...er, problemId: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitError('')

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    try {
      const booking = createBooking({
        customerName: form.name.trim(),
        mobileNumber: form.mobile,
        phoneBrand: form.brand,
        problemId: form.problemId,
      })
      setConfirmation(booking)
      setForm(emptyForm)
    } catch {
      setSubmitError('Unable to save booking. Please try again.')
    }
  }

  if (confirmation) {
    return (
      <section className="section">
        <div className="container">
          <Confirmation booking={confirmation} onBookAnother={() => setConfirmation(null)} />
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Book a Repair</h1>
        <p className="section-subtitle">Fill in the form below. Fields marked * are required.</p>

        <div className="booking-layout">
          <form className="card booking-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="brand">Phone Brand *</label>
              <select
                id="brand"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                aria-invalid={Boolean(errors.brand)}
                aria-describedby={errors.brand ? 'brand-error' : undefined}
              >
                <option value="">-- Select your brand --</option>
                {PHONE_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              {errors.brand && <p id="brand-error" className="error">{errors.brand}</p>}
            </div>

            <div className="field">
              <span className="field-label" id="problem-label">Phone Problem *</span>
              <div className="problem-grid" role="group" aria-labelledby="problem-label">
                {REPAIR_PROBLEMS.map((problem) => (
                  <ProblemCard
                    key={problem.id}
                    problem={problem}
                    selected={form.problemId === problem.id}
                    onSelect={handleProblemSelect}
                  />
                ))}
              </div>
              {errors.problemId && <p className="error">{errors.problemId}</p>}
            </div>

            <div className="field">
              <label htmlFor="name">Customer Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Rahul Patil"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <p id="name-error" className="error">{errors.name}</p>}
            </div>

            <div className="field">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                value={form.mobile}
                onChange={handleChange}
                autoComplete="tel-national"
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={errors.mobile ? 'mobile-error' : undefined}
              />
              {errors.mobile && <p id="mobile-error" className="error">{errors.mobile}</p>}
            </div>

            <div className="price-box" aria-live="polite">
              {selectedProblem ? (
                <>Estimated Price: <strong>{formatPrice(selectedProblem.price)}</strong></>
              ) : (
                'Select a problem to see the estimated price.'
              )}
            </div>

            {submitError && <div className="alert-error" role="alert">{submitError}</div>}

            <button type="submit" className="btn btn-primary btn-block">Submit Booking</button>
          </form>

          <aside className="card summary" aria-label="Booking summary">
            <h3>Booking Summary</h3>
            <div className="summary-row">
              <span>Brand</span>
              <span>{form.brand || '-'}</span>
            </div>
            <div className="summary-row">
              <span>Problem</span>
              <span>{selectedProblem ? selectedProblem.name : '-'}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Price</span>
              <span>{selectedProblem ? formatPrice(selectedProblem.price) : '-'}</span>
            </div>
            <div className="summary-row">
              <span>Status</span>
              <span>Pending</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Confirmation({ booking, onBookAnother }) {
  return (
    <div className="card confirmation">
      <div className="success-icon" aria-hidden="true">✓</div>
      <h2>Your repair booking has been successfully submitted!</h2>
      <p className="status-badge">Pending</p>
      <p>Booking Received</p>

      <table className="details-table">
        <tbody>
          <tr><th scope="row">Booking ID</th><td><strong>{booking.bookingId}</strong></td></tr>
          <tr><th scope="row">Customer Name</th><td>{booking.customerName}</td></tr>
          <tr><th scope="row">Mobile Number</th><td>{booking.mobileNumber}</td></tr>
          <tr><th scope="row">Phone Brand</th><td>{booking.phoneBrand}</td></tr>
          <tr><th scope="row">Phone Problem</th><td>{booking.problem}</td></tr>
          <tr><th scope="row">Estimated Price</th><td>{formatPrice(booking.estimatedPrice)}</td></tr>
          <tr><th scope="row">Booking Status</th><td>{booking.status}</td></tr>
          <tr><th scope="row">Booking Date</th><td>{booking.bookingDate}</td></tr>
        </tbody>
      </table>

      <p className="note">
        This is a demo booking. No technician or repair shop has been contacted.
      </p>
      <button type="button" className="btn btn-primary" onClick={onBookAnother}>
        Book Another Repair
      </button>
    </div>
  )
}
