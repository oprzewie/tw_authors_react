import { useEffect, useState } from "react";
import { CreateAuthor } from "./components/CreateAuthor";
import { AuthorsList } from "./components/AuthorList";
import "./style.css";

const API_URL = "http://localhost:8000";



export default function App() {
  const [authors, setAuthors] = useState([]);



 const onCreateAuthorClickHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;


    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setAuthors((prevAuthors) => [...prevAuthors, data]);
        }
      });
  };

  
  const onDeleteAuthorClickHandler = (id) => {
    fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== id)
        );
      }
    });
  };
  const onEditAuthorClickHandler = (id) => {

    let newName = prompt(`New name for author ${id}`);
    let newSurname = prompt(`New surname for author ${id}`)


    fetch(`${API_URL}/authors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        surname: newSurname,
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setAuthors((prevAuthors) => prevAuthors.map(a => {
            if(a.id === id) {
                return {
                    "id": id,
                    "name": newName,
                    "surname": newSurname
                }
            } else {
                return a
            }
          }));
        }
      });
  };


  useEffect(() => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  return (
    <div className="app">
    <h1>
    Authors
    </h1>
      <div style={{ marginBottom: "50px" }}>
        <CreateAuthor onCreate={onCreateAuthorClickHandler} />
      </div>
      <AuthorsList authors={authors} onDelete={onDeleteAuthorClickHandler} onEdit={onEditAuthorClickHandler}/>
    </div>
  );
}


