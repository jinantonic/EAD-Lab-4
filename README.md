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
In the **index.js** file, the port number is set as 8080.

</br>

![Sketch](images/node.png)
Run **node public/index.js** on the terminal and check if a node server is running.

</br>

![Sketch](images/localhost.png)
Once it is running successfully, go to http://localhost:8080/index.html on the browser to see the website.

</br>

![Sketch](images/home.png)
This is the first look of the website. The main page consists of **8 buttons** on the left side, and the **colour input boxes** along with the **colour display box** on the right side. Below them, there are **left** and **right arrow buttons** for navigating and the **input box** to enter the colour id manually.

</br>

### 1st Button
![Sketch](images/1st.png)
Enter the colour id and click the **Show Colour** button. It retrieves and displays the details of the colour with the specified colour id.

</br>

### 2nd Button
![Sketch](images/2nd.png)
Moving onto the second button, enter the new colour details such as hexString, RGB, HSL and Name, and click the **Insert Colour** button. If I insert the new colour, the new row will be appended to the end of the table. 

</br>

![Sketch](images/2nd-msg.png)</br>
After you get the success message, you can **refresh** the homepage and click **Show Table**. 

</br>

![Sketch](images/2nd-table.png)
You can see the new colour **SteelBlueBlues** was added to the table along with the success message.

</br>

### 3rd Button
![Sketch](images/3rd.png)
Then we move on to the **Modify Colour** button. Enter the new colour details such as hexString, RGB, HSL and Name, and click the **Modify Colour** button.

</br>

![Sketch](images/3rd-msg.png)</br>
After you get the success message, you can **refresh** the homepage and click **Show Table**. 

</br>

![Sketch](images/3rd-green-1.png)
![Sketch](images/3rd-green-2.png)
You can see the colour **Green** was modified as **GreenGreen** with the new details.

</br>

### 4th Button
![Sketch](images/4th.png)
Moving onto the **Remove Colour** button. Enter the colour id and select the **Show Colour** button to display the colour that you would like to remove. Check the displayed colour and click the **Remove Colour** button to remove it.  

</br>

![Sketch](images/4th-msg.png)</br>
After you get the success message, you can **refresh** the homepage and click **Show Table**.

</br>

![Sketch](images/4th-olive-1.png)
![Sketch](images/4th-olive-2.png)
You can see the colour **Olive** was removed. If I remove a colour, the corresponding table row will be removed from the table.

</br>

### 5th Button
![Sketch](images/5th.png)
Then we move on to the **Clear** button. It clears all the input fields and the display box of the colour, which allows the users to enter the new inputs without manually deleting the previous inputs.

</br>

![Sketch](images/5th-clear.png)
As you can see, all the input fields and the display box is empty.

</br>

### 6th Button
![Sketch](images/6th.png)
Moving onto the **Select Background** button. Enter the colour id and select the **Show Colour** button to display the colour. Check the displayed colour and click the **Select Background** button to choose it as a background.  

</br>

![Sketch](images/6th-bg.png)
As you can see, it retrieves the colour details with the specified colour id and sets the
background colour of the entire page to that colour.

</br>

### Cookie
![Sketch](images/6th-bg.png)
One of the important features here is the **cookie**, when a user selects a colour or sets a colour as a background, the colour’s id is stored in a cookie (colourId) with an expiration data set far in the future. This allows the code to remember the selected colour even if the user refreshes or navigates away from the page. As you can see in the screenshot above, it still remembers the colour details and the background colour after refreshing the page.

</br>

### 7th Button
![Sketch](images/7th.png)
Then we move on to the **Show Table** button. This button has been interacting with other buttons above, this will retrieve all the colours and display them on a table.

</br>

![Sketch](images/7th-table.png)
You can see all the changes made by using the table below. **Refreshing the page** will keep updating the changes made on the table.

</br>

### 8th Button
![Sketch](images/8th.png)
Moving onto the **Reset Table** button. This button will reset the colours table to its default state. Click the **Reset Table** button.

</br>

![Sketch](images/8th-msg.png)</br>
After you get the success message, click the **Show Table** button.

</br>

![Sketch](images/8th-table-1.png)
![Sketch](images/8th-table-2.png)
You can see all the contents are reverted to their original state.

</br>

### Left & Right arrow buttons and the input box
![Sketch](images/lr.png)</br>
**Left** and **Right arrow** buttons are used for navigating, and the **input box** in the middle is to allow the users to enter colour id manually.

</br>

![Sketch](images/lr-2.png)
After you enter the colour id in the box and press the **Enter Key**, it will display the colour corresponding to the colour id that you entered. It is easier and quicker to enter it manually than clicking the **Show Colour** button every time you would like to search for a colour.

</br>

### 404 page
![Sketch](images/404.png)
This is a custom HTML page for a **404 error**. If the user types a wrong address, this page will get displayed indicating that the error has been made, and the user can go back to the main page by clicking the **homepage**.


</br></br>

This is the end of my assignment. Thank you for your time.