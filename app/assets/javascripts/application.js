/* global $ */

//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


$(document).ready(function () {
  window.MOJFrontend.initAll()
})

// Import accessible autocomplete
<script type="text/javascript" src="assets/javascripts/accessible-autocomplete.min.js"></script>


// Check all checkboxes
$('#unselect-all').click(function(event) {   
    if(this.checked) {
        // Iterate each checkbox
        $('.count').each(function() {
            this.checked = false;                        
        });
    } 
}); 



accessibleAutocomplete.enhanceSelectElement({
  selectElement: document.querySelector('.enhance-autcomplete')
})