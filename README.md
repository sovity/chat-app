# Chat App

Chat app serving as a developer tutorial how to develop EDC apps and as a demo app for EDCs

## Why

Onboarding of use case developers follows a steep learning curve, since EDCs follows a complex terminology, processes and domain. At the same time demonstration of the technology is difficult, since it is only a tooling.

## Architecture

The planning of the application can be found [here](docs/planning/README.md)

## Pre-requisites

### Backend

You need to provide a GitHub access token with the `packages:read` scope to access Maven repositories for dependencies.
To add the token, either have it configured as environment variables

```
GPR_USER=your-github-username
GPR_KEY=your-github-access-token
```

You can also make the configuration more permanent by creating a file named `gradle.properties` in `HOME_DIRECTORY/.gradle/` with the following content:

```
gpr.user=your-github-username
gpr.key=your-github-access-token
```
