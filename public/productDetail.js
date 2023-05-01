(function ($) {
    $(document).ready(function() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        console.log("productId is " + productId)

        $.get(`/products/${productId}`, function(product) {
            console.log(product);

            $("#id").text(product.id);
            $("#title").text(product.title);
            $("#brand").text(product.brand);
            $("#price").text("$" + product.price);
            $("#category").text(product.category);
            $("#product-description").text(product.description);
            $("#discount").text(product.discountPercentage);
            $("#stock").text(product.stock);
            $("#rating").text(product.rating);
            $("#product-image").attr("src", product.thumbnail);
            
        }).fail(function(xhr, status, error) {
            console.log(`Failed to get product information: ${error}`);
            // $("#product-detail").html("<p>Error: Product not found.</p>");
        });

        
        $('#btn1').on('click', function() {
            window.location.href = 'http://localhost:8080/index.html';
        });

        $('#btn2').on('click', function() {
        });

        $('#btn3').on('click', function() {
        });

        $('#btn4').on('click', function() {
        });

        $('#btn5').on('click', function() {
        });

        $('#btn6').on('click', function() {
            window.location.href = 'http://localhost:8080/about.html';
        });

    });
})(jQuery);
