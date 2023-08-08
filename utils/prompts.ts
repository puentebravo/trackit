import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

require("dotenv").config();


const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 1,
  modelName: "gpt-3.5-turbo",
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  workout: "Comma separated list of each exercise in the workout",
  length: "the length in minutes of the workout",
  summary: "detailed directions on how to execute each exercise",
});

const formatInstructions = parser.getFormatInstructions();

const promptWorkout = async (input: string) => {
  try {
    const prompt = new PromptTemplate({
      template:
        "You are an Olympic-level fitness trainer. Please give the user a workout of the length they specify. \n{format_instructions}  \n {time}",
      inputVariables: ["time"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const promptInput = await prompt.format({
      time: input,
    });

    const res = await model.call(promptInput);

    const parsedRes = await parser.parse(res)

    return parsedRes
  } catch (err) {
    console.error(err);
  }
};


export default promptWorkout