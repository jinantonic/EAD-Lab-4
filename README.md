# EAD-Lab-4 - Mongoose and MongoDB
This assignment is about using **Mongoose** and **MongoDB** to create an online catalogue
of products.<br><br>
The catalogue of products can be downloaded from the following URL: https://dummyjson.com/products.<br><br>



</br></br>

## README File
My GitHub repo is https://github.com/jinantonic/EAD-Lab-4.</br>
You can find the detailed README file at https://github.com/jinantonic/EAD-Lab-4/blob/main/README.md.</br>
This file contains clearer instructions on how to navigate my website and the parts that I have accomplished.

</br></br>

## My solution
![Sketch](images/port.png)
In the **server.js** file, the port number is set as **8080**.

</br>

![Sketch](images/node.png)
Run **node public/server.js** on the terminal and check if a node server is running.

</br>

![Sketch](images/localhost.png)</br>
Once it is running successfully, go to http://localhost:8080/index.html on the browser to see the website.

</br>

![Sketch](images/home.png)
This is the first look at the website. The main page consists of **4 buttons** on the left side, and **8 radio buttons** on the right side. 

</br>

![Sketch](images/radio1.png)
When the radio button is clicked, it will display the corresponding search box so that the user can search for the products using any search filter.

</br>

![Sketch](images/radio2.png)
Clicking the **All** radio button enables users to search for products that meet specific criteria. 

</br>

### Homepage
#### Show Table Button
![Sketch](images/1st.png)
![Sketch](images/1st-table.png)
Clicking the **Show Table** button will retrieve and display all the products along with their information on the table.

</br>

![Sketch](images/1st-table-row.png)
By clicking any **table row**, it will redirect you to the page where you can see all the details of the product of the corresponding row. The arrow buttons below the image will help you navigate the product images. It is handy since it displays the current picture index / total number of pictures in the box between those arrow buttons. 

</br>

#### Search Product Button
![Sketch](images/2nd.png)
Moving onto the second button, select one of the radio buttons and enter the corresponding input text. 

</br>

![Sketch](images/2nd-table.png)
Then click the **Search Product** button and it will return the result which has the brand as "Apple".

</br>

![Sketch](images/2nd-table2.png)
It also allows the users to search for products using multiple search options by clicking **All** button. 

</br>

![Sketch](images/2nd-table3.png)
As you can see, it is returning the correct result of products whose Brand contains "App", Category contains "Sm" and the Price is less than 900. 

</br>

![Sketch](images/2nd-table4.png)
If there is no matching product, it displays an error message along with the empty table result below.

</br>

#### Insert Product Button
![Sketch](images/3rd.png)
Then we move on to the **Insert Product** button, which will direct you to **indexDetail.html** page.

</br>

### Insert product page
![Sketch](images/id-home.png)
This is the **indexDetail.html** page, which allows users to enter new products into the table.

</br>

![Sketch](images/id-input.png)
Enter the details and click **Insert** button.

</br>

![Sketch](images/id-msg1.png)![Sketch](images/id-msg2.png)</br>
It will display a **success** message when there is no error, and an **error** message if there is an error. After clicking **ok**, it will redirect you to the main home page. 

</br>

![Sketch](images/id-result.png)
Click the **show table** button on the homepage and you can see the new product is added to the end of the table.

</br>

#### Home & About this Page Button
![Sketch](images/about.png)
On the insert product page, the rest buttons are **Home** and **About this Page**. They are pretty straightforward, the **Home** button will bring you to the main page and **About this Page** will bring you to the page that explains briefly about the page.

</br>

### Product detail page
![Sketch](images/pd.png)
Going back to the main page, clicking the table row will bring you to the product page corresponding to the table row's product detail. You can click any shell on the table row.

</br>

![Sketch](images/pd-detail.png)</br>
This page includes every detail of the product.

</br>

![Sketch](images/pd-nav.png)</br>
The arrow buttons below help navigate the product images and the text box between those arrows displays the current image index along with the total number of images.

</br>

#### Update Button
![Sketch](images/pd-update.png)
Modify any detail of the product and click **Update** button on the left. 

</br>

![Sketch](images/pd-msg1.png)![Sketch](images/pd-msg2.png)</br>
It will display a **success** message when there is no error, and an **error** message if there is an error. After clicking **ok**, it will redirect you to the main home page. 

</br>

![Sketch](images/pd-result.png)
Then click the **show table** button on the homepage and the product is modified using the new details.

</br>

#### Delete Button
![Sketch](images/pd-delete.png)
If you want to remove the product from the list, you can open the product detail by clicking the product's table row. And then click **Delete** button on the left side.

</br>

![Sketch](images/pd-msg3.png)</br>
It will display a success message when there is no error and it will redirect you to the main home page once it's done.

</br>

![Sketch](images/pd-result2.png)
Check the result by clicking the **show table** button on the homepage, the product is successfully removed from the list.

</br>

#### Insert button
![Sketch](images/pd-insert.png)
**Insert** button also works on this page if the user wants to use the original data of the product or modify it and upload it as a new product.

</br>

#### Home & About this Page Button
![Sketch](images/pd-btns.png)
The rest buttons are **Home** and **About this Page**. They do the exact same thing as the ones on the insert product page, the **Home** button brings you to the main page and **About this Page** brings you to the About page.

</br>

### 404 page
![Sketch](images/404.png)
This is a custom HTML page for a **404 error**. If the user types a wrong address, this page will get displayed indicating that the error has been made, and the user can go back to the main page by clicking the **homepage**.

</br></br>

This is the end of my assignment. Thank you for your time.