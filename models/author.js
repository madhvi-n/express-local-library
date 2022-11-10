var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema ;

//AuthorSchema
var AuthorSchema = new Schema(
  {
    first_name : { type:String, required: true, max:100 },
    family_name :{ type:String, required: true, max:100 },
    date_of_birth : { type: Date },
    date_of_death : { type: Date },
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.first_name + ' ' + this.family_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});
// Virtual for author's date of birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY') : '';
});

// Virtual for author's date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY') : '';
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
