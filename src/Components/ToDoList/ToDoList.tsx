import React, {  useRef, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, makeStyles, MenuItem, Menu,fade, Checkbox, Avatar, TextField, Button, Icon } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import "./../../styles/ToDoList/ToDoList.scss"
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "./../../Redux/store";
import { checkedTodo, removeTodoAC, AddTodoAC, RefreshInput, LoadToDOAC } from "../../Redux/reducerToDoList";
import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));




const ToDoList = () => {

    const classes = useStyles();

//////get array of todo list     
    const { todo , inputTodo } = useSelector((state: AppState) =>
      state.reducerToDO
    );

//// get username and image
  const {urlImage,userName} = useSelector ((state:AppState) => state.reducerGoogleLogin.googleLogin);




///// dispatch action creators
    const dispatch = useDispatch();
  


   // not_completed 

    const completedTodo = (id:string) => {
     dispatch(checkedTodo(id));
    }




    const removeTodo = ( id:string) => {

      setTimeout(()=>dispatch(removeTodoAC(id)),100);
      
    }

    let inputTodoREF = useRef<HTMLInputElement>();

  const RefreshInputTodo = (event:React.ChangeEvent<HTMLInputElement>) => {

      dispatch(RefreshInput(event.target.value));
     
  }





///////Add todo click button
  const addTodo = () => {
  if(inputTodoREF.current!.value !== ""){
    console.log(inputTodoREF.current!.value)
    dispatch(AddTodoAC(inputTodoREF.current!.value));
    inputTodoREF.current!.value = "";
  }
  }

///////Add todo press button "Enter"
const KeyBoardAddTodo = (event:React.KeyboardEvent) => {
  if(event.key === "Enter" && inputTodoREF.current!.value !== ""){
    dispatch(AddTodoAC(inputTodoREF.current!.value));
    inputTodoREF.current!.value = "";
  }
}




useEffect(()=>{
  localStorage.getItem("TODO") &&  dispatch(LoadToDOAC(JSON.parse(localStorage.getItem("TODO")!))); 
},[])

useEffect(()=>{
  localStorage.setItem("TODO",JSON.stringify(todo));
},[todo])

//localStorage.setItem("TODO",JSON.stringify(todo));
    return(
        <>
        <div className={classes.root}>

<AppBar position="static"  style = {{display:"block"}}>
  <Toolbar className = "todo_wrapper">
 

    <Typography variant="h6" className={classes.title}>
      To Do List
    </Typography>
    
      <div>
  
        <Menu
          id="menu-appbar"
         // anchorEl={console.log("")}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={false}
          onClose={()=>alert("HELLO")}
        >
          <MenuItem onClick={()=>alert("HELLO")}>Profile</MenuItem>
          <MenuItem onClick={()=>alert("HELLO")}>My account</MenuItem>
        </Menu>
      </div>

      
      {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}


          <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
         // onClick={console.log("")}
          color="inherit"
        >
          <Avatar alt={userName} src={urlImage} />
        </IconButton>
  </Toolbar>
</AppBar>
</div>

{/*////////// INPUT SECTION //////////// */}

<section className="form_section" >
           <TextField
          label="Enter new to do"
          type="text"
          autoComplete="current-text"
          variant="filled"
          className = "input_todo"
          defaultValue = {inputTodo}
          onChange = {RefreshInputTodo}
           inputRef = {inputTodoREF}
           onKeyPress = {KeyBoardAddTodo}
        />

        <div className="btn-add-todo">
        <Button
        onClick = {addTodo}
        variant="contained"
        color="primary"
        className=""
        endIcon={<AddIcon/> }
      ></Button>
        </div>
</section>





{/* ///////TO DO LIST ////////////*/}
            <section className="todo_wrapper list_scroll">

                {

                  todo.map((item,index) => (

                    <div className = {item.completed ? "todo_item completed" : "todo_item not_completed" } key = {item.id} >
                      
                   <Checkbox style ={{marginLeft:20,marginRight:10,zIndex:3}} checked={item.completed} onChange={()=>completedTodo(item.id)} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                  <div className="item_content">{index+1}. {item.contentToDo}</div>
                  <div className="time_added_todo">{item.dateAdded}</div>
                  <div className="btn_delete_todo" onClick = {()=>removeTodo(item.id)}><DeleteIcon color = "secondary" /></div>
                      </div>

                  ))

                }
                    
            </section>
        </>
    );
}

export default ToDoList;