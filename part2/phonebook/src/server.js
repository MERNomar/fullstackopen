import axios from "axios";

const baseURL = "http://localhost:3301/persons";

const getAllPersons = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const addNewPerson = (newObject) => {
  return axios.post(baseURL, newObject).then((res) => res.data);
};

const updatePerson = (newObject) => {
  return axios
    .put(`${baseURL}/${newObject.id}`, newObject)
    .then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((res) => res.data);
};

export { getAllPersons, addNewPerson, deletePerson, updatePerson };
