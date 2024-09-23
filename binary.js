document.addEventListener("DOMContentLoaded", function() {
    const aBits = document.querySelectorAll('#row-a .bit');
    const bBits = document.querySelectorAll('#row-b .bit');
    const sumBits = document.querySelectorAll('#row-result .bit');
    const decimalSumOutput = document.getElementById('decimal-sum'); // Element to display decimal sum
    const colorDisplay = document.getElementById('color-display');   // Element to show the selected color
    
    let aValue = Array(8).fill(0); // Initialize Value A as an array of 8 bits (all 0s)
    let bValue = Array(8).fill(0); // Initialize Value B as an array of 8 bits (all 0s)

    const colorPalette = [
        '#000000', '#800000', '#008000', '#808000', '#000080', '#800080', 
        '#008080', '#c0c0c0', '#c0dcc0', '#a6caf0', '#2a3faa', '#2a3fff', 
        '#2a5f00', '#2a5f55', '#2a5faa', '#2a5fff', '#2a7f00', '#2a7f55', 
        '#2a7faa', '#2a7fff', '#2a9f00', '#2a9f55', '#2a9faa', '#2a9fff', 
        '#2abf00', '#2abf55', '#2abfaa', '#2abfff', '#2adf00', '#2adf55', 
        '#2adfaa', '#2adfff', '#2aff00', '#2aff55', '#2affaa', '#2affff', 
        '#550000', '#550055', '#5500aa', '#5500ff', '#551f00', '#551f55', 
        '#551faa', '#551fff', '#553f00', '#553f55', '#553faa', '#553fff', 
        '#555f00', '#555f55', '#555faa', '#555fff', '#557f00', '#557f55', 
        '#557faa', '#557fff', '#559f00', '#559f55', '#559faa', '#559fff', 
        '#55bf00', '#55bf55', '#55bfaa', '#55bfff', '#55df00', '#55df55', 
        '#55dfaa', '#55dfff', '#55ff00', '#55ff55', '#55ffaa', '#55ffff', 
        '#7f0000', '#7f0055', '#7f00aa', '#7f00ff', '#7f1f00', '#7f1f55', 
        '#7f1faa', '#7f1fff', '#7f3f00', '#7f3f55', '#7f3faa', '#7f3fff', 
        '#7f5f00', '#7f5f55', '#7f5faa', '#7f5fff', '#7f7f00', '#7f7f55', 
        '#7f7faa', '#7f7fff', '#7f9f00', '#7f9f55', '#7f9faa', '#7f9fff', 
        '#7fbf00', '#7fbf55', '#7fbfaa', '#7fbfff', '#7fdf00', '#7fdf55', 
        '#7fdfaa', '#7fdfff', '#7fff00', '#7fff55', '#7fffaa', '#7fffff', 
        '#aa0000', '#aa0055', '#aa00aa', '#aa00ff', '#aa1f00', '#aa1f55', 
        '#aa1faa', '#aa1fff', '#aa3f00', '#aa3f55', '#aa3faa', '#aa3fff', 
        '#aa5f00', '#aa5f55', '#aa5faa', '#aa5fff', '#aa7f00', '#aa7f55', 
        '#aa7faa', '#aa7fff', '#aa9f00', '#aa9f55', '#aa9faa', '#aa9fff', 
        '#aabf00', '#aabf55', '#aabfaa', '#aabfff', '#aadf00', '#aadf55', 
        '#aadfaa', '#aadfff', '#aaff00', '#aaff55', '#aaffaa', '#aaffff', 
        '#d40000', '#d40055', '#d400aa', '#d400ff', '#d41f00', '#d41f55', 
        '#d41faa', '#d41fff', '#d43f00', '#d43f55', '#d43faa', '#d43fff', 
        '#d45f00', '#d45f55', '#d45faa', '#d45fff', '#d47f00', '#d47f55', 
        '#d47faa', '#d47fff', '#d49f00', '#d49f55', '#d49faa', '#d49fff', 
        '#d4bf00', '#d4bf55', '#d4bfaa', '#d4bfff', '#d4df00', '#d4df55', 
        '#d4dfaa', '#d4dfff', '#d4ff00', '#d4ff55', '#d4ffaa', '#d4ffff', 
        '#ff0055', '#ff00aa', '#ff1f00', '#ff1f55', '#ff1faa', '#ff1fff', 
        '#ff3f00', '#ff3f55', '#ff3faa', '#ff3fff', '#ff5f00', '#ff5f55', 
        '#ff5faa', '#ff5fff', '#ff7f00', '#ff7f55', '#ff7faa', '#ff7fff', 
        '#ff9f00', '#ff9f55', '#ff9faa', '#ff9fff', '#ffbf00', '#ffbf55', 
        '#ffbfaa', '#ffbfff', '#ffdf00', '#ffdf55', '#ffdfaa', '#ffdfff', 
        '#ffff55', '#ffffaa', '#ccccff', '#ffccff', '#33ffff', '#66ffff', 
        '#99ffff', '#ccffff', '#007f00', '#007f55', '#007faa', '#007fff', 
        '#009f00', '#009f55', '#009faa', '#009fff', '#00bf00', '#00bf55', 
        '#00bfaa', '#00bfff', '#00df00', '#00df55', '#00dfaa', '#00dfff', 
        '#00ff55', '#00ffaa', '#2a0000', '#2a0055', '#2a00aa', '#2a00ff', 
        '#2a1f00', '#2a1f55', '#2a1faa', '#2a1fff', '#2a3f00', '#2a3f55', 
        '#fffbf0', '#a0a0a4', '#808080', '#ff0000', '#00ff00', '#ffff00', 
        '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
    ];

    // Function to update the sum and display it
    function updateSum() {
        // Convert the binary arrays to decimal
        const aDecimal = parseInt(aValue.join(''), 2);
        const bDecimal = parseInt(bValue.join(''), 2);
        
        // Calculate the sum of A and B
        const sumDecimal = aDecimal + bDecimal;
        
        // Convert the sum back to binary (as a string of length 8, padded with 0s)
        const sumBinary = sumDecimal.toString(2).padStart(8, '0');
        
        // Update the sum row's bits based on the binary result
        sumBits.forEach((bit, index) => {
            if (sumBinary[index] === '1') {
                bit.classList.add('active');
            } else {
                bit.classList.remove('active');
            }
        });

        // Update the decimal sum in the HTML
        decimalSumOutput.textContent = sumDecimal;

        // Get the corresponding color from the palette (wrap sumDecimal to 255)
        const color = colorPalette[sumDecimal % 256];

        // Update the color display (set background color)
        colorDisplay.style.backgroundColor = color;
    }

    // Add click event listeners for Value A bits
    aBits.forEach((bit, index) => {
        bit.addEventListener('click', function() {
            bit.classList.toggle('active');
            // Update A value array based on the bit's state
            aValue[index] = bit.classList.contains('active') ? 1 : 0;
            // Update the sum
            updateSum();
        });
    });

    // Add click event listeners for Value B bits
    bBits.forEach((bit, index) => {
        bit.addEventListener('click', function() {
            bit.classList.toggle('active');
            // Update B value array based on the bit's state
            bValue[index] = bit.classList.contains('active') ? 1 : 0;
            // Update the sum
            updateSum();
        });
    });
});

