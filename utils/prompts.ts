import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

require("dotenv").config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  topP: 0.6,
  modelName: "gpt-4o-mini",
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  workout: "the name of the workout to perform",
  length: "The length of the workout in minutes",
  instructions: "detailed directions on how to execute the exercise",
  calories: "The number of calories this exercise will burn",
});

const formatInstructions = parser.getFormatInstructions();



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

    const parsedRes = await parser.parse(res);

    return parsedRes;
  } catch (err) {
    return { error: err };
  }
};

export { promptOneWorkout };
