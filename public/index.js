const express = require('express'); // Import the Express web framework
const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module
const app = express(); // Create a new Express app
const dataFilePath = path.join(__dirname, 'data/data.json'); // Set the path to the data file
const rawData = fs.readFileSync(dataFilePath); // Read the data file
const backupData = fs.readFileSync(path.join(__dirname, "data/backup.json")); // Read the backup data file
const originalData = JSON.parse(backupData); // Parse the backup data file
let colours = JSON.parse(rawData); // Parse the data file

app.use(express.static('public')); // Serve static files from the public directory
// console.log('Loaded colours:', colours); // Log the colours to the console

app.get('/colours', (req, res) => { // GET /colours - Get the list of all colours and their details
    res.json(colours); // Return the colours as JSON
}); // end get

app.use(express.json()); // Use the built-in JSON middleware to parse incoming JSON request bodies
app.use(express.urlencoded({ // Use the built-in urlencoded middleware to parse incoming form data
    extended: true
})) // end use

app.get('/colours/:id', (req, res) => { // GET /colours/:id - Get the details of colour id
    const id = parseInt(req.params.id); // Get the id from the request parameters
    const colour = colours.find(c => c.colorId === id); // Find the colour with the specified id
    if (colour) { // If the colour exists
        res.json(colour); // Return the colour as JSON
    } else { // If the colour doesn't exist
        res.status(404).send('Colour not found!'); // Return a 404 Not Found status code
    } // end if else
}); // end get

app.post('/colours', (req, res) => { // POST /colours - Create a new colour with the details provided
    const { hexString, rgb, hsl, name } = req.body; // Get the details from the request body
    const maxId = Math.max(...colours.map(c => c.colorId)); // Get the maximum id from the existing colours
    const newColour = { // Create a new colour object
        colorId: maxId + 1,
        hexString,
        rgb,
        hsl,
        name
    }; // end newColour

    colours.push(newColour); // Add the new colour to the array of colours
    fs.writeFileSync(dataFilePath, JSON.stringify(colours)); // Write the colours to the data file
    res.status(201).json({ uri: `/colours/${newColour.colorId}` }); // Return a 201 Created status code with the URI of the new colour
}); // end post

app.put('/colours/:id', (req, res) => { // PUT /colours/:id - Modify colour id (creates one if it doesn't already exist)
    const id = parseInt(req.params.id); 
    const { hexString, rgb, hsl, name } = req.body;
    let colour = colours.find(c => c.colorId === id); // Find the colour with the specified id
    if (colour) { // If the colour exists,
        colour.hexString = hexString; // Update the colour details
        colour.rgb = rgb;
        colour.hsl = hsl;
        colour.name = name;

    } else { // If the colour doesn't exist, 
        colour = { // Create a new colour object
            colorId: id,
            hexString,
            rgb,
            hsl,
            name
        }; // end newColour
        colours.push(colour); // Add the new colour to the array of colours
    } // end if else

    fs.writeFileSync(dataFilePath, JSON.stringify(colours));
    res.json({ uri: `/colours/${colour.colorId}` }); // Return a 200 OK status code with the URI of the new colour
}); // end put

app.delete('/colours/:id', (req, res) => { // DELETE /colours/:id - Delete colour id (if it exists)
    const id = parseInt(req.params.id);
    const index = colours.findIndex(c => c.colorId === id); // Find the index of the colour with the specified id
    if (index >= 0) { // If the colour exists,
        colours.splice(index, 1); // Remove the colour from the array of colours
        for (let i = index; i < colours.length; i++) { 
            colours[i].colorId--; // Decrement the ids of all colours with a higher id
        } // end for

        fs.writeFileSync(dataFilePath, JSON.stringify(colours)); // Write the colours to the data file
        res.sendStatus(204); // Return a 204 No Content status code

    } else { // If the colour doesn't exist,
        res.status(404).send('Colour not found!'); // Return a 404 Not Found status code
    } // end if else
}); // end delete

app.put('/reset_colours', (req, res) => { // PUT /reset - Reset the colours to the original data
    colours = originalData; // Reset the colours to the original data
    fs.writeFileSync(dataFilePath, JSON.stringify(originalData)); // Write the colours to the data file
    res.sendStatus(204); // Return a 204 No Content status code
}); // end put

app.use((req, res, next) => { // Middleware to handle invalid DELETE and PUT requests
    if (req.method === 'DELETE' || req.method === 'PUT') { // If the request method is DELETE or PUT
        res.status(400).send('Invalid method'); // Return a 400 Bad Request status code
    } else { // If the request method is not DELETE or PUT
        next(); // Call the next middleware
    } // end if else
}); // end use

const port = 8080; // Set the port number
app.listen(port, () => { // Start the server
    console.log(`Server running on port ${port}.`); // Log the port number to the console
}); // end listen