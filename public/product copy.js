(function ($) {
    $(document).ready(function() { // When the document is ready
        $("#display-h2").hide(); // Hide the h2 element
        $("#table-header").hide(); // Hide the table header
        $(".input-row").hide();

        $('input[type="radio"]').click(function() {
            $('.input-row').hide(); // Hide all input rows first
        
            if($('#radio1').is(':checked')) { // Show input rows based on the selected radio button
                $('.input-row').show();
            } else if($('#radio2').is(':checked')) {
                $('#input-row1').show();
            } else if($('#radio3').is(':checked')) {
                $('#input-row2').show();
            } else if($('#radio4').is(':checked')) {
                $('#input-row3').show();
            } else if($('#radio5').is(':checked')) {
                $('#input-row4').show();
            } else if($('#radio6').is(':checked')) {
                $('#input-row5').show();
            } else if($('#radio7').is(':checked')) {
                $('#input-row6').show();
            } else if($('#radio8').is(':checked')) {
                $('#input-row7').show();
            }
        });


        function getProduct(productTitle) { // Get the product from the database
            $.get(`/products?productTitle=${encodeURIComponent(JSON.stringify(productTitle))}`, function(products) { 
                console.log(products);
                $("#Brand").val(products[0].brand);
                $("#Price").val(products[0].price);
                $("#display-product").attr("src", products[0].thumbnail);
            }).fail(function() { // If the colour is not found
                alert('Product not found!'); // Display an error message
                $(location).attr('href','404.html'); // Redirect to the 404 page
            }); // end get
        } // end getProduct

        $("#btn1").click(function() { 
            // const productId = $('#Id').val(); 
            const productTitle = $('#title').val(); 
            // console.log("productTitle" + productTitle);
            getProduct({title:productTitle}); 

        }); // End Button 1

        $("#btn2").click(function() { // When the "insert colour" button is clicked
            const hexString = $('#hexString').val(); // Get the value of the hexString input box
            const rgb = { r: 0, g: 0, b: 0 }; // Set default values for RGB
            const hsl = { h: 0, s: 0, l: 0 }; // Set default values for HSL
            const name = $('#Name').val(); // Get the value of the Name input box
        
            $.get('/colours', function(colours) { // When the data is retrieved, execute this code
                let maxColorId = 0; // Set the maxColorId to 0
                for (let i = 0; i < colours.length; i++) { // Loop through the colours array
                    if (colours[i].colorId > maxColorId) { // If the current colourId is greater than the maxColorId
                        maxColorId = colours[i].colorId; // Set the maxColorId to the current colourId
                    } // end if
                } // end for

                const newColorId = maxColorId + 1; // Set the newColorId
                const newColor = { // Create a new colour object
                    colorId: newColorId,
                    hexString: hexString,
                    rgb: rgb,
                    hsl: hsl,
                    name: name
                }; // end newColor
        
                $.post('/colours', newColor, function(data, status) { // Insert the new color into the database
                    alert(`Colour ${name} inserted successfully.`); // Display a success message
                }).fail(function() { // If the colour cannot be inserted
                    alert('Error inserting colour!'); // Display an error message
                }); // end post
            }); // end get
        }); // End Buttion 2
        
        $("#btn3").click(function() { // When the "modify colour" button is clicked
            const colourId = $('#ColourId').val();
            const hexString = $('#hexString').val();
            const rgb = { r: 0, g: 0, b: 0 };
            const hsl = { h: 0, s: 0, l: 0 };
            const name = $('#Name').val(); 

            $.ajax({ // Modify the colour in the database
                url: `/colours/${colourId}`, 
                type: 'PUT', 
                contentType: 'application/json',
                data: JSON.stringify({ hexString, rgb, hsl, name }),
                success: function(result) { // If the colour is modified successfully
                    alert(`Colour ${name} modified successfully.`); // Display a success message
                }, // end success
                error: function(xhr, status, error) { // If the colour cannot be modified
                    alert('Error modifying colour!'); // Display an error message
                } // end error
            }); // end ajax
        }); // End Button 3
        
        $("#btn4").click(function() { // When the "remove colour" is clicked
            const colourId = $('#ColourId').val();
            if (colourId === currentColor) { // If the colour to be removed is the current colour
                document.cookie = "colourId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Remove the cookie
            } // end if

            $.ajax({ // Remove the colour from the database
                url: `/colours/${colourId}`,
                type: 'DELETE',
                success: function(result) { // If the colour is removed successfully
                    alert(`Colour ${colourId} removed successfully.`); // Display a success message
                }, // end success
                error: function(xhr, status, error) { // If the colour cannot be removed
                    if (xhr.status === 404) { // If the colour is not found
                        alert('Colour not found!'); // Display an error message
                    } else { // If the colour cannot be removed
                        alert('Error removing colour!'); // Display an error message
                    } // end if else
                } // end error
            }); // end ajax
        }); // End Buttion 4
        
        $("#btn5").click(function() { // When the "clear" button is clicked
            $('#ColourId').val(''); // Clear the input boxes
            $('#hexString').val('');
            $('#RGB').val('');
            $('#HSL').val('');
            $('#Name').val('');
            $('#display-product').css('background-color', ''); // Clear the background colour of the display-colour div
        }); // End Button 5
        
        $("#btn6").click(function() { // When the "select background" button is clicked
            const colourId = $('#ColourId').val();
            $.get(`/colours/${colourId}`, function(colour) { // Get the colour from the database
                $('#hexString').val(colour.hexString); // Set the values of the input boxes
                $('#RGB').val("RGB(" + colour.rgb.r + ", " + colour.rgb.g + ", " + colour.rgb.b + ")");
                $('#HSL').val("HSL(" + Math.floor(colour.hsl.h) + ", " + colour.hsl.s + "%, " + colour.hsl.l + "%)");
                $('#Name').val(colour.name);
                $('#display-product').css('background-color', colour.hexString); // Change the background colour of the display-colour div
                $('body').css('background-color', colour.hexString); // Change the background color of the entire page
                
                document.cookie = "colourBackground=" + colour.hexString + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Set the cookie

            }).fail(function() { // If the colour is not found
                alert('Colour not found!'); // Display an error message
                $(location).attr('href','404.html'); // Redirect to the 404 page
            }); // end get
        }); // End Button 6

        $("#btn7").click(function() { // When the "show table" button is clicked
            $("#display-h2").show(); // Show the table header
            $("#table-header").show(); // Show the table header
            
            $.get("/colours", function(colours) { // Get the colours from the database
                $.each(colours, function(index, colour) { // Loop through the colours array
                    const rgbString = "RGB(" + colour.rgb.r + ", " + colour.rgb.g + ", " + colour.rgb.b + ")"; // Create the RGB string
                    const hslString = "HSL(" + Math.floor(colour.hsl.h) + ", " + colour.hsl.s + "%, " + colour.hsl.l + "%)"; // Create the HSL string
                    const row = `<tr>
                                    <td><div class="display-product" style="background-color:${colour.hexString}"></div></td>
                                    <td>${colour.colorId}</td>
                                    <td>${colour.name}</td>
                                    <td>${colour.hexString}</td>
                                    <td>${rgbString}</td>
                                    <td>${hslString}</td>
                                </tr>`; // Create the table row
                    $("#table-content tbody").append(row); // Add the row to the table
                }); // end each

            }).fail(function() { // If the colours cannot be retrieved
                alert('Colours data not found!'); // Display an error message
                $(location).attr('href','404.html'); // Redirect to the 404 page
            }); // end get
        }); // End Button 7

        $("#btn8").click(function() { // When the "reset table" button is clicked
            $.ajax({ // Reset the table
                url: `/reset_colours`,
                type: 'PUT',
                contentType: 'application/json',
                success: function(result) { // If the table is reset successfully
                    alert(`Table has been reset successfully.`); // Display a success message
                    location.reload(); // Reload the page
                    $("#btn7").trigger("click"); // Trigger button 7 click event
                }, // end success
                error: function(xhr, status, error) { // If the table cannot be reset
                    alert('Error resetting the table!'); // Display an error message
                } // end error
            }); // end ajax
        }); // End Button 8

        $("#btnPrev").click(function() { // When the "left arrow" button is clicked
            let currentColourId = parseInt($('#ColourId').val()); // Get the value of the ColourId input box
            if (!isNaN(currentColourId) && currentColourId > 1) { // If the value is a number and greater than 1
                currentColourId--; // Decrement the value
                $('#ColourId').val(currentColourId); // Set the value of the ColourId input box
                $("#btn1").trigger("click"); // Trigger button 1 click event
            } // end if
        }); // end click
    
        $("#productIdNav").on("keyup", function(event) { // When the user presses a key in the input box between arrows
            if (event.keyCode === 13) { // If Enter key is pressed
                event.preventDefault(); // Prevent the form from submitting d
                const colourId = $(this).val(); // Get the value of the input box
                $("#ColourId").val(colourId); // Set the value of the ColourId input box
                $("#btn1").click(); // Trigger button 1 click event
            } // end if
        }); // end keyup

        $("#btnNext").click(function() { // When the "right arrow" button is clicked
            let currentColourId = parseInt($('#ColourId').val());
            if (!isNaN(currentColourId)) { // If the value is a number
                currentColourId++; // Increment the value
                $('#ColourId').val(currentColourId); // Set the value of the ColourId input box
                $("#btn1").trigger("click"); // Trigger button 1 click event
            } // end if
        }); // end click

        function getCookie(name) { // Get the cookie
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) { // If the cookie is found
                return parts.pop().split(";").shift(); // Return the cookie
            } // end if
        } // end getCookie
    }); // End document ready
})(jQuery); // End jQuery