import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {editTodo, loadTodos, removeTodo} from "./actions";
import ReactLoading from 'react-loading';
import Header from "./Header";




function App() {
    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos);
    const loading = useSelector(state => state.loading);


    useEffect(() =>{
        dispatch(loadTodos())
    }, [])

    const handelEdit =(id, completed) =>{
        dispatch(editTodo(id, completed))
    }
    const hendalDelete = (id) =>{
        dispatch(removeTodo(id))
    }


    return (
    <div>
        <Header/>
      <div>
        {loading ? 'Loading...' : ''}
      </div>
      {todos.map(item =>{
            return(
                <div className='todo'>
                    <div className="check">
                    {item.checking ? (
                        <ReactLoading type='spin' color='#0033ff' height={16} width={16} />
                    ) : (
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handelEdit(item.id, item.completed)}
                        />
                    )}
                  </div>
                    <div className="title">
                    {item.title}
                  </div>
                    <div className="actions">
                    <button
                        onClick={() => hendalDelete(item.id)}
                        disabled={item.deliting}
                    >
                      Delete
                    </button>
                  </div>
                </div>
            )
          }
      )}
    </div>
  );
}

export default App;
