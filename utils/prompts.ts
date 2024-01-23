import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

require("dotenv").config();


const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.5,
  modelName: "gpt-3.5-turbo",
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  workout: "Comma separated list of each exercise in the workout",
  length: "The length of the workout in minutes",
  instructions: "detailed directions on how to execute the exercise",
  calories: "The number of calories this exercise will burn"
});

const formatInstructions = parser.getFormatInstructions();

const promptWorkout = async (time: string) => {
  try {
    const prompt = new PromptTemplate({
      template:
        "I'm a remote worker that barely moves all day, and I have only {time} minutes before my next meeting. Please give me one exercise I can do before my next meeting as if you're a world class trainer with an in-depth knowledge of fitness and exercise techniques. This should be a single exercise, able to be completed with a minimum of equipment. The response should include a numbered list of instructions on how to do the workout.  \n{format_instructions}",
      inputVariables: ["time"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const promptInput = await prompt.format({
      time: time
    });

    console.log(promptInput)

    const res = await model.call(promptInput);

    const parsedRes = await parser.parse(res)

    return parsedRes
  } catch (err) {
   return {error: err}
  }
};


export default promptWorkout