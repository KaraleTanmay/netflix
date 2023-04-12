const { default: mongoose } = require("mongoose");
const { default: slugify } = require("slugify");

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A movie must have a name"],
        unique: true,
        trim: true
    },
    slug: String,
    releasedDate: {
        type: Date,
        default: Date.now(),
        required: [true, "A movie must have a release date"]
    },
    poster: {
        type: String,
        required: [true, "A movie must have a poster"],
    },
    trailer: {
        type: String,
        required: [true, "A movie must have a trailer"],
    },
    genre: [{
        type: String,
        enum: {
            values: ["adventure", "comedy", "crime", "fantasy", "horror", "sci-fi", "thriller", "documentary"],
            message: "this genre is not allowed"
        },
        required: [true, "A movie must have a genre"]
    }],
    description: {
        type: String,
        maxlength: [200, "description can not have more than 200 characters"]
    }
})

movieSchema.pre("save", function (next) {
    this.slug = slugify(this.name);
    next()
})

const Movie = mongoose.model("Movies", movieSchema)

module.exports = Movie