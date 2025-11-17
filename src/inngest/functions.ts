// import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { createOpenAI } from '@ai-sdk/openai';
import * as Sentry from '@sentry/nextjs';
import { generateText } from 'ai';
import { inngest } from './client';

const google = createGoogleGenerativeAI();
// const openai = createOpenAI();
// const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: 'execute-ai' },
  { event: 'execute/ai' },
  // https://ai-sdk.dev/providers/ai-sdk-providers
  async ({ event, step }) => {
    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' });
    console.warn('somethings is missing');
    console.error('This is an error i went to track');

    const { steps: geminiSteps } = await step.ai.wrap('gemini-generate-text', generateText, {
      model: google('gemini-2.5-flash'),
      system: 'You are an expert AI assistant that helps users with their tasks.',
      prompt: 'What is 6 + 7?',
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });
    // const { steps: openAiSteps } = await step.ai.wrap('openai-generate-text', generateText, {
    //   model: openai('gpt-4'),
    //   system: 'You are an expert AI assistant that helps users with their tasks.',
    //   prompt: 'What is 6 + 7?',
    //   experimental_telemetry: {
    //     isEnabled: true,
    //     recordInputs: true,
    //     recordOutputs: true,
    //   },
    // });
    // const { steps: anthropicSteps } = await step.ai.wrap('anthropic-generate-text', generateText, {
    //   model: anthropic('claude-sonnet-4-0'),
    //   system: 'You are an expert AI assistant that helps users with their tasks.',
    //   prompt: 'What is 6 + 7?',
    //   experimental_telemetry: {
    //     isEnabled: true,
    //     recordInputs: true,
    //     recordOutputs: true,
    //   },
    // });

    return { geminiSteps /* openAiSteps, anthropicSteps */ };
  }
);
