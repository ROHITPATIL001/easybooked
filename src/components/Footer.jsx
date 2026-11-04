import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>RepairCare</h3>
          <p>Online mobile phone repair booking. A college demonstration project.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/book">Book Repair</Link></p>
          <p><Link to="/about">About Us</Link></p>
          <p><Link to="/contact">Contact</Link></p>
        </div>

        <div>
          <h4>Demo Contact</h4>
          <p>demo@example.com</p>
          <p>+91 98765 43210 (sample)</p>
        </div>
      </div>

      <p className="copyright">
        © 2026 RepairCare. All bookings and prices are dummy data for demonstration.
      </p>
    </footer>
  )
}
