/**
 * Exporting Modules
 */
var mongoose = require('mongoose');

/**
 * Declaring Schema
 */
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
        required: true,
        unique:true
	},
	address: {
		type: String,
		required: true
	},
    contact: {
        type: Number,
        required: true
    },
	email: {
		type: String,
		required: true
	}
},{
	collection:'USERS'
});

module.exports = UserSchema;
