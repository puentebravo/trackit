import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

require("dotenv").config();


const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  topP: 0.6,
  modelName: "gpt-3.5-turbo",
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  workout: "the name of the workout to perform",
  length: "The length of the workout in minutes",
  instructions: "detailed directions on how to execute the exercise",
  calories: "The number of calories this exercise will burn"
});

const multiParser = StructuredOutputParser.fromNamesAndDescriptions({
  workouts: "comma separated list comprising each individual workout to perform",
  length: "the total length of all workouts in minutes",
  instructions: "detailed, step by step instructions on how to execute each workout",
  calories: "The amount of calories the exercises will burn"
})

const formatInstructions = parser.getFormatInstructions();

const multiFormatInstructions = multiParser.getFormatInstructions()

const promptOneWorkout = async () => {
  try {
    const prompt = new PromptTemplate({
      template:
        "I'm a remote worker that barely moves all day, and I have only 5 minutes before my next meeting. Please give me one exercise I can do before my next meeting as if you're a world class trainer with an in-depth knowledge of fitness and exercise techniques. This should be a single exercise, able to be completed with a minimum of equipment. The response should include a numbered list of instructions on how to do the workout.  \n{format_instructions}",
      inputVariables: [],
      partialVariables: { format_instructions: formatInstructions },
    });

    const promptInput = await prompt.format({});

    const res = await model.invoke(promptInput);

    const parsedRes = await parser.parse(res)

    return parsedRes
  } catch (err) {
   return {error: err}
  }
};

const promptTwoWorkouts = async () => {
  try {
    const prompt = new PromptTemplate({
      template:
        "I'm a remote worker that barely moves all day, and I have only 10 minutes before my next meeting. Please give me two exercises I can do before my next meeting as if you're a world class trainer with an in-depth knowledge of fitness and exercise techniques. This should be two separate exercises, able to be completed with a minimum of equipment. Each exercise should take no more than five minutes to complete. The response should include a numbered list of instructions on how to do each workout.  \n{format_instructions}",
      inputVariables: [],
      partialVariables: { format_instructions: multiFormatInstructions },
    });

    const promptInput = await prompt.format({ });

    const res = await model.invoke(promptInput);

    const parsedRes = await multiParser.parse(res)

    return parsedRes
  } catch (err) {
   return {error: err}
  }
}

const promptThreeWorkouts = async () => {
  try {
    const prompt = new PromptTemplate({
      template:
        "I'm a remote worker that barely moves all day, and I have only 15 minutes before my next meeting. Please give me three exercises I can do before my next meeting as if you're a world class trainer with an in-depth knowledge of fitness and exercise techniques. This should be three separate exercises, able to be completed with a minimum of equipment. Each exercise should take no more than five minutes to complete. The response should include a numbered list of instructions on how to do each workout.  \n{format_instructions}",
      inputVariables: [],
      partialVariables: { format_instructions: multiFormatInstructions },
    });

    const promptInput = await prompt.format({ });

    const res = await model.invoke(promptInput);

    const parsedRes = await multiParser.parse(res)

    return parsedRes
  } catch (err) {
   return {error: err}
  }
}


export {promptOneWorkout, promptTwoWorkouts, promptThreeWorkouts}