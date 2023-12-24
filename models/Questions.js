import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    questiontitle: { type: String, required: "Question must have a Title" },
    questionBody: { type: String, required: "Question must have a Body" },
    questionTags: { type: [String], required: "Question must have a Tags" },
    noOfAnswers: { type: Number, default: 0 },
    upVotes: { type: [String], default: [] },
    downVotes: { type: [String], default: [] },
    userPosted: { type: String, required: "Question must have an Author" },
    userId: { type: String },
    askedOn: { type: Date, default: Date.now },
    answer: [{
        answerbody: { type: String },
        userAnswered: { type: String },
        answerreadOn: { type: Date, default: Date.now },
        userId: { type: String },
    }]
})


export default mongoose.model("Question", questionSchema);