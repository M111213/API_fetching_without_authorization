import React, { SyntheticEvent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import { json, text } from 'stream/consumers';
import { urlToHttpOptions } from 'url';
import { title } from 'process';

async function get() {
  try {
    const response =  await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json());
    return response;
  } catch (e) { }

}

function Contact() {
  const [todos, setTodos] = useState<any[]>([]);
  const [name, setName] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | undefined>();
  const [rawInput, setRawInput] = useState("");
  const [counter, setCounter] = useState(0);


  useEffect(() => {

    async function fetch(){
      const todosFromServer = await get()
      setTodos(todosFromServer);
  }
  fetch()
    
  }, []);
  function increment() {
    setCounter(counter + 1);
  }
  const display = (event: SyntheticEvent) => {
    event.preventDefault();
    if (selected) {
      //find index of selected 
      const index = name.findIndex((n) => n === selected);
      if (index >= 0) {
        //replace value within the array
        setName(prevState => {
          const updatedList = [...prevState];
          updatedList[index] = rawInput;
          return updatedList;
        })
      }

    } else {
      setName(prevState => [...prevState, rawInput])
    }
    setRawInput("");
  }


  const person = prompt(" Enter your name");
  if (person == null || person == "") {
    let text = "User cancelled the prompt.";
  } else {
    let text = "Hello " + person + "Welcome to contact manager";
  } 

  return (
    <form onSubmit={display}>
      <div className="App">
        <h2>{counter}</h2>
        <header className="App-header">
          <h1>Contact manager</h1>
          <input type="text" value={rawInput} onChange={(e) => setRawInput(e.target.value)}></input>
          <button type='submit'>Submit</button>
          {
            name !== [] && name.map(item =>
              <p style={{
                background: ('background' == item) ? 'green' : 'black',
                color: "#FFFFFF",
              }} onClick={() => {
                setSelected(item);
                setRawInput(item);
              }}>{item}</p>)

          }
          {
            rawInput && (<UnmountOnEmptyRawInput rawInput={rawInput} />)
          }

          {
            <ul>
              <li>{todos.map(r=> <li>{r.title}</li>)}</li>
              <li>{todos.map(r=> <li>{r.userId}</li>)}</li>
            </ul>
          }

        </header>

      </div>
    </form>
  )
}


function UnmountOnEmptyRawInput({ rawInput }: { rawInput: string }) {



  useEffect(()=>{
      console.log("Mounting");
      return ()=>{
         console.log("This component is now unmounting");
         
      }
  }, [])

  return (<div>{rawInput}</div>)
}

export default Contact;
export { Contact };
