const mongoose = require('mongoose')

// Full Stack Open Part 4, exercises 4.1-4.2, 4.9, 4.17
// Blog schema. title and url are required; likes defaults to 0.
// A blog belongs to the user who created it (4.17).

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Comments are added in Part 7 (7.12-7.14).
  comments: [{ type: String }],
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
