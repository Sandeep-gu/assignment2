const express = require("express");
const app = express();
//cors are used for connection between server and client
const cors = require("cors");
app.use(cors());
const storage = require("node-persist");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
//initialize all the storage
const removeAllItem = async ()=>{
    await storage.init();
    await storage.clear();
}
removeAllItem().then(()=>{
app.post("/data", jsonParser, async (req, res) => {
	const { student_id, student_name } = req.body;
	try {
		if (student_id && student_name !== "") {
			await storage.setItem(student_id, student_name);
			res.send("Successfully inserted");
		}
	} catch (error) {
		console.error("Error inserting data:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.get("/data", async (req, res) => {
	try {
		const data = await storage.values();
		res.send(data);
	} catch (error) {
		console.error("Error retrieving data:", error);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(3000, () => {
	console.log("listening on port 3000");
    
});

}).catch((error) => {
    console.error('Error initializing storage:', error);
  });