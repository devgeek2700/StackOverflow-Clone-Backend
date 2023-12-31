import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerbody, userAnswered, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question Unavailable!")
  }

  updateNoOfQuestions(_id, noOfAnswers);
  try {
    const updateQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerbody, userAnswered, userId }] }
    });
    res.status(200).json(updateQuestion);
  } catch (error) {
    res.status(400).json(error);
  }
}

// chatgpt code
// export const postAnswer = async (req, res) => {
//   const { id: _id } = req.params;
//   const { noOfAnswers, answerbody, userAnswered, userId } = req.body; // Corrected line

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//       return res.status(404).send("Question Unavailable!");
//   }

//   updateNoOfQuestions(_id, noOfAnswers);
//   try {
//       const updateQuestion = await Questions.findByIdAndUpdate(_id, {
//           $addToSet: { answer: [{ answerbody, userAnswered, userId }] }
//       });
//       res.status(200).json(updateQuestion);
//   } catch (error) {
//       res.status(400).json(error);
//   }
// };



const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { 'noOfAnswers': noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
}

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }
  updateNoOfQuestions(_id, noOfAnswers);
  try {
    await Questions.updateOne(
      { _id },
      { $pull: { answer: { _id: answerId } } }
    );
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};