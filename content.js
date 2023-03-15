// Check if the current website is Amazon.com
if (window.location.hostname === 'www.amazon.com') {
  
  // Function to round prices on the page
  function roundPrices() {
    // Regular expression to find prices in the format $x.xx
    const regex = /(\$[\d,]+\.\d{2})/;
    // Get all the spans on the page
    const spans = document.getElementsByTagName('span');
    // Loop through each span
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
     
      // Check if the span belongs to a price, size or symbol
      if (span.classList.contains('a-price') || span.classList.contains('a-price-symbol') || span.classList.contains('a-size-medium') || span.classList.contains('a-size-base')) {
        const spanText = span.textContent.trim();
        // Match the span text with the regular expression to find the price
        const match = spanText.match(regex);
        if (match) {
          const spanNumber = parseFloat(match[0].replace('$', '').replace(',', ''));
          // Check if the span text is a valid number and needs rounding
          if (!isNaN(spanNumber) && spanNumber % 1 >= 0.5) {
            // Round the price to the nearest whole number
            const roundedPrice = Math.round(spanNumber);

            // Replace the span text with the rounded price
            span.textContent = match[0].replace(match[1], '$' + roundedPrice.toLocaleString());

            // Add a mouseover event to show the original price
            span.addEventListener('mouseover', function() {
              // Save the original price in a data attribute
              span.dataset.originalPrice = match[1];
              // Show the original price
              span.textContent = match[0];
            });

            // Add a mouseout event to show the rounded price again
            span.addEventListener('mouseout', function() {
              // Show the rounded price
              span.textContent = match[0].replace(match[1], '$' + roundedPrice.toLocaleString());
            });

          } else if (!isNaN(spanNumber) && spanNumber % 10 === 9) {
            // Round the price up to the nearest whole number
            const roundedPrice = Math.ceil(spanNumber);

            // Replace the span text with the rounded price
            span.textContent = match[0].replace(match[1], '$' + roundedPrice.toLocaleString());

            // Add a mouseover event to show the original price
            span.addEventListener('mouseover', function() {
              // Save the original price in a data attribute
              span.dataset.originalPrice = match[1];
              // Show the original price
              span.textContent = match[0];
            });

            // Add a mouseout event to show the rounded price again
            span.addEventListener('mouseout', function() {
              // Show the rounded price
              span.textContent = match[0].replace(match[1], '$' + roundedPrice.toLocaleString());
            });
          }
        }
      }
    }
  }
  roundPrices();
  // Call the roundPrices function every 1.525 seconds (1525 milliseconds)
  window.setInterval(roundPrices, 1525);

  // Call the roundPrices function when the user clicks, scrolls, or types on the page
  window.addEventListener('click', roundPrices); 
  window.addEventListener('scroll', roundPrices); 
  document.addEventListener('click', roundPrices);
  document.addEventListener('scroll', roundPrices);
  document.addEventListener('keyup', roundPrices);
}




 


