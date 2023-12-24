import Questions from '../models/Questions.js'
import mongoose from 'mongoose';

const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions(postQuestionData)

    try {
        await postQuestion.save();
        res.status(200).json("Posted a Question successfully");
    } catch (error) {
        console.log(error);
        res.status(400).json("Couldn't post a new Question!");
    }
};


const getAllQuestions = async (req, res) => {
    try {
        const questionlist = await Questions.find();
        res.status(200).json(questionlist);

    } catch (error) {
        console.log(error);
        res.status(400).json("Couldn't get the Question!");
    }
};

const deleteQuestions = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }


    try {

        await Questions.findByIdAndDelete(_id);
        res.status(200).json({ message: "successfully deleted..." });

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
};



export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }

    try {
        const question = await Questions.findById(_id);
        const upIndex = question.upVotes.findIndex((id) => id === String(userId));
        const downIndex = question.downVotes.findIndex(
            (id) => id === String(userId)
        );

        if (value === "upVote") {
            if (downIndex !== -1) {
                question.downVotes = question.downVotes.filter((id) => id !== String(userId));
            }
            if (upIndex === -1) {
                question.upVotes.push(userId);
            } else {
                question.upVotes = question.upVotes.filter((id) => id !== String(userId));
            }
        } else if (value === "downVote") {
            if (upIndex !== -1) {
                question.upVotes = question.upVotes.filter((id) => id !== String(userId));
            }
            if (downIndex === -1) {
                question.downVotes.push(userId);
            } else {
                question.downVotes = question.downVotes.filter((id) => id !== String(userId));
            }
        }
        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json({ message: "voted successfully..." });
    } catch (error) {
        res.status(404).json({ message: "id not found" });
    }
};

export { AskQuestion, getAllQuestions, deleteQuestions };