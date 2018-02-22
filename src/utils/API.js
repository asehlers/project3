import axios from "axios";

export default {
  // Gets all regulation
  getRegulation: function() {
    return axios.get("/api/regulation");
  },
  // Gets the regulation with the given id
  getRegulation: function(id) {
    return axios.get("/api/regulation/" + id);
  },
  // Deletes the regulation with the given id
  deleteRegulation: function(id) {
    return axios.delete("/api/regulation/" + id);
  },
  // Saves a regulation to the database
  saveRegulation: function(regulationData) {
    return axios.post("/api/regulation", regulationData);
  },
  // Gets all catch
  getCatch: function() {
    return axios.get("/api/catch");
  },
  // Gets the catch with the given id
  getCatch: function(id) {
    return axios.get("/api/catch/" + id);
  },
  // Deletes the catch with the given id
  deleteCatch: function(id) {
    return axios.delete("/api/catch/" + id);
  },
  // Saves a catch to the database
  saveCatch: function(catchData) {
    return axios.post("/api/catch", catchData);
  },
  // Returns all users
  getUsers: function() {
    return axios.post("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  }
};
