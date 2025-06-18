# Google Gemini 2.5 Pro Setup

This application is configured to use Google's Gemini 2.5 Pro as the default language model. This document provides setup instructions and configuration details.

## Overview

The application has been configured to use **only** Gemini 2.5 Pro for all AI tasks:
- Chat conversations
- Title generation
- Document/artifact creation
- Reasoning tasks

Model selection has been removed from the UI to provide a streamlined experience with a single, powerful model.

## Required Environment Variables

To use Google Gemini, you need to set up the following environment variable:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

## Getting Your Google API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your environment variables

## Configuration Files

The following files have been configured for Gemini:

### `lib/ai/providers.ts`
- Main provider configuration
- All models point to `google('gemini-2.5-pro')`
- Test environment uses mock models

### `lib/ai/models.ts`
- Single model definition: "Gemini 2.5 Pro"
- Model selection removed from UI

### Package Dependencies
- `@ai-sdk/google` - Google AI SDK integration

## Model Capabilities

Gemini 2.5 Pro provides:
- Advanced conversational AI
- Code generation and understanding
- Multi-modal capabilities (text + vision)
- Reasoning and analysis
- Large context window

## Deployment

When deploying to production, ensure your `GOOGLE_GENERATIVE_AI_API_KEY` environment variable is properly set in your deployment platform (Vercel, etc.).

## Switching Back to Other Providers

If you need to switch to a different provider (OpenAI, Anthropic, etc.), you'll need to:

1. Install the appropriate AI SDK package
2. Update `lib/ai/providers.ts` with the new provider
3. Update environment variables
4. Optionally restore model selection UI if desired

See the [AI SDK documentation](https://sdk.vercel.ai/providers/ai-sdk-providers) for provider-specific setup instructions. 