// Create the Full Adder circuit
// Create a Full Adder SVG for a specific bit index (1 to 8)
function createFullAdder(bitIndex) {
    const adder = document.createElement('div');
    adder.className = 'full-adder';
    adder.innerHTML = `
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
            <path id="wire-a-${bitIndex}" d="M128 80V40h60m0 41V17" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-b-${bitIndex}" d="M152 95V55h60m0 41V17" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-cin-${bitIndex}" d="M300 51V160m0-44H230v44" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-xor1-out-${bitIndex}" d="M200 110v30h92v32m-72-32v30" fill="none" stroke="#ccc" stroke-width="2"/>
            <line id="wire-xor2-out-${bitIndex}" x1="290" y1="175" x2="290" y2="250" stroke="#ccc" stroke-width="2"/>
            <path id="wire-and1-out-${bitIndex}" d="M140 100V235" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-and2-out-${bitIndex}" d="M220 176v59H157" fill="none" stroke="#ccc" stroke-width="2"/>
            <line id="wire-or-out-${bitIndex}" x1="150" y1="235" x2="150" y2="300" stroke="#ccc" stroke-width="2"/>
            
            <circle id="gate-xor1-${bitIndex}" cx="200" cy="100" r="25" fill="#fff" stroke="#000"/>
            <text x="190" y="105" font-family="Arial" font-size="12">XOR</text>
            
            <circle id="gate-xor2-${bitIndex}" cx="290" cy="175" r="25" fill="#fff" stroke="#000"/>
            <text x="275" y="180" font-family="Arial" font-size="12">XOR</text>
            
            <path id="gate-and1-${bitIndex}" d="M163.5 76.495c.5 30.505 2.55 51.2975-22.95 51.2975-28.05 0-23.8-20.9525-24.225-51.442" fill="#fff" stroke="#000"/>
            <text x="127" y="105" font-family="Arial" font-size="12">AND</text>
            
            <path id="gate-and2-${bitIndex}" d="M244.5 151.495c.5 30.505 2.55 51.2975-22.95 51.2975-28.05 0-23.8-20.9525-24.225-51.442" fill="#fff" stroke="#000"/>
            <text x="207" y="180" font-family="Arial" font-size="12">AND</text>
            
            <circle id="gate-or-${bitIndex}" cx="150" cy="235" r="25" fill="#fff" stroke="#000"/>
            <text x="140" y="235" font-family="Arial" font-size="12">OR</text>
            
            <text id="label-a-${bitIndex}" x="183" y="10" font-family="Arial" font-size="12">A</text>
            <text id="label-b-${bitIndex}" x="210" y="10" font-family="Arial" font-size="12">B</text>
            <text id="label-cin-${bitIndex}" x="287" y="45" font-family="Arial" font-size="12">Cin</text>
            <text id="label-sum-${bitIndex}" x="277" y="270" font-family="Arial" font-size="12">Sum</text>
            <text id="label-cout-${bitIndex}" x="135" y="320" font-family="Arial" font-size="12">Cout</text>
        </svg>
    `;
    return adder;
}

