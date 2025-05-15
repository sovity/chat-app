# Project Guidelines for Junie

## Project Overview
This is a chat application that serves as a developer tutorial and demonstration for Eclipse Dataspace Connector (EDC) technology. The application enables secure communication between participants using EDC for data exchange and contract negotiation.

## Project Structure
- `/frontend`: Next.js-based web application
  - Uses TypeScript, React, and modern web development tools
  - Contains API clients, models, and a fake backend for development
- `/backend`: JVM-based backend application
  - Uses Gradle for build management
  - Implements the server-side logic for the chat application
  - Integrates with EDC for secure data exchange
- `/docs`: Documentation including architecture diagrams and planning
- `/.junie`: Guidelines for Junie AI assistant

## Architecture
The application follows a distributed architecture with multiple components:
- UI components for user interaction
- Backend services for business logic
- EDC components for secure data exchange between participants

The communication flow involves:
1. Contract negotiation between participants
2. Secure data transfer using EDC
3. Real-time message updates

## Build Instructions
- Frontend:
  - Navigate to `/frontend` directory
  - Run `yarn install` to install dependencies
  - Run `yarn dev` for development or `yarn build` for production build

- Backend:
  - Navigate to `/backend` directory
  - Ensure a GitHub access token is configured as described in the main README
  - Run `./gradlew build` to build the application

## Code Style Guidelines
- Follow existing code style patterns in the respective directories
- Use TypeScript for frontend development
- The frontend framework is Next.js 15, styling is Tailwind v4
- Follow clean code principles and provide appropriate documentation
- Ensure proper error handling and logging
- Avoid too verbose and redundant comments. Comment code only when the code becomes very complicated and hard to understand.
- Use common libraries whenever possible. Avoid re-inventing the wheel for simple tasks (e.g. UUID generation)

## Important Notes
- EDC integration is a core part of this application
- Changes to the data exchange flow should be carefully tested
- The application demonstrates secure, controlled data sharing between participants
