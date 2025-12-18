# Quadratic Equation Solver

A static web application for solving quadratic equations and visualizing their graphs. This application runs entirely in your browser with no server required.

## Live Demo

Visit the live application: [https://mohssensep.github.io/Quadratic-Equation-Solver/](https://mohssensep.github.io/Quadratic-Equation-Solver/)

## Features

- Solve quadratic equations of the form **y = ax² + bx + c**
- Calculate real and complex roots
- Display the discriminant
- Interactive visualization of the quadratic function
- Real-time equation display as you type coefficients
- Red markers showing the roots on the graph (for real roots)

## How to Use

1. Enter the coefficients for your quadratic equation:
   - **Coefficient a**: The coefficient of x² (cannot be zero)
   - **Coefficient b**: The coefficient of x
   - **Coefficient c**: The constant term

2. Click the **Calculate** button

3. The application will display:
   - The roots of the equation (real or complex)
   - The discriminant value
   - A graph of the quadratic function
   - Root markers on the graph (for real roots)

## Running Locally

Simply open `index.html` in any modern web browser. No installation or dependencies required!

## Technology Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- Plotly.js for interactive graphs

## GitHub Pages Deployment

This application is automatically deployed to GitHub Pages. Any changes pushed to the main branch will be reflected on the live site.

## Examples

- **Two real roots**: Try a=1, b=0, c=-4 (roots at x = -2 and x = 2)
- **One real root**: Try a=1, b=-2, c=1 (double root at x = 1)
- **Complex roots**: Try a=1, b=0, c=4 (roots are 0.0 ± 2.0i)
