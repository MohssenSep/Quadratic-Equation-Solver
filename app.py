from flask import Flask, render_template, request, jsonify
import numpy as np


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def calculate():
    # Get coefficients from request
    global real_part
    data = request.get_json()
    a = float(data['a'])
    b = float(data['b'])
    c = float(data['c'])

    # Calculate roots using quadratic formula
    discriminant = b ** 2 - 4 * a * c

    if discriminant > 0:
        x1 = (-b + np.sqrt(discriminant)) / (2 * a)
        x2 = (-b - np.sqrt(discriminant)) / (2 * a)
        roots = [x1, x2]
        root_status = "Two real roots"
    elif discriminant == 0:
        x = -b / (2 * a)
        roots = [x]
        root_status = "One real root (double root)"
    else:
        real_part = -b / (2 * a)
        imag_part = np.sqrt(abs(discriminant)) / (2 * a)
        roots = [f"{real_part:.1f} + {imag_part:.1f}i", f"{real_part:.1f} - {imag_part:.1f}i"]
        root_status = "Two complex roots"

    # Generate points for the curve
    # Create more points around the roots for a smoother curve
    if discriminant >= 0:
        if len(roots) == 2:
            x_min = min(roots) - 3
            x_max = max(roots) + 3
        else:
            x_min = roots[0] - 3
            x_max = roots[0] + 3
    else:
        x_min = real_part - 3
        x_max = real_part + 3

    x_values = np.linspace(x_min, x_max, 100).tolist()
    y_values = [a * x ** 2 + b * x + c for x in x_values]

    # Return results as JSON
    return jsonify({
        'x_values': x_values,
        'y_values': y_values,
        'roots': roots,
        'root_status': root_status,
        'discriminant': discriminant
    })


if __name__ == '__main__':
    app.run(debug=True)