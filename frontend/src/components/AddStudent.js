import React, { useState } from "react";
import { addStudent } from "../services/api";

function AddStudent() {
  const [student, setStudent] = useState({
  name: "",
  email: "",
  course: "",
  year: "",
  attendance: "",
  feesStatus: "",
  marks: ""
});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(student);
    alert("Student added!");
  };

  return (
    <div>
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="course" placeholder="Course" onChange={handleChange} />
        <input name="year" placeholder="Year" onChange={handleChange} />
        <input
  name="attendance"
  placeholder="Attendance"
  onChange={handleChange}
/>

<input
  name="feesStatus"
  placeholder="Fees Status"
  onChange={handleChange}
/>

<input
  name="marks"
  placeholder="Marks"
  onChange={handleChange}
/>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;