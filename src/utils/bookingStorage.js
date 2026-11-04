import { getProblemById } from './prices.js'

const STORAGE_KEY = 'mobileRepairBookings'

// Checks whether localStorage can be used (it may be blocked by browser settings).
export function isStorageAvailable() {
  try {
    const testKey = '__repair_booking_test__'
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

// Returns all saved bookings. Returns an empty list if data is missing or corrupted.
export function getBookings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveBookings(bookings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

// Local date in YYYY-MM-DD format (avoids UTC date shifts for IST users).
function getLocalDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Creates IDs like REP-2026-0001, continuing from the highest existing number for the year.
export function generateBookingId(bookings, year = new Date().getFullYear()) {
  const prefix = `REP-${year}-`
  const numbers = bookings
    .filter((b) => typeof b?.bookingId === 'string' && b.bookingId.startsWith(prefix))
    .map((b) => parseInt(b.bookingId.slice(prefix.length), 10))
    .filter((n) => !Number.isNaN(n))

  const next = (numbers.length ? Math.max(...numbers) : 0) + 1
  return `${prefix}${String(next).padStart(4, '0')}`
}

// Saves a new booking and returns it. Throws if the booking cannot be saved.
export function createBooking({ customerName, mobileNumber, phoneBrand, problemId }) {
  if (!isStorageAvailable()) {
    throw new Error('LocalStorage is not available')
  }

  const problem = getProblemById(problemId)
  if (!problem) {
    throw new Error('Invalid repair problem')
  }

  const bookings = getBookings()

  const booking = {
    bookingId: generateBookingId(bookings),
    customerName,
    mobileNumber,
    phoneBrand,
    problem: problem.name,
    estimatedPrice: problem.price,
    status: 'Pending',
    bookingDate: getLocalDateString(),
  }

  bookings.push(booking)
  saveBookings(bookings)
  return booking
}
