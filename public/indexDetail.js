(function ($) {
    $(document).ready(function() {
        const urlParams = new URLSearchParams(window.location.search); // Get the URL parameters
        const productId = urlParams.get('id'); // Get the product ID from the URL parameters
        let editCheck = false; // Check if the user is editing a product
        let imageIndex = 0; // The index of the image being displayed
        let globalProduct; // The product object

        $("#btn2").hide(); // Hide the elements
        $("#btn3").hide(); 
        $("#imageLabel").hide();
        $("#display-product").hide();
        $(".nav-box").hide();

        if(productId) { // If the product ID is present in the URL parameters,
            editCheck = true; 

            $.get(`/products?productId=${productId}`, function(product) { // get the product details
                globalProduct = product[0];
                $("#id").val(globalProduct.id);
                $("#title").val(globalProduct.title);
                $("#brand").val(globalProduct.brand);
                $("#price").val(globalProduct.price);
                $("#category").val(globalProduct.category);
                $("#description").val(globalProduct.description);
                $("#discount").val(globalProduct.discountPercentage);
                $("#stock").val(globalProduct.stock);
                $("#rating").val(globalProduct.rating);
                $("#display-product").attr("src", globalProduct.images[imageIndex]);
                $("#productIdNav").val(`${imageIndex+1}/${globalProduct.images.length}`);

                $("#btn2").show(); // Show the elements
                $("#btn3").show();
                $("#btn4").show();
                $("#imageLabel").show();
                $("#display-product").show();
                $(".nav-box").show();

            }).fail(function(xhr, status, error) { // If the product is not found,
                $(location).attr('href','404.html'); // Redirect to the 404 page
            }); // end get
        } // end if
    
        function getProductDetails() { // Get the product details from the form
            const titleValue = $("#title").val();
            const brandValue = $("#brand").val();
            const priceValue = Number($("#price").val());
            const categoryValue = $("#category").val();
            const descriptionValue = $("#description").val();
            const discountPercentageValue = Number($("#discount").val());
            const stockValue = Number($("#stock").val());
            const ratingValue = Number($("#rating").val());
            const thumbnailUrlValue = editCheck?undefined:$("#thumbnail").val();
            const imageUrlValues = $("#imageText").val();
    
            let imageUrls; // Convert the image URLs to an array
            
            if (imageUrlValues && imageUrlValues !== "") { // If there are image URLs,
                imageUrls = imageUrlValues.split(","); // split the URLs by comma
            } else { // else, set the imageUrls to an empty array
                imageUrls = []; // else, set the imageUrls to an empty array
            } // end if else
    
            return { // Return the product object
                title: titleValue,
                brand: brandValue,
                price: priceValue,
                category: categoryValue,
                description: descriptionValue,
                discountPercentage: discountPercentageValue,
                stock: stockValue,
                rating: ratingValue,
                thumbnail: thumbnailUrlValue,
                images: imageUrls
            }; // end return
        } // end getProductDetails()

        $('#btn1').on('click', function() { // When "Home" button is clicked,
            window.location.href = 'http://localhost:8080/index.html'; // redirect to the home page
        }); // end button 1

        $('#btn2').on('click', function() { // When "Update" button is clicked,
            updatedProduct = getProductDetails(); // get the product details

            $.ajax({ // Update the product details
                url: `/products?id=${encodeURIComponent(JSON.stringify(productId))}`,
                method: 'PUT',
                data: updatedProduct,
                success: function(result) {
                    alert("Product " + productId + " modified successfully.");
                }, // end success
                error: function(err) {
                    console.error(err); // handle errors or display error messages to the user
                } // end error
            }); // end ajax
        }); // end button 2

        $('#btn3').on('click', function() { // When "Delete" button is clicked,
            $.ajax({ // Delete the product
                url: `/products/${productId}`,
                type: 'DELETE',
                success: function(result) {
                    alert("Product " + productId + " deleted successfully.");
                    window.location.href = `./`; // redirect to the home page
                }, // end success
                error: function(xhr, textStatus) {
                    console.log(xhr.responseText + "," + textStatus); // handle errors or display error messages to the user
                } // end error
            }); // end ajax
        }); // end button 3

        $('#btn4').on('click', function() { // When "Insert" button is clicked,
            newProduct = getProductDetails(); // get the product details

            $.ajax({ // Insert the product
                url: `/products`,
                method: 'POST',
                data: newProduct,
                success: function(result) {
                    alert("New product inserted successfully."); 
                }, // end success
                error: function(err) {
                    console.error(err);
                } // end error
            }); // end ajax
        }); // end button 4

        $('#btn5').on('click', function() { // When "Search" button is clicked,
            window.location.href = 'http://localhost:8080/about.html'; // redirect to the about page
        }); // end button 5

        $('#btnPrev').on('click', function() { // When "Previous" button is clicked,
            imageIndex--; // decrement the image index
            if(imageIndex < 0) { // If the image index is less than 0,
                imageIndex = globalProduct.images.length - 1; // set the image index to the last image
            } // end if

            $("#display-product").attr("src", globalProduct.images[imageIndex]); // Display the image 
            $("#productIdNav").val((imageIndex + 1) + "/" + globalProduct.images.length); // Display the image index
        }); // end button Prev

        $('#btnNext').on('click', function() { // When "Next" button is clicked,
            imageIndex++; // increment the image index
            if(imageIndex > globalProduct.images.length - 1) { // If the image index is greater than the number of images,
                imageIndex = 0; // set the image index to 0
            } // end if

            $("#display-product").attr("src", globalProduct.images[imageIndex]); // Display the image
            $("#productIdNav").val((imageIndex + 1) + "/" + globalProduct.images.length); // Display the image index
        }); // end button Next
    }); // end document ready
})(jQuery); // end jQuery
