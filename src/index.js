import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import './style.css'

const initalState ={
    todos: [],
    loading: false
}

const reducer = (state = initalState, action) => {
    switch (action.type){
        case 'start':
            return{
                ...state,
                loading: true
            }

        case 'load':
            return{
                ...state,
                todos: action.payload,
                loading: false
            }

        case 'delete':
            return{
                ...state,
                todos: state.todos.filter(item =>{
                    if(item.id === action.payload){
                        return false
                    }
                    return item
                })
            }

            case 'start_deliting':
                return{
                    ...state,
                    todos: state.todos.map(item =>{
                        if(item.id === action.payload){
                            return{
                                ...item,
                                deliting: true
                            }
                        }
                        return item
                    })
                }

        case 'update':
            return{
                ...state,
                todos: state.todos.map(item =>{
                    if(item.id === action.payload){
                        return{
                            ...item,
                            completed: !item.completed,
                            checking: false
                        }
                    }
                    return item
                })
            }

        case 'start_checking':
            return{
                ...state,
                todos: state.todos.map(item =>{
                    if(item.id === action.payload){
                        return{
                            ...item,
                            checking: true
                        }
                    }
                    return item
                })
            }

        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <div className='container'>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
  document.getElementById('root')
);

