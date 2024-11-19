# Chat App

Chat app serving as a developer tutorial how to develop EDC apps and as a demo app for EDCs 

- https://editor-next.swagger.io for [openapi.yaml](openapi.yaml)
- https://mermaid.live for [sequencediagram.mermaid](sequencediagram.mermaid)

## General

### Why

Onboarding of use case developers follows a steep learning curve, since EDCs follows a complex terminology, processes and domain. At the same time demonstration of the technology is difficult, since it is only a tooling.

### Goal

- Allow self-onboarding of developers, showing how to develop u﻿se case apps for EDCs
  - Difference EDC Control Plane vs. EDC Data Plane
  - Create data offer
  - Fetch catalog
  - Use Custom attributes
  - Notification paradigm via parametrization
  - HTTP proxy transfer
  - Policies: Participant restriction
  - Contract Negotiation and it's state machine
  - Data Transfer requests and it's state machine
- Provide a use-case app that serves to demonstrate EDC and Data Space functionalities. 

### What

- Full code example of the chat app with proper specification
  - Kotlin + Quarkus
  - React + Next.js + Tailwind
  - Gradle, Docker, GitHub Actions
- Guided step-by-step tutorial, e.g.
  - Prepare development environemnt
  - Connect to API of EDC
  - Create a data offer
  - Consumer another's data
    - Fetch another's catalog
    - Negotiate a contract
    - Transfer data
  - Specific details
    - Notification paradigm
- Docker Images and deploy example 
