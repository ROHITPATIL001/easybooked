const objectives = [
  'Develop a simple and user-friendly mobile repair booking website.',
  'Allow customers to select their mobile phone brand.',
  'Provide predefined mobile phone problems with estimated prices.',
  'Let customers submit repair booking requests and receive a unique Booking ID.',
  'Store booking information using browser LocalStorage.',
  'Build a responsive website that works on mobile and desktop.',
]

export default function About() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Learn about this project and how the booking system works.</p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2>Project Introduction</h2>
          <p>
            RepairCare is a web-based mobile phone repair booking platform developed as a
            college-level project. It simulates the process of booking a phone repair online,
            from choosing a brand and problem to receiving a confirmation.
          </p>

          <h2>Purpose of the Website</h2>
          <p>
            The purpose is to demonstrate how a repair booking workflow can be built with
            React, Vite and browser LocalStorage, without a backend server or database.
          </p>

          <h2>Problem the Website Aims to Solve</h2>
          <p>
            Many people find it difficult to explain their phone issue and to get a rough
            idea of the cost before visiting a repair shop. This website lets customers
            pick their brand and problem, see an estimated price and submit a request in
            one place.
          </p>

          <h2>How the Booking System Works</h2>
          <ol className="steps-list">
            <li>Open the Book Repair page.</li>
            <li>Select your phone brand and phone problem.</li>
            <li>Review the estimated price shown for that problem.</li>
            <li>Enter your name and 10-digit mobile number.</li>
            <li>Submit the booking to receive a unique Booking ID with Pending status.</li>
          </ol>
          <p className="note-text">
            All bookings are saved in your browser only. They are not sent to any repair shop.
          </p>

          <h2>Project Objectives</h2>
          <ul className="checklist">
            {objectives.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
