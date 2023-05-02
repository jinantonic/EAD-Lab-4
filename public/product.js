(function ($) {
    $(document).ready(function() { // When the document is ready
        $("#display-h2").hide(); // Hide the h2 element
        $("#table-header").hide(); // Hide the table header
        $(".input-row").hide();

        let allCheck = false;
        $('input[type="radio"]').click(function() {
            $('.input-row').hide(); // Hide all input rows first
            
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
            }
        });

        function getProduct(searchParams) {
            $.get(`/products?searchParams=${encodeURIComponent(JSON.stringify(searchParams))}&allCheck=${encodeURIComponent(allCheck)}`, function(products) {
                $("#table-content tbody").empty(); // clear the table content
          
                $.each(products, function(index, product) {
                    const row = `<tr data-productid="${product.id}">
                                    <td>${product.id}</td>
                                    <td>${product.title}</td>
                                    <td>${product.price}</td>
                                    <td>${product.discountPercentage}</td>
                                    <td>${product.rating}</td>
                                    <td>${product.stock}</td>
                                    <td>${product.brand}</td>
                                    <td>${product.category}</td>
                                    <td><img src="${product.thumbnail}" alt="${product.title}" /></td>
                                </tr>`;
                    $("#table-content tbody").append(row); // add the row to the table

                });

                // When a table row is clicked, redirect to productDetail.html with the corresponding product ID
                $("#table-content tbody").on("click", "tr", function() {
                    const productId = $(this).attr("data-productid");
                    // console.log("productId1: " + productId)
                    window.location.href = `productDetail.html?id=${productId}`;
                });


            }).fail(function() {
              alert("Product not found!");
              // $(location).attr("href", "404.html");
            });
        }

        $("#btn1").click(function() {
            $("#display-h2").show(); // Show the table header
            $("#table-header").show(); // Show the table header

            const searchParams = {
                title: $("#title").val(),
                category: $("#category").val(),
                price: $("#price").val(),
                discountPercentage: $("#discount").val(),
                rating: $("#rating").val(),
                stock: $("#stock").val(),
                brand: $("#brand").val(),
            }; 
            getProduct(searchParams);
        });
          


        $('#btn6').on('click', function() {
            window.location.href = 'http://localhost:8080/productDetail.html';
        });

        $('#btn5').on('click', function() {
            window.location.href = 'http://localhost:8080/about.html';
        });  
    }); // End document ready
})(jQuery); // End jQuery