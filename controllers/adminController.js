const Contact = require('../models/Contact');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
	viewDashboard: async (req, res) => {
		try {
			const contact = await Contact.find();
			const alertMessage = req.flash('alertMessage');
			const alertStatus = req.flash('alertStatus');
			const alert = { message: alertMessage, status: alertStatus };
			res.render('admin/dashboard/view_dashboard', {
				contact,
				alert,
			});
		} catch (error) {
			res.redirect('/');
		}
	},

	addContact: async (req, res) => {
		try {
			const { contactName, phoneNumber, address } = req.body;
			req.flash('alertMessage', 'Success Add Contact');
			req.flash('alertStatus', 'success');
			await Contact.create({
				contactName,
				phoneNumber,
				address,
				picture: `images/${req.file.filename}`,
			});
			res.redirect('/');
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/');
		}
	},

	editContact: async (req, res) => {
		try {
			const { id, contactName, phoneNumber, address } = req.body;
			const contact = await Contact.findOne({ _id: id });
			if (req.file == undefined) {
				contact.contactName = contactName;
				contact.phoneNumber = phoneNumber;
				contact.address = address;
				await contact.save();
				req.flash('alertMessage', 'Success Edit Contact');
				req.flash('alertStatus', 'success');
				res.redirect('/');
			} else {
				await fs.unlink(path.join(`public/${contact.picture}`));
				contact.contactName = contactName;
				contact.phoneNumber = phoneNumber;
				contact.address = address;
				contact.picture = `images/${req.file.filename}`;
				await contact.save();
				req.flash('alertMessage', 'Success Edit Contact');
				req.flash('alertStatus', 'success');
				res.redirect('/');
			}
		} catch (error) {
			console.log(error);
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/');
		}
	},

	deleteContact: async (req, res) => {
		try {
			const { id } = req.params;
			const contact = await Contact.findOne({ _id: id });
			await fs.unlink(path.join(`public/${contact.picture}`));
			await contact.remove();
			req.flash('alertMessage', 'Success Delete Contact');
			req.flash('alertStatus', 'success');
			res.redirect('/');
		} catch (error) {
			req.flash('alertMessage', `${error.message}`);
			req.flash('alertStatus', 'danger');
			res.redirect('/');
		}
	},
};
