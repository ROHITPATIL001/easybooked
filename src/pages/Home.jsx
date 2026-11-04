import { Link } from 'react-router-dom'
import { REPAIR_PROBLEMS, formatPrice } from '../utils/prices.js'

const steps = [
  { title: 'Choose your brand', text: 'Select Apple, Samsung, Vivo or Oppo.' },
  { title: 'Pick the problem', text: 'Select your issue and see the estimated price.' },
  { title: 'Enter your details', text: 'Add your name and 10-digit mobile number.' },
  { title: 'Get your Booking ID', text: 'Submit and receive a confirmation with a unique ID.' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Mobile Phone Repair, Booked in Minutes</h1>
          <p>
            Tell us your phone brand and the problem you are facing. Get an estimated
            price and a booking request in just a few clicks. No login required.
          </p>
          <Link to="/book" className="btn btn-primary">Book Repair</Link>
        </div>
      </section>

      <section className="section section-grey">
        <div className="container">
          <h2 className="section-title">Popular Repair Problems</h2>
          <p className="section-subtitle">Sample prices for demonstration purposes.</p>
          <div className="grid">
            {REPAIR_PROBLEMS.map((problem) => (
              <div key={problem.id} className="card service-card">
                <div className="service-icon" aria-hidden="true">{problem.icon}</div>
                <h3>{problem.name}</h3>
                <p className="service-price">{formatPrice(problem.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Four simple steps to book your repair.</p>
          <div className="grid">
            {steps.map((step, index) => (
              <div key={step.title} className="step">
                <div className="step-number">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <div className="center-action">
            <Link to="/book" className="btn btn-primary">Start Your Booking</Link>
          </div>
        </div>
      </section>
    </>
  )
}
