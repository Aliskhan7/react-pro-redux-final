export const loadTodos = () =>{
    return (dispatch) =>{
        dispatch({type: 'start'});
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then( response => response.json())
            .then( json =>{
                dispatch({
                    type: 'load',
                    payload: json
                })
            })
    }
}

export const removeTodo = (id) =>{
    return(dispatch) =>{
        dispatch({type: 'start_deliting', payload: id})

        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                method: 'DELETE'
            })
            .then(respose => respose.json())
            .then(() =>{
                dispatch(
                    {
                        type: 'delete',
                        payload: id
                    }
                )
            })
    }
}

export const editTodo = (id, completed) =>{
    return(dispatch) => {
        dispatch({ type: 'start_checking', payload: id})
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: !completed}),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then( response => response.json())
            .then(() =>{
                dispatch({
                    type: 'update',
                    payload: id
                })
            })
    }
}