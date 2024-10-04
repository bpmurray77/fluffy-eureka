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
        <svg viewBox="0 0 230 400" width="100%" height="100%" overflow="visible" xmlns="http://www.w3.org/2000/svg">
            <path id="wire-a-${bitIndex}" d="M128 80V40h60m0 41V17" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-b-${bitIndex}" d="M152 95V55h60m0 41V17" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-cin-${bitIndex}" d="M300 51V160m0-44H230v44" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-xor1-out-${bitIndex}" d="M200 110v30h92v32m-72-32v30" fill="none" stroke="#ccc" stroke-width="2"/>
            <line id="wire-xor2-out-${bitIndex}" x1="290" y1="175" x2="290" y2="250" stroke="#ccc" stroke-width="2"/>
            <path id="wire-and1-out-${bitIndex}" d="M140 100V235" fill="none" stroke="#ccc" stroke-width="2"/>
            <path id="wire-and2-out-${bitIndex}" d="M220 176v59H157" fill="none" stroke="#ccc" stroke-width="2"/>
            <line id="wire-or-out-${bitIndex}" x1="150" y1="235" x2="150" y2="300" stroke="#ccc" stroke-width="2"/>
            
            <path id="gate-xor1-${bitIndex}" d="M177 77c.75 29.84 8 31 24.55 50.7925C217 108 224 107 224 77c-14 7-32 7-47 0m0-7c19 9 32 9 48 0" fill="#fff" stroke="#000"/>
            <text x="188" y="103" font-family="Arial" font-size="12">XOR</text>
            
            <path id="gate-xor2-${bitIndex}" d="M266 156c.75 29.84 8 31 24.55 50.7925C306 187 313 186 313 156c-14 7-32 7-47 0m0-7c19 9 32 9 48 0" fill="#fff" stroke="#000"/>
            <text x="277" y="180" font-family="Arial" font-size="12">XOR</text>
            
            <path id="gate-and1-${bitIndex}" d="M163.5 76.495c.5 30.505 2.55 51.2975-22.95 51.2975-28.05 0-23.8-20.9525-24.225-51.442" fill="#fff" stroke="#000"/>
            <text x="127" y="103" font-family="Arial" font-size="12">AND</text>
            
            <path id="gate-and2-${bitIndex}" d="M244.5 151.495c.5 30.505 2.55 51.2975-22.95 51.2975-28.05 0-23.8-20.9525-24.225-51.442" fill="#fff" stroke="#000"/>
            <text x="207" y="180" font-family="Arial" font-size="12">AND</text>
            
            <path id="gate-or-${bitIndex}" d="M126 217c.75 29.84 8 31 24.55 50.7925C166 248 173 247 173 217c-14 7-32 7-47 0" fill="#fff" stroke="#000"/>
            <text x="140" y="244" font-family="Arial" font-size="12">OR</text>
            
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