// Update the Full Adder circuit for a specific bit index (1 to 8) based on inputs
function updateFullAdder(bitIndex, a, b, cin) {
    const xor1 = a ^ b;
    const xor2 = xor1 ^ cin;
    const and1 = a & b;
    const and2 = xor1 & cin;
    const or = and1 | and2;

    updateWire(`wire-a-${bitIndex}`, a);
    updateWire(`wire-b-${bitIndex}`, b);
    updateWire(`wire-cin-${bitIndex}`, cin);
    updateWire(`wire-xor1-out-${bitIndex}`, xor1);
    updateWire(`wire-xor2-out-${bitIndex}`, xor2);
    updateWire(`wire-and1-out-${bitIndex}`, and1);
    updateWire(`wire-and2-out-${bitIndex}`, and2);
    updateWire(`wire-or-out-${bitIndex}`, or);

    updateGate(`gate-xor1-${bitIndex}`, xor1);
    updateGate(`gate-xor2-${bitIndex}`, xor2);
    updateGate(`gate-and1-${bitIndex}`, and1);
    updateGate(`gate-and2-${bitIndex}`, and2);
    updateGate(`gate-or-${bitIndex}`, or);

    updateLabel(`label-a-${bitIndex}`, a);
    updateLabel(`label-b-${bitIndex}`, b);
    updateLabel(`label-cin-${bitIndex}`, cin);
    updateLabel(`label-sum-${bitIndex}`, xor2);
    updateLabel(`label-cout-${bitIndex}`, or);

    return or; // Return the carry-out for the next bit
}

// Initialize the Full Adders for all bits (1 to 8)
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 8; i++) {
        const adderContainer = document.getElementById(`bit-circuit-${i}`);
        adderContainer.appendChild(createFullAdder(i));
    }
    
    // Initial update (all inputs 0)
    updateAllFullAdders();
});

// Update all Full Adders based on the state of the calculator
function updateAllFullAdders() {
    let carry = 0;

    for (let i = 8; i >= 1; i--) { // Loop from bit 8 down to 1
        const a = document.getElementById(`a-bit-${i}`).classList.contains('active') ? 1 : 0;
        const b = document.getElementById(`b-bit-${i}`).classList.contains('active') ? 1 : 0;
        carry = updateFullAdder(i, a, b, carry); // Pass the carry from the previous bit
    }
}

// Event listener for input changes on the calculator bits
document.querySelectorAll('#row-a .bit, #row-b .bit').forEach(bit => {
    bit.addEventListener('click', () => {
        setTimeout(updateAllFullAdders, 0); // Update all adders after the bit state changes
    });
});

// Update wire stroke based on value (for each bit index)
function updateWire(id, value) {
    const wire = document.getElementById(id);
    wire.style.stroke = value ? '#4CAF50' : '#FF5252';
}

// Update gate fill based on value (for each bit index)
function updateGate(id, value) {
    const gate = document.getElementById(id);
    gate.style.fill = value ? '#4CAF50' : '#FF5252';
}

// Update label text fill color based on value (for each bit index)
function updateLabel(id, value) {
    const label = document.getElementById(id);
    label.style.fill = value ? '#4CAF50' : '#FF5252';
}

// Add this to your existing event listeners for the calculator bits
document.querySelectorAll('#row-a .bit, #row-b .bit').forEach(bit => {
    bit.addEventListener('click', onCalculatorInputChange);
});