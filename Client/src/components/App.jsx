import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import LogIn from "./LogIn";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (name) {
      axios
        .get(`${apiUrl}/${name}`)
        .then((response) => setNotes(response.data))
        .catch((error) => console.log(error));
    }

    // fetch('http://localhost:4200/')
    // .then(response => response.json())
    // .then(data => {
    //   // Handle successful response
    //   console.log(data);
    //   setNotes(() => {
    //     return data;
    //   });
    // })
    // .catch(error => {
    //   // Handle error
    //   console.log(error);
    // });
  }, [name]);

  function checkUser(validUser) {
    setName(validUser);
    setToken(true);
  }

  function addNote(newNote) {
    axios
      .post(`${apiUrl}/add/${name}`, {
        title: newNote.title,
        desc: newNote.desc,
      })
      .then((response) => {
        // Handle successful response
        setNotes(() => {
          return [response.data];
        });
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });

    // setNotes((prev) => {
    //   return [...prev, newNote];
    // });
    console.log(notes);
  }

  function delNote(title) {
    axios
      .delete(`${apiUrl}/del/${title}`, {
        data: { name: name }, // Add the "name" parameter as data in the request body
      })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });

    // setNotes((prev) => {
    //   return prev.filter((noteItem) => {
    //     return title !== noteItem.title;
    //   });

    // });

    setNotes((prev) => {
      return prev.map((noteItem) => {
        if (noteItem.Name === name) {
          // Filter out the specific title for the specific name
          return {
            ...noteItem,
            Content: noteItem.Content.filter((contentItem) => {
              return contentItem.title !== title;
            }),
          };
        } else {
          return noteItem;
        }
      });
    });
  }
  return (
    <div>
      <Header />

      {token ? (
        <>
          <CreateArea onAdd={addNote} />
          {notes.map((obj) =>
            obj.Content.map((item, index) => {
              return (
                <Note
                  delete={delNote}
                  key={index}
                  id={index}
                  title={item.title}
                  content={item.desc}
                />
              );
            })
          )}
        </>
      ) : (
        <LogIn User={checkUser} />
      )}
      <Footer />
    </div>
  );
}

export default App;
