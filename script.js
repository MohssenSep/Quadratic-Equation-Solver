document.getElementById('quadraticForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const resultDiv = document.getElementById('result');
    const solutionDiv = document.getElementById('solution');
    
    // Get coefficient values
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    
    // Clear previous results
    solutionDiv.innerHTML = '';
    
    // Check for invalid input
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        solutionDiv.innerHTML = '<p class="error">Error: Please enter valid numeric values for all coefficients.</p>';
        resultDiv.classList.remove('hidden');
        return;
    }
    
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
    
    // Draw the graph
    drawGraph(a, b, c, discriminant);
});

// Function to draw the quadratic function graph
function drawGraph(a, b, c, discriminant) {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Calculate vertex
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    
    // Calculate x-intercepts (solutions) if they exist
    let x1, x2;
    if (discriminant >= 0) {
        x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    }
    
    // Determine x range for plotting
    let xMin, xMax;
    if (discriminant >= 0) {
        const xRange = Math.abs(x1 - x2);
        const buffer = Math.max(2, xRange);
        xMin = Math.min(x1, x2, vertexX) - buffer;
        xMax = Math.max(x1, x2, vertexX) + buffer;
    } else {
        const buffer = Math.max(5, Math.abs(vertexX) * 0.5);
        xMin = vertexX - buffer;
        xMax = vertexX + buffer;
    }
    
    // Calculate y values for the range to determine y scale
    const step = (xMax - xMin) / 100;
    let yMin = vertexY;
    let yMax = vertexY;
    
    for (let x = xMin; x <= xMax; x += step) {
        const y = a * x * x + b * x + c;
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
    }
    
    // Add some padding to y range
    const yRange = yMax - yMin;
    const yPadding = Math.max(1, yRange * 0.2);
    yMin -= yPadding;
    yMax += yPadding;
    
    // Ensure y-axis includes 0 if it's close
    if (yMin > 0 && yMin < yRange * 0.3) yMin = -yRange * 0.1;
    if (yMax < 0 && yMax > -yRange * 0.3) yMax = yRange * 0.1;
    
    // Helper function to convert math coordinates to canvas coordinates
    function toCanvasX(x) {
        return padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    }
    
    function toCanvasY(y) {
        return height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
    }
    
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    const xStep = (xMax - xMin) / 10;
    for (let i = 0; i <= 10; i++) {
        const x = xMin + i * xStep;
        const canvasX = toCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(canvasX, padding);
        ctx.lineTo(canvasX, height - padding);
        ctx.stroke();
    }
    
    // Horizontal grid lines
    const yStep = (yMax - yMin) / 10;
    for (let i = 0; i <= 10; i++) {
        const y = yMin + i * yStep;
        const canvasY = toCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(padding, canvasY);
        ctx.lineTo(width - padding, canvasY);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    
    // X-axis (y=0)
    if (yMin <= 0 && yMax >= 0) {
        const y0 = toCanvasY(0);
        ctx.beginPath();
        ctx.moveTo(padding, y0);
        ctx.lineTo(width - padding, y0);
        ctx.stroke();
    }
    
    // Y-axis (x=0)
    if (xMin <= 0 && xMax >= 0) {
        const x0 = toCanvasX(0);
        ctx.beginPath();
        ctx.moveTo(x0, padding);
        ctx.lineTo(x0, height - padding);
        ctx.stroke();
    }
    
    // Draw parabola
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    
    let firstPoint = true;
    for (let x = xMin; x <= xMax; x += (xMax - xMin) / 200) {
        const y = a * x * x + b * x + c;
        const canvasX = toCanvasX(x);
        const canvasY = toCanvasY(y);
        
        if (firstPoint) {
            ctx.moveTo(canvasX, canvasY);
            firstPoint = false;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
    
    // Mark vertex
    ctx.fillStyle = '#4CAF50';
    const vx = toCanvasX(vertexX);
    const vy = toCanvasY(vertexY);
    ctx.beginPath();
    ctx.arc(vx, vy, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add vertex label
    ctx.fillStyle = '#4CAF50';
    ctx.font = '12px Arial';
    ctx.fillText(`Vertex (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`, vx + 10, vy - 10);
    
    // Mark solutions (x-intercepts) if they exist
    if (discriminant >= 0) {
        ctx.fillStyle = '#F44336';
        
        // Draw x1
        const cx1 = toCanvasX(x1);
        const cy1 = toCanvasY(0);
        ctx.beginPath();
        ctx.arc(cx1, cy1, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Label x1
        ctx.fillText(`x₁ = ${x1.toFixed(2)}`, cx1 - 30, cy1 - 10);
        
        // Draw x2 (only if different from x1)
        if (discriminant > 0) {
            const cx2 = toCanvasX(x2);
            const cy2 = toCanvasY(0);
            ctx.beginPath();
            ctx.arc(cx2, cy2, 5, 0, 2 * Math.PI);
            ctx.fill();
            
            // Label x2
            ctx.fillText(`x₂ = ${x2.toFixed(2)}`, cx2 - 30, cy2 + 20);
        }
    }
    
    // Add axis labels
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('x', width - padding + 10, toCanvasY(0) + 5);
    ctx.fillText('y', toCanvasX(0) + 5, padding - 10);
    
    // Add scale markers on axes
    ctx.fillStyle = '#666';
    ctx.font = '11px Arial';
    
    // X-axis markers
    const xMarkerStep = (xMax - xMin) / 5;
    for (let i = 0; i <= 5; i++) {
        const x = xMin + i * xMarkerStep;
        if (Math.abs(x) > 0.01 || x === 0) {
            const canvasX = toCanvasX(x);
            const canvasY = toCanvasY(0);
            ctx.fillText(x.toFixed(1), canvasX - 10, canvasY + 20);
        }
    }
    
    // Y-axis markers
    const yMarkerStep = (yMax - yMin) / 5;
    for (let i = 0; i <= 5; i++) {
        const y = yMin + i * yMarkerStep;
        if (Math.abs(y) > 0.01 || y === 0) {
            const canvasX = toCanvasX(0);
            const canvasY = toCanvasY(y);
            ctx.fillText(y.toFixed(1), canvasX + 10, canvasY + 5);
        }
    }
}
