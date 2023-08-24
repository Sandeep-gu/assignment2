import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
function App() {
  const [student_name,setStudent_name] = useState('');
  
  const unique_id = uuid();
  const student_id = unique_id.slice(0,8);
  const [data, setData] = useState([]);
//fetch all data from the local storage and store it in the data state variable.
  const fetchData = async() => {
    return fetch('http://localhost:3000/data')
      .then((res) => res.json())
      .then((d) => setData(d))
  }
  console.log(data)
//when applicatino is render they automatically fetch data without calling
  useEffect(() => {
    fetchData();
  }, []);
  //post data in the Local Storage
  const handleSubmit = async(e)=>{
    
    console.log(student_id)
    e.preventDefault();
    try{
      const body = {student_id,student_name};
      fetch('http://localhost:3000/data',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(body)
    
    });
    console.log(body);
    window.location='/';
  }catch(err){
    console.err(err.message)
  }
}
    

        return (
        <div className='container mt-4 App p-5 rounded'>
            
            <h1 className='text-center'>TODO List App</h1>
            <div className="container1 d-flex flex-column flex-md-row m-4">
              <label className="form-control align-self-md-auto align-self-stretch bg-success">Enter The Task</label>
              <input type="text" className="form-control" value={student_name} onChange={(e)=>setStudent_name(e.target.value)}/>
              <button className='bg bg-primary form-control w-25' onClick={handleSubmit}>Add</button>
            </div>
            <div className="container">
              {data.map(item=> <div className='container bg-white form-control w-75 mb-3'><h5 className="text-center">{item}</h5></div>

              )}
            </div>
        
        </div>
        )
}
export default App;