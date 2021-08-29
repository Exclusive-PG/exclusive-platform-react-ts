
import { StateToDo, ActionCompletedTodo, Actions, IToDo } from './interfaces';
import { COMPLETE_TODO_ITEM, REMOVE_TODO_ITEM, ADD_NEW_TODO_ITEM, REFRESH_INPUT_TODO, LOAD_TODO_ITEM } from './types';
import { getDate } from './Global_functions';






const initialState:StateToDo = {

    todo: [],

    inputTodo : ""
}

const reducerToDO = (state:StateToDo = initialState , action :Actions) => {

    switch(action.type){
        case COMPLETE_TODO_ITEM: {

            return {
                ...state,
         
                 todo:state.todo.map(item  => {

                    if(item.id == action.id ){
                        console.log("equal");
                        return {...item,completed:!item.completed}

                    }
            
                    return item;
                })

            }
        }


        case REMOVE_TODO_ITEM : {
            
            return{
                ...state,

                todo: state.todo.filter(item => item.id !== action.id)
       

            }
        
        }

        case REFRESH_INPUT_TODO: {

            return {
                ...state,
                inputTodo : action.inputTodo
            }
        }

        
        case ADD_NEW_TODO_ITEM:{

            let tempObject:IToDo = {
                id:Date.now().toString(),
                contentToDo : action.inputTodo,
                completed : false,
                dateAdded : `Added : ${getDate()}`
            }

            return {
                ...state,
                todo :  [...state.todo,tempObject],
                
            }


        }


        case LOAD_TODO_ITEM : {

            return{
                ...state,
                todo : action.local
            }
        }
        default: 
        return state;
    }
}


export const checkedTodo = (id:string):Object  =>({
type : COMPLETE_TODO_ITEM,
id
})

export const removeTodoAC = (id:string) :Object =>({
type : REMOVE_TODO_ITEM,
id
})

export const AddTodoAC = (inputTodo:string) :Object =>({
type : ADD_NEW_TODO_ITEM,
inputTodo
})


export const RefreshInput = (inputTodo:string) :Object => ({
    type : REFRESH_INPUT_TODO,
    inputTodo
    })

export const LoadToDOAC = (local : Array<IToDo>) =>({
    type : LOAD_TODO_ITEM,
    local
})
export default reducerToDO;