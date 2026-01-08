import './App.css';
import ToDoList from './components/ToDoList';
import {useState} from 'react';
import {ToDosContext} from './contexts/ToDosContext';
import {v4 as uuidv4} from 'uuid';



const initialTodos=[
  {
      id:uuidv4(),
      title:"قراءة كتاب",
      details:"أول كتاب",
      isCompleted:false
  }


]

function App() {
  let divAppStyle={ display:"flex",alignItems:"center",justifyContent:"center", backgroundColor:"#191b1f", height:"100vh",  direction:"rtl"}
   
  const [todos,setToDos]=useState(initialTodos)

 

  return (
    
    <div  className="App" style={divAppStyle}>

     <ToDosContext.Provider value={{todos,setToDos}}>
      <ToDoList/>
     </ToDosContext.Provider>
     
   

    </div>

  );
}

export default App;
