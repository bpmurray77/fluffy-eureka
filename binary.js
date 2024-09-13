document.addEventListener("DOMContentLoaded", function() {
    const aBits = document.querySelectorAll('#row-a .bit');
    const bBits = document.querySelectorAll('#row-b .bit');
    const sumBits = document.querySelectorAll('#row-result .bit');
    const decimalSumOutput = document.getElementById('decimal-sum'); // New element to display decimal sum
    
    let aValue = Array(8).fill(0); // Initialize Value A as an array of 8 bits (all 0s)
    let bValue = Array(8).fill(0); // Initialize Value B as an array of 8 bits (all 0s)

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
