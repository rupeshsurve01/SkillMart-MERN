const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
     { timestamps: true }
)

module.exports =  mongoose.model("Enrollment", enrollmentSchema)