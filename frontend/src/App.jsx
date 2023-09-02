import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function App() {
	const [name, setName] = useState("");

	const unique_id = uuid();
	const id = unique_id.slice(0, 8);
	const [data, setData] = useState([]);
	//fetch all data from the local storage and store it in the data state variable.
	const fetchData = async () => {
		return fetch("http://localhost:3000/getvalue")
			.then((res) => res.json())
			.then((d) => setData(d));
	};
	console.log(data);
	//when application is render they automatically fetch data
	useEffect(() => {
		fetchData();
	}, []);
	//post data in the Local Storage
	const handleSubmit = async (e) => {
		console.log(id);
		e.preventDefault();
		try {
			const body = { id, name };
			const res =await fetch("http://localhost:3000/addvalue", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify(body),
			});
			console.log(res);
			window.location = "/";
		} catch (err) {
			console.log(err.message);
		}
	};
	//delete data through the id
	async function deletebtn(id){
		try{
			await fetch(`http://localhost:3000/deletevalue/${id}`,{
			method:"DELETE",
			headers:{
				"Content-Type": "application/json",
			}
		
		})
		}catch(err){
			console.log(err.message);
		}
		fetchData();

	}
		
	

	return (
		<div className="container mt-4 App p-5 rounded">
			<h1 className="text-center">TODO List App</h1>
			<div className="row mt-5">
				<label className="col-md-2 rounded text-center pt-2 bg-secondary pb-sm-2">
				Enter The Task
				</label>
				<input className="col-md form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
				
				
				<button className="col-md-2 rounded text-center bg-primary" onClick={handleSubmit}>Add Task</button>
				
       
      </div>
			<div className="container mt-5">
				{data.map((item) => (
					<div className="d-flex justify-content-between bg-white my-2 rounded align-items-center" key={item.id}>
						<div className="p-2">{item.name}</div>
						<div className="p-2"><button type="button" className="btn btn-primary" onClick = {()=>deletebtn(item.id)}>X</button></div>
						
					</div>
				))}
			</div>
		</div>
	);
}
export default App;
