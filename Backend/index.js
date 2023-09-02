const express = require("express");
const app = express();
mysql = require("mysql");
//cors are used for connection between server and client
const cors = require("cors");
app.use(cors());
//const storage = require("node-persist");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
//connect database connection
conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database:'notebook',
	
});
//check connection is connected or not

conn.connect((err)=>{
	if(err){
		console.log(err);
	}else{
		console.log("connected database");
	}
	
});


//when we have received req from thr frotend database for insert data into mysql database
app.post('/addvalue',jsonParser,(req,res)=>{
	const result = req.body;
	console.log(result);
	conn.query('insert into useContent values(?,?)',[result.id,result.name],function(err,results){
		if(err){
			throw err;
		}
		res.send(results);
	})
})


//when we have received req from thr frotend database for fetching all data into mysql database
app.get('/getvalue',(req,res)=>{
	conn.query("select * from useContent",(err,result)=>{
		if(err){
			throw err;
		}
		console.log(result);
		res.send(result);
	})
})
////when we have received req from thr frotend database for delete data into mysql database
app.delete("/deletevalue/:id",function(req,res){
	const req_id = req.params.id;
	conn.query("delete from useContent where id = ?",[req_id],function(err,result){
		if(err){
			console.log(err);
		}
		res.send("Successfully deleted "+req_id);
	})
	
})
//starting server with
app.listen(3000, function(){
	console.log("listening on http://localhost:3000")
})

//create database

//initialize all the storage
/*const removeAllItem = async ()=>{
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
  */
	
	
	