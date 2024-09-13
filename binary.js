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
