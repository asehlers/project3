import axios from "axios";

export default {
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
  }
};
