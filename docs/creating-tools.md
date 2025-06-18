# Creating Tools in Lex.chat

This guide explains how to create new tools in the Lex.chat codebase. There are two main types of tools you can create:

1. **AI Tools** - Backend tools that the AI can invoke autonomously during conversations
2. **Artifact Toolbar Tools** - UI tools that users can trigger from the artifact sidebar

## Table of Contents

- [AI Tools (Backend Tools)](#ai-tools-backend-tools)
  - [Creating a New AI Tool](#creating-a-new-ai-tool)
  - [Tool Structure](#tool-structure)
  - [Registration](#registration)
  - [UI Rendering](#ui-rendering)
  - [Complete Example](#complete-example)
- [Artifact Toolbar Tools](#artifact-toolbar-tools)
  - [Creating Toolbar Items](#creating-toolbar-items)
  - [Toolbar Item Structure](#toolbar-item-structure)
- [Best Practices](#best-practices)
- [Testing](#testing)

## AI Tools (Backend Tools)

AI tools are functions that the AI can call during conversations to perform specific tasks like fetching data, creating documents, or processing information.

### Creating a New AI Tool

#### Step 1: Define the Tool

Create a new file in `lib/ai/tools/` (e.g., `my-new-tool.ts`):

```typescript
import { tool } from 'ai';
import { z } from 'zod';
import { DataStreamWriter } from 'ai';
import { Session } from 'next-auth';

// If your tool needs session/dataStream context
interface MyNewToolProps {
  session: Session;
  dataStream: DataStreamWriter;
}

export const myNewTool = ({ session, dataStream }: MyNewToolProps) =>
  tool({
    description: 'Clear description of what your tool does - this helps the AI decide when to use it',
    parameters: z.object({
      // Define your parameters with Zod schema validation
      inputParam: z.string().describe('Description of this parameter for the AI'),
      optionalParam: z.number().optional().describe('Optional parameter description'),
      enumParam: z.enum(['option1', 'option2', 'option3']).describe('Choose from these options'),
    }),
    execute: async ({ inputParam, optionalParam, enumParam }) => {
      try {
        // Your tool logic here
        console.log(`Executing tool with: ${inputParam}`);
        
        // You can write data to the stream for real-time updates
        dataStream.writeData({
          type: 'status',
          content: 'Processing request...',
        });
        
        // Perform your async operations
        const result = await someAsyncOperation(inputParam);
        
        // Write completion status
        dataStream.writeData({
          type: 'complete',
          content: 'Operation completed successfully',
        });
        
        // Return data that will be available to the AI and UI
        return {
          success: true,
          result: result,
          message: 'Tool executed successfully',
          // Any other data you want to pass to the UI
        };
      } catch (error) {
        console.error('Tool execution failed:', error);
        return {
          success: false,
          error: error.message,
        };
      }
    },
  });

// For simple tools that don't need session/dataStream
export const simpleMyNewTool = tool({
  description: 'A simple tool that doesn\'t need session context',
  parameters: z.object({
    query: z.string(),
  }),
  execute: async ({ query }) => {
    // Simple tool logic
    const result = await fetch(`https://api.example.com/search?q=${query}`);
    const data = await result.json();
    return data;
  },
});
```

#### Step 2: Register the Tool

Add your tool to the chat route at `app/(chat)/api/chat/route.ts`:

```typescript
// 1. Import your tool at the top of the file
import { myNewTool } from '@/lib/ai/tools/my-new-tool';

// 2. Add to experimental_activeTools array (around line 150)
experimental_activeTools:
  selectedChatModel === 'chat-model-reasoning'
    ? []
    : [
        'getWeather',
        'createDocument', 
        'updateDocument',
        'requestSuggestions',
        'myNewTool', // Add your tool name here
      ],

// 3. Add to tools object (around line 160)
tools: {
  getWeather,
  createDocument: createDocument({ session, dataStream }),
  updateDocument: updateDocument({ session, dataStream }),
  requestSuggestions: requestSuggestions({ session, dataStream }),
  myNewTool: myNewTool({ session, dataStream }), // For tools that need context
  // OR
  simpleMyNewTool, // For simple tools
},
```

#### Step 3: Handle Tool Rendering

Add rendering logic in `components/message.tsx` around line 160:

```typescript
// In the tool-invocation state === 'call' section (shows while tool is executing):
{toolName === 'myNewTool' ? (
  <MyNewToolCall args={args} isReadonly={isReadonly} />
) : toolName === 'getWeather' ? (
  <Weather />
) : // ... other tools

// In the tool-invocation state === 'result' section (shows tool results):  
{toolName === 'myNewTool' ? (
  <MyNewToolResult result={result} isReadonly={isReadonly} />
) : toolName === 'getWeather' ? (
  <Weather weatherAtLocation={result} />
) : // ... other tools
```

#### Step 4: Create UI Components

Create components to display your tool's loading state and results:

```typescript
// components/my-new-tool.tsx
import { LoaderIcon, CheckIcon, AlertIcon } from './icons';

interface MyNewToolCallProps {
  args: {
    inputParam: string;
    optionalParam?: number;
    enumParam: 'option1' | 'option2' | 'option3';
  };
  isReadonly: boolean;
}

// Component shown while tool is executing
export function MyNewToolCall({ args, isReadonly }: MyNewToolCallProps) {
  return (
    <div className="border py-2 px-3 rounded-xl flex items-center gap-3">
      <div className="text-muted-foreground">
        <LoaderIcon className="animate-spin" />
      </div>
      <div>
        <div className="font-medium">Processing: {args.inputParam}</div>
        <div className="text-sm text-muted-foreground">
          Using my new tool to process your request...
        </div>
      </div>
    </div>
  );
}

interface MyNewToolResultProps {
  result: {
    success: boolean;
    result?: any;
    message?: string;
    error?: string;
  };
  isReadonly: boolean;
}

// Component shown when tool completes
export function MyNewToolResult({ result, isReadonly }: MyNewToolResultProps) {
  return (
    <div className="border py-2 px-3 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground">
          {result.success ? (
            <CheckIcon className="text-green-500" />
          ) : (
            <AlertIcon className="text-red-500" />
          )}
        </div>
        <div>
          <div className="font-medium">
            {result.success ? 'Tool Completed' : 'Tool Failed'}
          </div>
          <div className="text-sm text-muted-foreground">
            {result.message || result.error}
          </div>
          {result.success && result.result && (
            <div className="mt-2 p-2 bg-muted rounded text-sm">
              <pre>{JSON.stringify(result.result, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Tool Structure

All AI tools follow this basic structure:

```typescript
export const toolName = tool({
  description: string,           // What the tool does (helps AI decide when to use it)
  parameters: ZodSchema,         // Input validation using Zod
  execute: async (params) => {   // The actual tool logic
    // Return data that will be passed to UI components
    return result;
  },
});
```

### Complete Example

Here's how the existing `getWeather` tool is implemented:

**Tool Definition** (`lib/ai/tools/get-weather.ts`):
```typescript
import { tool } from 'ai';
import { z } from 'zod';

export const getWeather = tool({
  description: 'Get the current weather at a location',
  parameters: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  execute: async ({ latitude, longitude }) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
    );
    const weatherData = await response.json();
    return weatherData;
  },
});
```

**Registration** (in `app/(chat)/api/chat/route.ts`):
```typescript
experimental_activeTools: ['getWeather', ...],
tools: { getWeather, ... },
```

**UI Rendering** (in `components/message.tsx`):
```typescript
// Loading state
{toolName === 'getWeather' ? (
  <Weather />
) : ...

// Result state
{toolName === 'getWeather' ? (
  <Weather weatherAtLocation={result} />
) : ...
```

## Artifact Toolbar Tools

Artifact toolbar tools are UI elements that appear in the floating toolbar when users interact with artifacts (documents, code, etc.).

### Creating Toolbar Items

Toolbar items are defined within artifact definitions. For example, in `artifacts/text/client.tsx`:

```typescript
export const textArtifact = new Artifact<'text', TextArtifactMetadata>({
  // ... other config
  
  toolbar: [
    {
      icon: <PenIcon />,
      description: 'Add final polish',
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: 'user',
          content: 'Please add final polish and check for grammar, add section titles for better structure, and ensure everything reads smoothly.',
        });
      },
    },
    {
      icon: <MessageIcon />,
      description: 'Request suggestions',
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: 'user',
          content: 'Please add suggestions you have that could improve the writing.',
        });
      },
    },
    {
      icon: <CustomIcon />,
      description: 'My custom action',
      onClick: ({ appendMessage }) => {
        // You can send any message to the chat
        appendMessage({
          role: 'user',
          content: 'Perform my custom action on this artifact.',
        });
      },
    },
  ],
});
```

### Toolbar Item Structure

Toolbar items follow this interface:

```typescript
export type ArtifactToolbarItem = {
  description: string;        // Tooltip text shown on hover
  icon: ReactNode;           // Icon component (import from './icons')
  onClick: (context: ArtifactToolbarContext) => void;
};

export type ArtifactToolbarContext = {
  appendMessage: UseChatHelpers['append']; // Function to send messages to chat
};
```

### Available Icons

Common icons you can use (import from `@/components/icons`):
- `PenIcon` - For editing actions
- `MessageIcon` - For communication actions  
- `CopyIcon` - For copy actions
- `RedoIcon` / `UndoIcon` - For version control
- `PlayIcon` - For execution actions
- `DownloadIcon` - For download actions
- And many more...

## Best Practices

### For AI Tools:

1. **Clear Descriptions**: Write clear, specific descriptions that help the AI understand when to use your tool
2. **Proper Validation**: Always use Zod schemas for parameter validation
3. **Error Handling**: Handle errors gracefully and return meaningful error messages
4. **Type Safety**: Use TypeScript interfaces for complex return types
5. **Async Operations**: Most tools should be async to avoid blocking
6. **Data Streaming**: Use `dataStream.writeData()` for real-time updates when appropriate

### For Toolbar Tools:

1. **Intuitive Icons**: Choose icons that clearly represent the action
2. **Clear Descriptions**: Write concise tooltip text
3. **Meaningful Actions**: Each toolbar item should trigger a specific, useful action
4. **Context Awareness**: Consider what actions make sense for each artifact type

### General:

1. **Consistent Naming**: Follow the existing naming conventions
2. **Documentation**: Document complex tools with JSDoc comments
3. **Testing**: Test tools in both development and production environments
4. **Performance**: Consider the performance impact of your tools
5. **Security**: Validate all inputs and handle sensitive data appropriately

## Testing

### Testing AI Tools:

1. **Unit Tests**: Create tests for your tool's `execute` function
2. **Integration Tests**: Test the complete flow from chat to tool execution
3. **Edge Cases**: Test with invalid parameters, network failures, etc.

Example test structure:
```typescript
// tests/tools/my-new-tool.test.ts
import { describe, it, expect } from 'vitest';
import { myNewTool } from '@/lib/ai/tools/my-new-tool';

describe('myNewTool', () => {
  it('should execute successfully with valid parameters', async () => {
    const result = await myNewTool.execute({
      inputParam: 'test input',
      optionalParam: 42,
    });
    
    expect(result.success).toBe(true);
    expect(result.result).toBeDefined();
  });
  
  it('should handle errors gracefully', async () => {
    // Test error cases
  });
});
```

### Testing Toolbar Tools:

1. **UI Tests**: Use Playwright to test toolbar interactions
2. **Message Tests**: Verify that toolbar tools send the correct messages
3. **Visual Tests**: Ensure toolbar items render correctly

### Manual Testing Checklist:

- [ ] Tool appears in the AI's available tools list
- [ ] AI can successfully invoke the tool with correct parameters
- [ ] Loading state displays correctly
- [ ] Result state shows appropriate information
- [ ] Error states are handled gracefully
- [ ] Toolbar items appear in the correct artifacts
- [ ] Toolbar actions trigger expected behavior
- [ ] Tool works in both development and production

## Troubleshooting

### Common Issues:

1. **Tool not available to AI**: Check that it's registered in both `experimental_activeTools` and `tools`
2. **UI not rendering**: Verify the tool name matches exactly in `message.tsx`
3. **Parameter validation errors**: Check your Zod schema matches the expected input
4. **TypeScript errors**: Ensure your interfaces match the expected types
5. **Toolbar not showing**: Check that the artifact definition includes your toolbar items

### Debug Tips:

1. Use `console.log` in your tool's execute function to debug
2. Check the browser network tab for API call issues
3. Use the browser's React DevTools to inspect component props
4. Check the console for any JavaScript errors
5. Verify database connections and API keys if your tool uses external services

## Recently Added Tools

The following legal research tools have been recently added to demonstrate the tool creation process:

### Legal Document Search (`documentSearch`)
- **Purpose**: Performs semantic hybrid search across legal databases (normativas and sentencias)
- **Location**: `lib/ai/tools/document-search.ts`
- **UI Components**: `components/legal-document-search.tsx`
- **Features**: Supports filtering by categories, jurisdiction, provinces, date ranges, and document types

### Get Full Normative (`getFullNormative`)
- **Purpose**: Retrieves complete text content of specific legal normative documents
- **Location**: `lib/ai/tools/get-full-normative.ts`
- **UI Components**: `components/legal-normative.tsx`
- **Features**: Supports jurisdiction-specific document retrieval

### Get Sentencia Content (`getSentenciaContent`)
- **Purpose**: Extracts content from court sentence PDF documents
- **Location**: `lib/ai/tools/get-sentencia-content.ts`
- **UI Components**: `components/legal-sentencia.tsx`
- **Features**: PDF processing and content extraction from URLs

These tools serve as real examples of how to implement complex, domain-specific functionality following the patterns outlined in this guide.

---

Remember to follow the user rules: always check and update documentation when implementing or editing features!