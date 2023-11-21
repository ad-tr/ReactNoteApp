import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [notes, setNotes] = useState(null);
  const [selected, setSelected] = useState(0)

  async function fetchNotes() {
    const response = await fetch("http://localhost:4000/notes");
    const data = await response.json();
    setNotes(data)
    console.log(data);
  }

  async function addNote() {
    try {
      const response = await fetch("http://localhost:4000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: notes.length,
          title: "Nouvelle note "+notes.length,
          content: "Contenu de la nouvelle note "+notes.length,
        }),
      });

      if (response.ok) {
        // Actualiser la liste des notes après l'ajout
        fetchNotes();
      } else {
        console.error("Erreur lors de l'ajout de la note");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  }


  useEffect(function () {
    fetchNotes();
  }, []);

  return (
    <>
      <aside className="Side">
        <button className="Button-create-note" onClick={()=>addNote()}>+</button>
        {notes !== null ? notes.map((note) => (
        <div className="Note-link" onClick={() => setSelected(note.id)}>{note.title}</div>))
      : null}
      </aside>
      <main className="Main">
        {notes !== null ?  <a>{notes[selected].content}</a> : <p>Chargement...</p>}
      </main>
    </>
  );
}

export default App;