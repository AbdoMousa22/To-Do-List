import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/GridLegacy';
import IconButton from '@mui/material/IconButton';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';



// ICONS
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


import {ToDosContext} from '../contexts/ToDosContext';
import {useContext} from 'react';
import {useState} from 'react'



let open=true;
export default function ToDo({todo}){
    const [showDeleteDialog,setShowDeleteDialog]=useState(false);
    const [showUpdateDialog,setShowUpdateDialog]=useState(false);
    const [updatedTodo,setUpdatedTodo]=useState({title:todo.title,details:todo.details});

    const {todos,setToDos}=useContext(ToDosContext);
    // START CHECK BUTTON
    function handelCheckClick(){ 
           const updatedTodos=todos.map((t)=>{
            if(t.id==todo.id){
                todo.isCompleted=!todo.isCompleted;
            }
            return  t;
        })
        setToDos(updatedTodos)
        localStorage.setItem('todos',JSON.stringify(updatedTodos));  

    }
    // END CHECK BUTTON
    // START DELETE BUTTON
    function handelDeleteClick(){ 
       setShowDeleteDialog(true);

       
    }
    function handelDeleteDialogClose(){ 
       setShowDeleteDialog(false);
    }
    function handelDeleteConfirm(){
        // console.log(todo.id)
        const updatedTodos=todos.filter((t)=>{
            // if(t.id==todo.id){
            //     return false;
            // }
            // return true;
            return t.id!=todo.id;
        });
        setToDos(updatedTodos);
        localStorage.setItem('todos',JSON.stringify(updatedTodos));  
     

    }
    // END DELETE BUTTON
    // START UPDATE BUTTON
    function handelUpdateClick(){ 
        setShowUpdateDialog(true);
     }
    function handelUpdateDialogClose(){ 
        setShowUpdateDialog(false);
     }
     function handelUpdateConfirm(){
        const updatedTodos=todos.map((t)=>{
            if(t.id==todo.id){
                return {...t,title:updatedTodo.title}
            }
            else{
                return t;
            }
        })

        setToDos(updatedTodos);
        setShowUpdateDialog(false);
        localStorage.setItem('todos',JSON.stringify(updatedTodos));  

     }
  
    // END UPDATE BUTTON
 
    return(
        <>
             {/* START DELETE DIALOG */}
              <Dialog style={{direction:"rtl "}} open ={showDeleteDialog} onClose={handelDeleteDialogClose} aria-labelledby ="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من حذف المهمة ؟
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description">
                       لا يمكنك التراجع عن الحذف بعد إتمامه
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelDeleteDialogClose}>التراجع</Button>
                    <Button onClick={handelDeleteConfirm} style={{color:"red"}}>حذف</Button>
                </DialogActions>
            </Dialog>
             {/* END DELETE DIALOG */}

             {/* START Update DIALOG */}
              <Dialog style={{direction:"rtl "}} open ={showUpdateDialog} onClose={handelUpdateDialogClose} aria-labelledby ="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    هل أنت متأكد من تعديل المهمة ؟
                </DialogTitle>
                <DialogContent >
                    <TextField value={updatedTodo.title }   onChange ={(e)=>{ setUpdatedTodo({...setUpdatedTodo,title:e.target.value})}} autoFocus margin="dense" id="name" label ="عنوان المهمة" fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelUpdateDialogClose}>التراجع</Button>
                    <Button onClick={handelUpdateConfirm} >تعديل</Button>
                </DialogActions>
            </Dialog>
             {/* END Update DIALOG */}
            
            <Card sx={{ minWidth: 275 ,background:"#191b1f",color:"white",marginTop:"20px"}}>
                    

                <CardContent className="box">
                
               <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
                    <Box sx={{ gridColumn: 'span 8' }}>
                            <Typography variant="h4" sx={{textAlign:"right", textDecoration:todo.isCompleted?"line-through":""}}  >{todo.title} </Typography>   
                            <Typography variant="h6" sx={{textAlign:"right"}}>  {todo.details} </Typography>
                    </Box>
                    <Box sx={{ gridColumn: 'span 4' }} display="flex" justifyContent="space-around" alignItems="center" >
                           <IconButton onClick={handelCheckClick} className="iconButton" aria-label="delete" sx={{color:todo.isCompleted?"white":"#8bc34a",background:todo.isCompleted?"#8bc34a":"white",border:todo.isCompleted?"solid white 3px":"solid #8bc34a 3px"}}>
                                <CheckIcon/>
                            </IconButton>
                            <IconButton onClick={handelUpdateClick} className="iconButton" aria-label="delete" sx={{color:"#1761aa",background:"white",border:"solid #1761aa 3px"}}>
                                <EditOutlinedIcon/>
                            </IconButton>
                            <IconButton onClick={handelDeleteClick} className="iconButton" aria-label="delete" sx={{color:"#b23c17",background:"white",border:"solid #b23c17 3px"}}>
                                <DeleteIcon/>
                            </IconButton>
                        
                    </Box>
            
                </Box>
                    
                </CardContent>
    
            </Card>
        </>
    
    );
}