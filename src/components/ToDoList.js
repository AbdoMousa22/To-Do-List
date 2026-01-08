import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4} from 'uuid';
import {ToDosContext} from '../contexts/ToDosContext';
import {useState , useContext ,useEffect} from 'react';
import Box from '@mui/material/Box';




//ICONS




// ALL COMPONENTS
import ToDo from './ToDo';




export default function ToDoList() {

    const {todos,setToDos}=useContext(ToDosContext);
    const [titleInput,setTitleInput]=useState("");
    const [displayedTodosType,setDisplayedTodosType]=useState("all");

    const completedToDos=todos.filter((todo)=>{
        return todo.isCompleted;

    });

    const notCompletedToDos=todos.filter((todo)=>{
        return !todo.isCompleted;

    });

    let todosToBeRenderedr= todos;

    if(displayedTodosType==="cmopeleted"){
        todosToBeRenderedr= completedToDos;
    }else if(displayedTodosType==="non-cmopeleted"){
          todosToBeRenderedr= notCompletedToDos;
      }


    const todoJsx=todosToBeRenderedr.map((t)=>{
        
        return  <ToDo key={t.id} todo={t}/> ;
    })
    

    useEffect(() => {
      const storageTodos=JSON.parse( localStorage.getItem("todos")) ?? [];
      setToDos(storageTodos);
    }, [ ]);
  
    function changeDisplayedType(event){
      setDisplayedTodosType(event.target.value)
    }
    function handelAddClick(){
  
         let newTodo={
             id:uuidv4(),
             title:titleInput,
             details:"",
             isCompleted:false
         };
         
         let updatedTodos=[...todos ,newTodo]
        setToDos(updatedTodos);
        localStorage.setItem('todos',JSON.stringify(updatedTodos));
        setTitleInput("");
        
    }
  

  return (
  
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh" ,overflowY:"scroll" }}>
            <CardContent>
                <Typography variant="h2" gutterBottom sx={{ color: 'text.secondary' }}> مهامي </Typography>
                <Divider/>
                {/* START FILTER BUTTONS */}
                <ToggleButtonGroup
                    style={{
                        direction:"ltr",
                        marginTop:"30px",
                    }}
                    value={displayedTodosType}
                    exclusive
                    onChange={changeDisplayedType}
                    aria-label="text alignment"
                    >
                    <ToggleButton  value="non-cmopeleted" > غير منجز   </ToggleButton>
                    <ToggleButton  value="cmopeleted">     منجز        </ToggleButton>
                    <ToggleButton  value="all"> الكل                   </ToggleButton>
                   
                </ToggleButtonGroup>
                {/* END FILTER BUTTONS */}

                {/* START TODOs  */}
                  {todoJsx}
                {/* START TODOs  */}

                {/*  START INPUT + BUTTON */}
           
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 ,marginTop:"20px"}}>
                    <Box sx={{ gridColumn: 'span 8' }}>
                    <TextField onChange={(event)=>{setTitleInput(event.target.value)}} value={titleInput}  style={{width:"100%",height:"100%"}}  id="outlined-basic" label="عنوان المهمة" variant="outlined" />
                    </Box>
                    <Box sx={{ gridColumn: 'span 4' }}>
                    <Button variant="contained" disabled={titleInput.length<=3} style={{width:"100%",height:"100%" ,background:"#191b1f",color:"white"}} onClick={()=>{handelAddClick()}} >إضافة</Button>
                    </Box>
            
                </Box>

                {/*  END INPUT + BUTTON */}
           
            </CardContent>
        </Card>
      </Container>
  
  );
}
