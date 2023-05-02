(function ($) {
    $(document).ready(function() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        let editCheck = false;
        let imageIndex = 0;
        let globalProduct;

        $("#btn2").hide();
        $("#btn3").hide();
        if(productId) {
            console.log("productId is " + productId)
            editCheck = true;
            $.get(`/products?productId=${productId}`, function(product) {
                console.log(product);

                globalProduct = product[0];
                $("#id").val(product[0].id);
                $("#title").val(product[0].title);
                $("#brand").val(product[0].brand);
                $("#price").val(product[0].price);
                $("#category").val(product[0].category);
                $("#product-description").text(product[0].description);
                $("#discount").val(product[0].discountPercentage);
                $("#stock").val(product[0].stock);
                $("#rating").val(product[0].rating);
                // $("#display-product").attr("src", product[0].thumbnail);
                $("#display-product").attr("src", product[0].images[imageIndex]);
                $("#btn2").show();
                $("#btn3").show();
                $("#btn4").show();

            }).fail(function(xhr, status, error) {
                console.log(`Failed to get product information: ${error}`);
                // $("#product-detail").html("<p>Error: Product not found.</p>");
            });
        }

        function getProductDetails() {
            const titleValue = $("#title").val();
            const descriptionValue = $("#description").val();
            const priceValue = Number($("#price").val());
            const discountPercentageValue = Number($("#discount").val());
            const ratingValue = Number($("#rating").val());
            const stockValue = Number($("#stock").val());
            const brandValue = $("#brand").val();
            const categoryValue = $("#category").val();
            const thumbnailUrlValue = editCheck?undefined:$("#thumbnail").val();
            
            const imageUrlValues = $("#imageText").val();
    
            let imageUrls;
            if (imageUrlValues && imageUrlValues !== "") {
                imageUrls = imageUrlValues.split(",");
            } else {
                imageUrls = [];
            }
    
            // Create the product object
            return {
                title: titleValue,
                description: descriptionValue,
                price: priceValue,
                discountPercentage: discountPercentageValue,
                rating: ratingValue,
                stock: stockValue,
                brand: brandValue,
                category: categoryValue,
                thumbnail: thumbnailUrlValue,
                images: imageUrls
                
            };
        }

        
        $('#btn1').on('click', function() {
            window.location.href = 'http://localhost:8080/index.html';
        });

        $('#btn2').on('click', function() {
            updatedProduct = getProductDetails();
            console.log(updatedProduct);
            $.ajax({
                url: `/products?id=${encodeURIComponent(JSON.stringify(productId))}`,
                method: 'PUT',
                data: updatedProduct,
                success: function(result) {

                    console.log(result);
                    alert("dadad");
                    setTimeout(function() {
                        $("#colour-status").hide();
                    }, 4000);
                },
                error: function(err) {
                    console.error(err);
                }
            });



        });

        $('#btn3').on('click', function() {
            $.ajax({
                url: `/products/${productId}`,
                type: 'DELETE',
                success: function(result) {
                    console.log(result); // do something with the response from the server
                    alert("Colour " + productId +" successfully deleted!");
                    $("#colour-status").show().find("p").text("Colour " + productId +" successfully deleted!");
                    setTimeout(function() {
                        $("#colour-status").hide();
                    }, 4000);
                    window.location.href = `./`;
                },
                error: function(xhr, textStatus) {
                    console.log(xhr.responseText + "," + textStatus); // handle errors or display error messages to the user
                }
            });
        });

        $('#btn4').on('click', function() {
            newProduct = getProductDetails();
            console.log(newProduct);
            $.ajax({
                url: `/products`,
                method: 'POST',
                data: newProduct,
                success: function(result) {

                    console.log(result);
                    alert("dadad");
                    setTimeout(function() {
                        $("#colour-status").hide();
                    }, 4000);
                },
                error: function(err) {
                    console.error(err);
                }
            });
        });

        

        $('#btn6').on('click', function() {
            window.location.href = 'http://localhost:8080/about.html';
        });


        $('#btnPrev').on('click', function() {
            imageIndex--;
            if(imageIndex < 0) {
                imageIndex = globalProduct.images.length - 1;
            }
            $("#display-product").attr("src", globalProduct.images[imageIndex]);
        });

        $('#btnNext').on('click', function() {
            imageIndex++;
            if(imageIndex > globalProduct.images.length - 1) {
                imageIndex = 0;
            }
            $("#display-product").attr("src", globalProduct.images[imageIndex]);
        });

    });
})(jQuery);
