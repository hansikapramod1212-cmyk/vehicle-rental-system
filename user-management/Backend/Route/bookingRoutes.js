const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} = require('../Controllers/bookingController');

router.post('/', createBooking);          // Create
router.get('/', getBookings);             // Read
router.put('/:id', updateBooking);        // Update
router.delete('/:id', deleteBooking);     // Delete

module.exports = router;