document.addEventListener("DOMContentLoaded", function() {
    const inputA = document.getElementById('inputA');
    const inputB = document.getElementById('inputB');
    const transistorAc = document.getElementById('transistorAc');
    const transistorAl = document.getElementById('transistorAl');
    const transistorBc = document.getElementById('transistorBc');
    const transistorBl = document.getElementById('transistorBl');
    const outputAnd = document.getElementById('outputAnd');
    const logicA1 = document.getElementById('logicA1');
    const logicA2 = document.getElementById('logicA2');

    let stateA = false;
    let stateB = false;

    function updateTransistor() {
        transistorAc.setAttribute('fill', stateA ? '#4CAF50' : '#FF5252');
        transistorBc.setAttribute('fill', stateB ? '#4CAF50' : '#FF5252');
        transistorAl.style.transform = stateA ? 'translateX(15px)' : 'translateX(0)';
        transistorBl.style.transform = stateB ? 'translateX(15px)' : 'translateX(0)';
        outputAnd.setAttribute('fill', (stateA && stateB) ? '#4CAF50' : '#FF5252');
        logicA1.setAttribute('stroke', (stateA) ? '#4CAF50' : '#FF5252');
        logicA2.setAttribute('stroke', (stateA && stateB) ? '#4CAF50' : '#FF5252');
    }

    inputA.addEventListener('click', () => {
        stateA = !stateA;
        inputA.setAttribute('fill', stateA ? '#4CAF50' : '#FF5252');
        updateTransistor();
    });

    inputB.addEventListener('click', () => {
        stateB = !stateB;
        inputB.setAttribute('fill', stateB ? '#4CAF50' : '#FF5252');
        updateTransistor();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const inputC = document.getElementById('inputC');
    const inputD = document.getElementById('inputD');
    const transistorCc = document.getElementById('transistorCc');
    const transistorCl = document.getElementById('transistorCl');
    const transistorDc = document.getElementById('transistorDc');
    const transistorDl = document.getElementById('transistorDl');
    const oroutput = document.getElementById('oroutput');
    const magicor = document.getElementById('magicor');
    const logicB1 = document.getElementById('logicB1');
    const logicB2 = document.getElementById('logicB2');
    const logicB3 = document.getElementById('logicB3');
    const logicB4 = document.getElementById('logicB4');

    let stateC = false;
    let stateD = false;

    function updateTransistorOr() {
        transistorCc.setAttribute('fill', stateC ? '#4CAF50' : '#FF5252');
        logicB1.setAttribute('stroke', stateC ? '#4CAF50' : '#FF5252');
        logicB2.setAttribute('stroke', stateC ? '#4CAF50' : '#FF5252');
        logicB3.setAttribute('stroke', stateD ? '#4CAF50' : '#FF5252');
        logicB4.setAttribute('stroke', stateD ? '#4CAF50' : '#FF5252');
        transistorDc.setAttribute('fill', stateD ? '#4CAF50' : '#FF5252');
        transistorCl.style.transform = stateC ? 'translateX(15px)' : 'translateX(0)';
        transistorDl.style.transform = stateD ? 'translateX(-15px)' : 'translateX(0)';
        oroutput.setAttribute('fill', (stateC || stateD) ? '#4CAF50' : '#FF5252');
        magicor.setAttribute('fill', (stateC || stateD) ? '#4CAF50' : '#FF5252');
    }

    inputC.addEventListener('click', () => {
        stateC = !stateC;
        inputC.setAttribute('fill', stateC ? '#4CAF50' : '#FF5252');
        updateTransistorOr();
    });

    inputD.addEventListener('click', () => {
        stateD = !stateD;
        inputD.setAttribute('fill', stateD ? '#4CAF50' : '#FF5252');
        updateTransistorOr();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const inputE = document.getElementById('inputE');
    const inputF = document.getElementById('inputF');
    const transistorEcn = document.getElementById('transistorEcn');
    const transistorEln = document.getElementById('transistorEln');
    const transistorEcp = document.getElementById('transistorEcp');
    const transistorElp = document.getElementById('transistorElp');
    const transistorFcn = document.getElementById('transistorFcn');
    const transistorFln = document.getElementById('transistorFln');
    const transistorFcp = document.getElementById('transistorFcp');
    const transistorFlp = document.getElementById('transistorFlp');
    const xoroutput = document.getElementById('xoroutput');
    const logicC4 = document.getElementById('logicC4');
    const logicC3 = document.getElementById('logicC3');
    const logicC2 = document.getElementById('logicC2');
    const logicC1 = document.getElementById('logicC1');
    const logicC5 = document.getElementById('logicC5');
    const logicC6 = document.getElementById('logicC6');

    let stateE = false;
    let stateF = false;

    function updateTransistorXor() {
        transistorEcn.setAttribute('fill', stateE ? '#4CAF50' : '#FF5252');
        transistorFcn.setAttribute('fill', stateF ? '#4CAF50' : '#FF5252');
        transistorEln.style.transform = stateE ? 'translateX(15px)' : 'translateX(0)';
        transistorFln.style.transform = stateF ? 'translateX(-15px)' : 'translateX(0)';
        transistorEcp.setAttribute('fill', stateE ? '#FF5252' : '#4CAF50');
        transistorFcp.setAttribute('fill', stateF ? '#FF5252' : '#4CAF50');
        transistorElp.style.transform = stateE ? 'translateX(15px)' : 'translateX(0)';
        transistorFlp.style.transform = stateF ? 'translateX(-15px)' : 'translateX(0)';
        xoroutput.setAttribute('fill', (stateE ^ stateF) ? '#4CAF50' : '#FF5252');
        logicC4.setAttribute('stroke', (stateE ^ stateF) && stateF ? '#4CAF50' : '#FF5252');
        logicC3.setAttribute('stroke', (stateE ^ stateF) && stateF ? '#4CAF50' : '#FF5252');
        logicC2.setAttribute('stroke', (stateE ^ stateF) && stateE ? '#4CAF50' : '#FF5252');
        logicC1.setAttribute('stroke', (stateE ^ stateF) && stateE ? '#4CAF50' : '#FF5252');
        logicC5.setAttribute('stroke', stateE ? '#4CAF50' : '#FF5252');
        logicC6.setAttribute('stroke', stateE ? '#FF5252' : '#4CAF50');
    }

    inputE.addEventListener('click', () => {
        stateE = !stateE;
        inputE.setAttribute('fill', stateE ? '#4CAF50' : '#FF5252');
        updateTransistorXor();
    });

    inputF.addEventListener('click', () => {
        stateF = !stateF;
        inputF.setAttribute('fill', stateF ? '#4CAF50' : '#FF5252');
        updateTransistorXor();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const inputG = document.getElementById('inputG');
    const medium_charge = document.getElementById('medium_charge');
    const medium = document.getElementById('medium');
    const output1 = document.getElementById('output1');

    let stateG = false;

    function updateMedium() {
        medium_charge.style.transform = stateG ? 'translateY(25px)' : 'translateY(0)';
        medium.setAttribute('fill', stateG ? '#4CAF50' : '#FF5252');
        output1.setAttribute('fill', stateG ? '#4CAF50' : '#FF5252');
    }

    inputG.addEventListener('click', () => {
        stateG = !stateG;
        inputG.setAttribute('fill', stateG ? '#4CAF50' : '#FF5252');
        updateMedium();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
        const tooltipText = tooltip.querySelector('.tooltiptext');
        
        tooltip.addEventListener('mouseenter', (e) => {
            const rect = tooltip.getBoundingClientRect();
            const tooltipRect = tooltipText.getBoundingClientRect();
            const offset = 10; // Distance from edge and cursor

            // Calculate position
            let left = e.clientX + offset;
            let top = rect.bottom + offset;

            // Adjust for right edge
            if (left + tooltipRect.width > window.innerWidth - offset) {
                left = window.innerWidth - tooltipRect.width - offset;
            }

            // Adjust for bottom edge
            if (top + tooltipRect.height > window.innerHeight - offset) {
                top = rect.top - tooltipRect.height - offset;
            }

            // Apply position
            tooltipText.style.left = `${left}px`;
            tooltipText.style.top = `${top}px`;
        });
    });
});

// Select the scrollable container and the element (SVG container)
const docContainer = document.querySelector('.documentation-container');
const magicor = document.getElementById('magicor');

// Define a scroll point where you want the element to appear
const scrollPoint = 10000; 

// Add a scroll event listener to the specific scrollable div
docContainer.addEventListener('scroll', () => {
  
  const scrollPosition = docContainer.scrollTop;

  // Show the element when the user scrolls past the scroll point
  if (scrollPosition > scrollPoint) {
    magicor.classList.add('show');
  } else {
    // Keep the element visible even when scrolling back up
    if (magicor.classList.contains('show')) {
      magicor.classList.add('show');
    }
  }

  if (scrollPosition > scrollPoint) {
    magicxor.classList.add('show');
  } else {
    
    if (magicxor.classList.contains('show')) {
      magicxor.classList.add('show');
    }
  }
});

document.addEventListener("DOMContentLoaded", function() {
    const inputX = document.getElementById('inputX');
    const inputZ = document.getElementById('inputZ');
    const inputY = document.getElementById('inputY');
    const xor1An = document.getElementById('transistorXor1An');
    const xor1Bn = document.getElementById('transistorXor1Bn');
    const xor1Ap = document.getElementById('transistorXor1Ap');
    const xor1Bp = document.getElementById('transistorXor1Bp');
    const and1A = document.getElementById('transistorAnd1A');
    const and1B = document.getElementById('transistorAnd1B');
    const and2A = document.getElementById('transistorAnd2A');
    const and2B = document.getElementById('transistorAnd2B');
    const xor2An = document.getElementById('transistorXor2An');
    const xor2Bn = document.getElementById('transistorXor2Bn');
    const xor2Ap = document.getElementById('transistorXor2Ap');
    const xor2Bp = document.getElementById('transistorXor2Bp');
    const orA = document.getElementById('transistorOrA');
    const orB = document.getElementById('transistorOrB');
    const outputSum = document.getElementById('outputSum');
    const outputCarry = document.getElementById('outputCarry');
    const wireA = document.getElementById('wireA');
    const wireB = document.getElementById('wireB');
    const wireCin = document.getElementById('wireCin');
    const xor1out = document.getElementById('xor1out');
    const xor1out1 = document.getElementById('xor1out1');
    const xor1out2 = document.getElementById('xor1out2');
    const xor2out1 = document.getElementById('xor2out1');
    const xor2out2 = document.getElementById('xor2out2');
    const orOutl = document.getElementById('orOutl');
    const orOutr = document.getElementById('orOutr');
    const orOut = document.getElementById('orOut');
    const xor2out = document.getElementById('xor2out');
    const and1out = document.getElementById('and1out');
    const and2out = document.getElementById('and2out');
    const xor1lcon = document.getElementById('xor1lcon');
    const xor1rcon = document.getElementById('xor1rcon');
    const xor2lcon = document.getElementById('xor2lcon');
    const xor2rcon = document.getElementById('xor2rcon');
    const and1con = document.getElementById('and1con');

    const configurations = {
        'false_false_false': 'With no signals coming from any of the inputs, none of the logic gates pass a signal along and neither the sum nor the carry output turn on.',
        'false_false_true': 'With only the B input on the first XOR gate can pass a signal, but the AND gate cannot. The signal from the first XOR gate allows a signal to pass through the second XOR gate since the carry input is off. Also, since the carry input is off, the second AND gate cannot pass a signal. The second XOR gate output means that the sum of A and B is 1 with no carry.',
        'false_true_false': 'Text for X: false, Y: true, Z: false',
        'false_true_true': 'Text for X: false, Y: true, Z: true',
        'true_false_false': 'Text for X: true, Y: false, Z: false',
        'true_false_true': 'Text for X: true, Y: false, Z: true',
        'true_true_false': 'Text for X: true, Y: true, Z: false',
        'true_true_true': 'Text for X: true, Y: true, Z: true'
    };
    const contentDiv = document.getElementById('content-div');

    let stateX = false;
    let stateZ = false;
    let stateY = false;

    function updateDocumentation() {
        const key = `${stateX}_${stateY}_${stateZ}`;
        contentDiv.innerText = configurations[key];
    }

    function updateTransistor() {
        // XOR 1 Logic (A XOR B)
        const xor1 = stateX ^ stateZ;
        xor1An.setAttribute('fill', stateX ? '#4CAF50' : '#FF5252');
        xor1Bn.setAttribute('fill', stateZ ? '#4CAF50' : '#FF5252');
        xor1Ap.setAttribute('fill', stateX ? '#FF5252' : '#4CAF50');
        xor1Bp.setAttribute('fill', stateZ ? '#FF5252' : '#4CAF50');
        wireA.setAttribute('stroke', stateX ? '#4CAF50' : '#FF5252');
        wireB.setAttribute('stroke', stateZ ? '#4CAF50' : '#FF5252');
        wireCin.setAttribute('stroke', stateY ? '#4CAF50' : '#FF5252');
        xor1out.setAttribute('stroke', xor1 ? '#4CAF50' : '#FF5252');
        xor1out1.setAttribute('stroke', xor1 && stateZ ? '#4CAF50' : '#FF5252');
        xor1out2.setAttribute('stroke', xor1 && stateX ? '#4CAF50' : '#FF5252');
        xor1lcon.setAttribute('stroke', xor1 && stateX ? '#4CAF50' : '#FF5252');
        xor1rcon.setAttribute('stroke', xor1 && stateZ ? '#4CAF50' : '#FF5252');

        // AND Logic (A AND B)
        const and1 = stateX && stateZ;
        and1A.setAttribute('fill', stateX ? '#4CAF50' : '#FF5252');
        and1B.setAttribute('fill', stateZ ? '#4CAF50' : '#FF5252');
        and1out.setAttribute('stroke', and1 ? '#4CAF50' : '#FF5252');
        and1con.setAttribute('stroke', stateX ? '#4CAF50' : '#FF5252');

        // AND 2 Logic (A AND B)
        const and2 = xor1 && stateY;
        and2A.setAttribute('fill', xor1 ? '#4CAF50' : '#FF5252');
        and2out.setAttribute('stroke', and2 ? '#4CAF50' : '#FF5252');
        and2B.setAttribute('fill', stateY ? '#4CAF50' : '#FF5252');

        // XOR 2 Logic (XOR1 XOR Cin -> Assume Cin=0 for now)
        const xor2 = xor1 ^ stateY;
        xor2An.setAttribute('fill', xor1 ? '#4CAF50' : '#FF5252');
        xor2Bn.setAttribute('fill', stateY ? '#4CAF50' : '#FF5252');
        xor2Ap.setAttribute('fill', xor1 ? '#FF5252' : '#4CAF50');
        xor2Bp.setAttribute('fill', stateY ? '#FF5252' : '#4CAF50');
        xor2out.setAttribute('stroke', xor2 ? '#4CAF50' : '#FF5252');
        xor2out1.setAttribute('stroke', xor2 && stateY ? '#4CAF50' : '#FF5252');
        xor2out2.setAttribute('stroke', xor2 && xor1 ? '#4CAF50' : '#FF5252');
        xor2lcon.setAttribute('stroke', xor2 && xor1 ? '#4CAF50' : '#FF5252');
        xor2rcon.setAttribute('stroke', xor2 && stateY ? '#4CAF50' : '#FF5252');

        // OR Logic (AND1 OR XOR2)
        const orResult = and1 || and2;
        orA.setAttribute('fill', and1 ? '#4CAF50' : '#FF5252');
        orB.setAttribute('fill', and2 ? '#4CAF50' : '#FF5252');
        orOut.setAttribute('stroke', orResult ? '#4CAF50' : '#FF5252');
        orOutl.setAttribute('stroke', orResult && and1 ? '#4CAF50' : '#FF5252');
        orOutr.setAttribute('stroke', orResult && and2 ? '#4CAF50' : '#FF5252');

        // Update Sum and Carry Outputs
        outputSum.setAttribute('fill', xor2 ? '#4CAF50' : '#FF5252');
        outputCarry.setAttribute('fill', orResult ? '#4CAF50' : '#FF5252');

        updateDocumentation();
    }

    inputX.addEventListener('click', () => {
        stateX = !stateX;
        inputX.setAttribute('fill', stateX ? '#4CAF50' : '#FF5252');
        updateTransistor();
    });

    inputZ.addEventListener('click', () => {
        stateZ = !stateZ;
        inputZ.setAttribute('fill', stateZ ? '#4CAF50' : '#FF5252');
        updateTransistor();
    });

    inputY.addEventListener('click', () => {
        stateY = !stateY;
        inputY.setAttribute('fill', stateY ? '#4CAF50' : '#FF5252');
        updateTransistor();
    });
    updateTransistor();
});
