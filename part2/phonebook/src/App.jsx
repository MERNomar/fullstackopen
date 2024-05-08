import { useEffect, useState } from "react";
import {
  getAllPersons,
  deletePerson,
  updatePerson,
  addNewPerson,
} from "./server";

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) return null;

  return <div className="error-message">{errorMessage}</div>;
};

const Notification = ({ message }) => {
  if (message === null) return null;

  return <div className="added-person">{message}</div>;
};

const Number = ({ person, handleDelete }) => {
  return (
    <li key={person.id}>
      {` ${person.name}  ${person.number}`}{" "}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </li>
  );
};

const SearchFilter = ({ setSearch, search }) => {
  const handleSearchFilter = (e) => {
    const currentInput = e.target.value;
    setSearch(currentInput);
  };
  return (
    <div>
      filter shown with :
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => handleSearchFilter(e)}
      />
    </div>
  );
};

const PhoneBookForm = ({
  handleSubmit,
  setNewName,
  setNewNumber,
  newName,
  newNumber,
}) => {
  return (
    <>
      <h1>add new</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          name:
          <input
            name="name"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            name="number"
            id="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Numbers = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Number key={person.id} handleDelete={handleDelete} person={person} />
        ))}
      </ul>
    </>
  );
};

const App = () => {
  const [addedPerson, setAddedPerson] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllPersons().then((res) => setPersons(res));
  }, []);

  const searchedArray = persons.filter((person) => {
    if (!person.name) return;
    return person.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = (id) => {
    const arrayWithDeletedItem = persons.filter((person) => person.id !== id);
    deletePerson(id)
      .then((data) => {
        setPersons(arrayWithDeletedItem);
      })
      .catch((err) => {
        setPersons(arrayWithDeletedItem);
        setErrorMessage(`This number has already been deleted`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const handleChange = (person) => {
    const alerted = confirm(
      `${person.name} is already added to the phonebook, want to replace the old number with a new one ?`
    );
    if (!alerted) return;
    updatePerson({ ...person, number: newNumber }).then((data) => {
      const newPersonsArray = persons.map((person) =>
        person.id === data.id ? data : person
      );

      setPersons(newPersonsArray);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPersonExist = persons.find((e) => e.name === newName);
    if (currentPersonExist) return handleChange(currentPersonExist);
    addNewPerson({
      name: newName,
      number: newNumber,
    }).then((res) => {
      setPersons(persons.concat(res));
      setAddedPerson(`added ${res.name}`);
      setTimeout(() => {
        setAddedPerson(null);
      }, 3000);
    });
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedPerson} />
      <ErrorNotification errorMessage={errorMessage} />
      <SearchFilter search={search} setSearch={setSearch} />
      <PhoneBookForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Numbers filteredPersons={searchedArray} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
