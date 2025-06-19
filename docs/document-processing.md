# Document Processing

This document explains how document processing works in the application, including file uploads, AI analysis, and various document formats.

## Overview

The application supports processing various types of documents and files:
- PDF documents (via attachment upload)
- Images (JPEG, PNG) 
- Legal documents through the document search functionality
- Text-based content creation and editing

## PDF Attachment Support

### File Upload Support
Users can now attach PDF files to their chat messages for AI analysis. The system supports:

- **File Types**: PDF documents (`application/pdf`)
- **File Size Limit**: Up to 10MB per file
- **Multiple Files**: Users can attach multiple PDFs and images in a single message
- **AI Processing**: Gemini 2.5 can analyze PDF content and answer questions about the documents

### How to Use PDF Attachments

1. **Uploading PDFs**:
   - Click the paperclip (📎) icon in the chat input
   - Select one or more PDF files from your device
   - Files will be uploaded and displayed as previews
   - Type your question about the PDF content
   - Send the message for AI analysis

2. **PDF Display**:
   - **Input Preview**: Small thumbnail preview while composing your message
   - **Message Display**: Full-size iframe viewer (400px height) for easy reading
   - **File Information**: Shows PDF icon (📄) and filename

3. **AI Interaction**:
   - Ask questions about PDF content
   - Request summaries or analysis
   - Compare information across multiple PDFs
   - Extract specific information from documents

### Technical Implementation

- **Upload Validation**: Server-side validation ensures only PDF, JPEG, and PNG files are accepted
- **Security**: Files are uploaded to Vercel Blob storage with public access for AI processing
- **Responsive Design**: PDF viewers adapt to different screen sizes
- **Error Handling**: User-friendly error messages for upload failures or invalid files

### Example Use Cases

- **Legal Research**: Upload court decisions or legal documents for analysis
- **Contract Review**: Attach contracts for AI-powered review and questions
- **Document Comparison**: Upload multiple PDFs to compare content
- **Content Extraction**: Ask AI to extract specific clauses or information from PDFs

## Document Creation & Management

## Data Streaming Architecture

### Chat Streaming Issue Fix

**Root Cause**: The main chat page (`/chat`) was converted from a server component to a client component during the Stripe integration, while the individual chat page (`/chat/[id]`) remained a server component. This inconsistency in session handling caused streaming issues.

**Problem**: 
- Working: `/chat/[id]` uses `await auth()` (server-side session)
- Broken: `/chat` used `useSession()` (client-side session)

**Solution**: Restored the main chat page to use server-side session handling (`await auth()`) while moving the Stripe subscription logic to a separate `SubscriptionWrapper` client component.

### Component Structure

```tsx
// Server component (main page)
export default async function Page() {
  const session = await auth(); // Server-side session
  
  return (
    <SubscriptionWrapper session={session}>
      <Chat session={session} />
      <DataStreamHandler id={id} />
    </SubscriptionWrapper>
  );
}

// Client component wrapper for subscription logic
'use client';
export function SubscriptionWrapper({ session, children }) {
  // Client-side subscription checks
  // Stripe integration logic
  return children;
}
```

### Session Handling

Both main chat page and individual chat pages now consistently use server-side session handling:
- Server components provide better performance
- Consistent session state across pages
- Proper streaming initialization

### File Processing

The application supports file uploads and document analysis through the following API endpoints:

- `/api/files/upload` - Handles file uploads
- `/api/files/extract-text` - Extracts text content from uploaded files
- `/api/document` - Processes and analyzes documents using AI

### Document Analysis Tools

The AI system includes several tools for document processing:

- `analyzeDocument` - Analyzes uploaded documents and extracts key information
- `createDocument` - Creates new documents based on user input
- `updateDocument` - Updates existing documents
- `documentSearch` - Searches through legal documents and normatives

### Supported File Types

- PDF documents
- Image files (PNG, JPG, JPEG)
- Text files

### Error Handling

The system includes comprehensive error handling for:
- File upload failures
- Text extraction errors
- AI processing errors
- Streaming connection issues

### Troubleshooting

**Streaming Not Working**: If messages don't appear in real-time and require page reload:
1. Verify main chat page uses server-side `await auth()` session handling
2. Check that both chat pages (`/chat` and `/chat/[id]`) use consistent session patterns
3. Ensure no client-side session conflicts with server-side components
4. Check network connectivity and API response status

**Session Issues**:
1. Check if main page is server component (no `'use client'`)
2. Verify session is passed correctly between server and client components
3. Ensure Stripe subscription logic is separated into client wrapper

**File Upload Issues**: 
1. Verify file size is within limits
2. Check file type is supported
3. Ensure proper authentication 