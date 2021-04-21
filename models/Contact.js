const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	contactName: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Contact', contactSchema);
