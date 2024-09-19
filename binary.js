document.addEventListener("DOMContentLoaded", function() {
    const aBits = document.querySelectorAll('#row-a .bit');
    const bBits = document.querySelectorAll('#row-b .bit');
    const sumBits = document.querySelectorAll('#row-result .bit');
    const decimalSumOutput = document.getElementById('decimal-sum');
    const colorDisplay = document.getElementById('color-display');
    
    let aValue = Array(8).fill(0);
    let bValue = Array(8).fill(0);

    const colorPalette = [/* ... your color palette array ... */];

    // Create a container for the ALU animation
    const aluContainer = document.createElement('div');
    aluContainer.id = 'alu-animation';
    document.querySelector('.documentation-container').appendChild(aluContainer);

    function createSVGElement(type) {
        return document.createElementNS("http://www.w3.org/2000/svg", type);
    }

    function createGate(x, y, type) {
        const gate = createSVGElement('g');
        const body = createSVGElement('path');
        let label = createSVGElement('text');
        
        switch(type) {
            case 'AND':
                body.setAttribute('d', `M${x},${y} h20 a10,10 0 0 1 0,20 h-20 z`);
                label.textContent = '&';
                break;
            case 'OR':
                body.setAttribute('d', `M${x},${y} q20,10 0,20 q-20,-10 0,-20 z`);
                label.textContent = '≥1';
                break;
            case 'XOR':
                body.setAttribute('d', `M${x},${y} q20,10 0,20 q-20,-10 0,-20 z`);
                const extraCurve = createSVGElement('path');
                extraCurve.setAttribute('d', `M${x-3},${y} q20,10 0,20`);
                gate.appendChild(extraCurve);
                label.textContent = '=1';
                break;
        }
        
        label.setAttribute('x', x + 10);
        label.setAttribute('y', y + 14);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '10');
        
        gate.appendChild(body);
        gate.appendChild(label);
        return gate;
    }

    function createWire(x1, y1, x2, y2) {
        const wire = createSVGElement('line');
        wire.setAttribute('x1', x1);
        wire.setAttribute('y1', y1);
        wire.setAttribute('x2', x2);
        wire.setAttribute('y2', y2);
        wire.setAttribute('stroke', '#4CAF50');
        wire.setAttribute('stroke-width', '2');
        return wire;
    }

    function createFullAdder(x, y, index) {
        const group = createSVGElement('g');
        
        // XOR gates
        const xor1 = createGate(x, y, 'XOR');
        const xor2 = createGate(x + 50, y + 20, 'XOR');
        
        // AND gates
        const and1 = createGate(x, y + 40, 'AND');
        const and2 = createGate(x + 50, y + 60, 'AND');
        
        // OR gate
        const or = createGate(x + 100, y + 50, 'OR');
        
        // Wires
        const wires = [
            createWire(x - 10, y + 10, x, y + 10), // Input A
            createWire(x - 10, y + 30, x, y + 30), // Input B
            createWire(x + 30, y + 10, x + 50, y + 30), // XOR1 to XOR2
            createWire(x + 30, y + 10, x, y + 50), // XOR1 to AND1
            createWire(x + 30, y + 30, x, y + 70), // Input B to AND1
            createWire(x + 80, y + 40, x + 100, y + 60), // XOR2 to output
            createWire(x + 30, y + 50, x + 50, y + 70), // AND1 to OR
            createWire(x + 80, y + 70, x + 100, y + 70), // AND2 to OR
            createWire(x + 130, y + 60, x + 140, y + 60), // OR to Carry out
            createWire(x - 10, y + 80, x + 50, y + 80), // Carry in
        ];
        
        wires.forEach(wire => group.appendChild(wire));
        group.append(xor1, xor2, and1, and2, or);
        
        // Labels
        const labels = [
            {text: `A${7-index}`, x: x - 15, y: y + 10, color: '#FF5733'},  // Orange
            {text: `B${7-index}`, x: x - 15, y: y + 30, color: '#33FF57'},  // Green
            {text: `S${7-index}`, x: x + 85, y: y + 35, color: '#3357FF'},  // Blue
            {text: 'Cin', x: x - 15, y: y + 80, color: '#FF33F5'},          // Pink
            {text: 'Cout', x: x + 145, y: y + 60, color: '#F5FF33'}         // Yellow
        ];
        
        labels.forEach(label => {
            const text = createSVGElement('text');
            text.textContent = label.text;
            text.setAttribute('x', label.x);
            text.setAttribute('y', label.y);
            text.setAttribute('font-size', '10');
            text.setAttribute('fill', label.color);  // Set the color of the text
            group.appendChild(text);
        });
        
        return group;
    }

    function setupALUAnimation() {
        const svg = createSVGElement('svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '1000');
        svg.setAttribute('viewBox', '0 0 800 1000');
        
        for (let i = 0; i < 8; i++) {
            const fullAdder = createFullAdder(50, i * 120, i);
            svg.appendChild(fullAdder);
        }
        
        aluContainer.appendChild(svg);
    }

    function animateALU(a, b) {
        const svg = aluContainer.querySelector('svg');
        const wires = svg.querySelectorAll('line');
        const gates = svg.querySelectorAll('path');

        // Reset all colors
        wires.forEach(wire => wire.style.stroke = '#4CAF50');
        gates.forEach(gate => gate.style.fill = '#4CAF50');

        // Animate step by step
        let carry = 0;
        for (let i = 7; i >= 0; i--) {
            setTimeout(() => {
                const bitA = (a >> i) & 1;
                const bitB = (b >> i) & 1;
                const sum = bitA ^ bitB ^ carry;
                carry = (bitA & bitB) | (carry & (bitA ^ bitB));

                // Highlight input wires
                wires[i * 10].style.stroke = bitA ? '#ff0000' : '#4CAF50';
                wires[i * 10 + 1].style.stroke = bitB ? '#ff0000' : '#4CAF50';
                wires[i * 10 + 9].style.stroke = carry ? '#ff0000' : '#4CAF50';

                // Highlight gates
                gates[i * 5].style.fill = '#ff0000'; // XOR1
                gates[i * 5 + 1].style.fill = '#ff0000'; // XOR2
                gates[i * 5 + 2].style.fill = '#ff0000'; // AND1
                gates[i * 5 + 3].style.fill = '#ff0000'; // AND2
                gates[i * 5 + 4].style.fill = '#ff0000'; // OR

                // Highlight output wire
                wires[i * 10 + 5].style.stroke = sum ? '#ff0000' : '#4CAF50';
                wires[i * 10 + 8].style.stroke = carry ? '#ff0000' : '#4CAF50';
            }, (7 - i) * 500);
        }

        // Reset colors after animation
        setTimeout(() => {
            wires.forEach(wire => wire.style.stroke = '#4CAF50');
            gates.forEach(gate => gate.style.fill = '#4CAF50');
        }, 4500);
    }

    function updateSum() {
        const aDecimal = parseInt(aValue.join(''), 2);
        const bDecimal = parseInt(bValue.join(''), 2);
        const sumDecimal = aDecimal + bDecimal;
        const sumBinary = sumDecimal.toString(2).padStart(8, '0');
        
        sumBits.forEach((bit, index) => {
            if (sumBinary[index] === '1') {
                bit.classList.add('active');
            } else {
                bit.classList.remove('active');
            }
        });

        decimalSumOutput.textContent = sumDecimal;
        const color = colorPalette[sumDecimal % 256];
        colorDisplay.style.backgroundColor = color;

        animateALU(aDecimal, bDecimal);
    }

    aBits.forEach((bit, index) => {
        bit.addEventListener('click', function() {
            bit.classList.toggle('active');
            aValue[index] = bit.classList.contains('active') ? 1 : 0;
            updateSum();
        });
    });

    bBits.forEach((bit, index) => {
        bit.addEventListener('click', function() {
            bit.classList.toggle('active');
            bValue[index] = bit.classList.contains('active') ? 1 : 0;
            updateSum();
        });
    });

    setupALUAnimation();
});