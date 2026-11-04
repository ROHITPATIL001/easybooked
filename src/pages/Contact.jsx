export default function Contact() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Sample contact details for demonstration purposes.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="demo-badge">
            Demo information only. The details below are sample values, not real contacts.
          </p>

          <div className="grid contact-grid">
            <div className="card">
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
              <p className="muted">Sample number (demo)</p>
            </div>

            <div className="card">
              <h3>Email</h3>
              <p>demo@example.com</p>
              <p className="muted">Sample email address (demo)</p>
            </div>

            <div className="card">
              <h3>Address</h3>
              <p>Demo Address, College Project Lab</p>
              <p>Maharashtra, India</p>
              <p className="muted">Sample address (demo)</p>
            </div>

            <div className="card">
              <h3>Project Details</h3>
              <p>Mobile Phone Repair Booking Website</p>
              <p>React.js + Vite | College Demonstration</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
