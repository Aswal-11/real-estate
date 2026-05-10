// Mapper script to bind data from data.js into the HTML DOM

document.addEventListener('DOMContentLoaded', () => {
    // 1. Determine which property page we are on based on the URL
    const path = window.location.pathname;
    let propertyId = null;

    if (path.includes('godrej')) {
        propertyId = 'godrej';
    } else if (path.includes('oberoi')) {
        propertyId = 'oberoi';
    }

    // 2. If we are on a property page and the data exists, map it
    if (propertyId && window.propertyData && window.propertyData[propertyId]) {
        const data = window.propertyData[propertyId];
        console.log(`Successfully loaded data for: ${data.title}`);

        /**
         * ---------------------------------------------------------
         * DATA MAPPING LOGIC
         * ---------------------------------------------------------
         * This is where the data from data.js gets mapped to the UI.
         * 
         * To fully implement this, we will add matching IDs to the HTML:
         * Example: <h1 id="dynamic-title"></h1>
         */

        // Map Hero Title
        const propTitle = document.getElementById('prop-title');
        if (propTitle) {
            propTitle.textContent = data.title;
        }

        // Map Hero Subtitle
        const propSubtitle = document.getElementById('prop-subtitle');
        if (propSubtitle) {
            propSubtitle.textContent = data.subtitle;
        }

        // Map Hero Description
        const propDesc = document.getElementById('prop-desc');
        if (propDesc) {
            propDesc.textContent = data.description;
        }

        // Map Starting Price
        const propPrice = document.getElementById('prop-price');
        if (propPrice) {
            propPrice.textContent = data.details.startingPrice;
        }

        // Map Configuration
        const propConfig = document.getElementById('prop-config');
        if (propConfig) {
            propConfig.textContent = data.details.configurations;
        }

        // Map Size
        const propSize = document.getElementById('prop-size');
        if (propSize) {
            propSize.textContent = data.details.size;
        }
    }
});
