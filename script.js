document.getElementById('quadraticForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get coefficient values
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    
    const resultDiv = document.getElementById('result');
    const solutionDiv = document.getElementById('solution');
    
    // Clear previous results
    solutionDiv.innerHTML = '';
    
    // Check if a is zero (not a quadratic equation)
    if (a === 0) {
        solutionDiv.innerHTML = '<p class="error">Error: Coefficient "a" cannot be zero. This would not be a quadratic equation.</p>';
        resultDiv.classList.remove('hidden');
        return;
    }
    
    // Calculate discriminant
    const discriminant = b * b - 4 * a * c;
    
    // Display the equation
    solutionDiv.innerHTML += `<div class="solution-item"><strong>Equation:</strong> ${a}x² + ${b}x + ${c} = 0</div>`;
    solutionDiv.innerHTML += `<div class="solution-item"><strong>Discriminant (Δ):</strong> ${discriminant.toFixed(4)}</div>`;
    
    // Solve based on discriminant
    if (discriminant > 0) {
        // Two real solutions
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        
        solutionDiv.innerHTML += `<div class="solution-item success"><strong>Two real solutions:</strong></div>`;
        solutionDiv.innerHTML += `<div class="solution-item">x₁ = ${x1.toFixed(4)}</div>`;
        solutionDiv.innerHTML += `<div class="solution-item">x₂ = ${x2.toFixed(4)}</div>`;
    } else if (discriminant === 0) {
        // One real solution
        const x = -b / (2 * a);
        
        solutionDiv.innerHTML += `<div class="solution-item success"><strong>One real solution (repeated root):</strong></div>`;
        solutionDiv.innerHTML += `<div class="solution-item">x = ${x.toFixed(4)}</div>`;
    } else {
        // Complex solutions
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
        
        solutionDiv.innerHTML += `<div class="solution-item success"><strong>Two complex solutions:</strong></div>`;
        solutionDiv.innerHTML += `<div class="solution-item">x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i</div>`;
        solutionDiv.innerHTML += `<div class="solution-item">x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i</div>`;
    }
    
    // Show result
    resultDiv.classList.remove('hidden');
});
