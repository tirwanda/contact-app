const Contact = require('../models/Contact');

module.exports = {
	contact: async (req, res) => {
		try {
			const contact = await Contact.find().select(
				'contactName picture phoneNumber address'
			);
			res.status(200).json({ contact });
		} catch (error) {
			console.log(error);
		}
		// const message = 'Hello Json';
		// res.status(200).json({ message });
	},
};
