# Technical Test for Principal Developer - Front-End

## Overview

This technical test is designed to assess your skills and approach in building and improving an existing React application. We're looking forward to seeing how you transform the provided code to be production-ready.

- **Test Duration:** 1 hour and 30 minutes.
- **Time Management:** Analysis, planning, coding, and, if possible, writing tests.

## Instructions

1. Clone this repository.
2. Install dependencies and start the servers.
3. Refactor the code in `App.jsx`.
4. Improve code quality for a production environment.
5. Add tests to validate functionalities, if possible.
6. Commit changes and create a Pull Request for review.

## Allowed Resources

- Use of any necessary library or framework.
- Internet access for research.

## Submission

- Submit your solution as a Pull Request to this repository.
- Include comments in your code for explanations.

Good luck! We are eager to see your solution forward to seeing how you transform the provided code to be production-ready.

## Project Description

This project revolves around a simple yet dynamic TodoList application, which incorporates category-based organization for todos. The application allows for the creation and assignment of categories to each todo item, enhancing the user's ability to manage and prioritize tasks effectively.

A unique feature of this application is the automatic assignment of a random pastel color to each newly created category. This color-coding not only adds a visual appeal but also aids in quickly identifying and differentiating between various categories.

We have integrated the Radix UI library (https://www.radix-ui.com/) for the user interface components. This choice alleviates the need to focus on styling and CSS, allowing you to concentrate on functionality and code quality.

Additionally, the application utilizes `json-server`, a simple yet powerful tool that enables you to set up a fake REST API with zero coding in no time. It uses a JSON file to store data, which makes it extremely lightweight and perfect for simulating a backend for development and testing purposes. This allows for a seamless and realistic interaction with API endpoints for CRUD operations without the need for an actual backend server.

## Setup and Running the Project

Follow these steps to set up the project:

1. **Installing Dependencies:**

   - Execute `yarn install` to install all required libraries and dependencies.

2. **Running the Project:**
   - Run `yarn dev` to start the ViteJS development server.
   - Use `yarn server` to start the `json-server` for backend simulation.
   - Both need to run in parallel for the application to work properly.

Ensure both the development server and `json-server` are running simultaneously for full functionality.

## Objective

Refactor and improve the provided code, focusing on:

- Clean code practices
- Reducing coupling
- Applying the DRY (Don't Repeat Yourself) principle
- Other improvements for production readiness

## Evaluation Criteria

- **Architecture and Design:** Code structure, organization, design patterns.
- **Clean Code:** Readability, meaningful naming, simplicity.
- **DRY Principle:** Minimizing repetitions.
- **Performance:** Optimizations for better performance.
- **Security:** Vulnerability identification and correction.
- **Testing:** Implementing tests (unit, integration, etc.), if feasible.
- **Documentation:** Clear, helpful code comments.
