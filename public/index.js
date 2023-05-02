(function ($) {
    $(document).ready(function() { // When the document is ready,
        $(".input-row").hide(); // Hide the elements
        $("#loader").hide();
        $("#loader-text").hide();
        $("#display-h4").hide(); 
        $("#display-h2").hide(); 
        $("#table-header").hide();
        
        let allCheck = false; // Check if the user is searching for all products

        $('input[type="radio"]').click(function() { // When a radio button is clicked,
            $('.input-row').hide();
            
            if($('#radio1').is(':checked')) { // Show input rows based on the selected radio button
                $('.input-row').show();
                allCheck = true;
            } else if($('#radio2').is(':checked')) {
                $('#input-row1').show();
                allCheck = false;
            } else if($('#radio3').is(':checked')) {
                $('#input-row2').show();
                allCheck = false;
            } else if($('#radio4').is(':checked')) {
                $('#input-row3').show();
                allCheck = false;
            } else if($('#radio5').is(':checked')) {
                $('#input-row4').show();
                allCheck = false;
            } else if($('#radio6').is(':checked')) {
                $('#input-row5').show();
                allCheck = false;
            } else if($('#radio7').is(':checked')) {
                $('#input-row6').show();
                allCheck = false;
            } else if($('#radio8').is(':checked')) {
                $('#input-row7').show();
                allCheck = false;
            } // end if else if
        }); // end radio click

        function getProduct(searchParams) { // Get the product details from the form
            $.get(`/products?searchParams=${encodeURIComponent(JSON.stringify(searchParams))}&allCheck=${encodeURIComponent(allCheck)}`, function(products) {
                $("#table-content").hide(); // Hide the table until it is fully populated
                $("#table-content tbody").empty(); // Clear the table content
          
                $.each(products, function(index, product) { // For each product,
                    const row = `<tr data-productid="${product.id}">
                                    <td>${product.title}</td>
                                    <td>${product.price}</td>
                                    <td>${product.discountPercentage}</td>
                                    <td>${product.rating}</td>
                                    <td>${product.stock}</td>
                                    <td>${product.brand}</td>
                                    <td>${product.category}</td>
                                    <td><img src="${product.thumbnail}" alt="${product.title}" /></td>
                                </tr>`; // create a table row
                    $("#table-content tbody").append(row); // Add the row to the table
                }); // end each

                $("#table-content tbody").on("click", "tr", function() { // When a table row is clicked,
                    const productId = $(this).attr("data-productid"); // get the product ID
                    window.location.href = `indexDetail.html?id=${productId}`; // Redirect to indexDetail.html with the product ID
                }); // end tr click

                if (products.length === 0) { // If no products were found,
                    alert("No product found! Please enter valid product information."); // Alert the user
                }
                
            }).fail(function() { // If the get request fails,
                alert("Product not found!"); // Alert the user
                $(location).attr("href", "404.html"); // Redirect to 404.html
            }); // end get
        } // end getProduct()

        function getAllProduct() { // Get all products
            $.get(`/products`, function(products) {
                $("#table-content").hide();
                $("#table-content tbody").empty();
          
                $.each(products, function(index, product) {
                    const row = `<tr data-productid="${product.id}">
                                    <td>${product.title}</td>
                                    <td>${product.price}</td>
                                    <td>${product.discountPercentage}</td>
                                    <td>${product.rating}</td>
                                    <td>${product.stock}</td>
                                    <td>${product.brand}</td>
                                    <td>${product.category}</td>
                                    <td><img src="${product.thumbnail}" alt="${product.title}" /></td>
                                </tr>`;
                    $("#table-content tbody").append(row);
                }); // end each

                $("#table-content tbody").on("click", "tr", function() {
                    const productId = $(this).attr("data-productid");
                    window.location.href = `indexDetail.html?id=${productId}`;
                }); // end tr click

            }).fail(function() { 
                alert("Product not found!");
                $(location).attr("href", "404.html");
            }); // end get
        } // end getAllProduct()

        $("#button1").click(function() { // When the "Show Table" button is clicked,
            $("#loader").show(); // Show the loader
            $("#loader-text").show();

            setTimeout(function() {
                $("#display-h4").show(); 
            }, 500); // end setTimeout
            
            setTimeout(function() { // Fade in the h2 & table 
                $("#display-h2").fadeIn();
                $("#table-header").fadeIn();
                $("#table-content").fadeIn();
            }, 1000); // end setTimeout

            setTimeout(function() { // Hide the loader & h4
                $("#loader").hide();
                $("#loader-text").hide();
                $("#display-h4").hide();
            }, 1000); // end setTimeout

            getAllProduct(); // Get all products
        }); // end button 1

        $("#button2").click(function() { // When the "Search Product" button is clicked,
            $("#loader").show();
            $("#loader-text").show();

            setTimeout(function() {
                $("#display-h4").show();
            }, 500); // end setTimeout
            
            setTimeout(function() {  
                $("#display-h2").fadeIn();
                $("#table-header").fadeIn();
                $("#table-content").fadeIn();
            }, 1000); // end setTimeout

            setTimeout(function() {
                $("#loader").hide();
                $("#loader-text").hide();
                $("#display-h4").hide();
            }, 1000); // end setTimeout
            
            const searchParams = { // Get the search parameters from the form
                title: $("#title").val(),
                category: $("#category").val(),
                price: $("#price").val(),
                discountPercentage: $("#discount").val(),
                rating: $("#rating").val(),
                stock: $("#stock").val(),
                brand: $("#brand").val(),
            }; // end searchParams
            
            getProduct(searchParams); // Get the product details from the form
        }); // end button 2
        
        $('#button3').on('click', function() { // When the "Insert Product" button is clicked,
            window.location.href = 'http://localhost:8080/indexDetail.html'; // redirect to indexDetail.html
        }); // end button 3

        $('#button4').on('click', function() { // When the "About this Page" button is clicked,
            window.location.href = 'http://localhost:8080/about.html'; // redirect to about.html
        }); // end button 4
    }); // End document ready
})(jQuery); // End jQuery