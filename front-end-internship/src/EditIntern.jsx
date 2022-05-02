import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

const EditIntern = () => {
  const [intern, setIntern] = useState();
  const { id } = useParams();

  const getIntern = async () => {
    let url = `http://localhost:3001/interns/${id}`;
    let response = await fetch(url);
    let intern = await response.json();

    setIntern(intern);
  };

  useEffect(() => {
    //TODO: get intern from REST api http://localhost:3001/interns/:id
    console.log(`I want to get intern with id: ${id}!`);

    getIntern();
  }, [id]);

  return (
    <div>
      <NavLink to="/">Back to list </NavLink>
      <form>
        <label>Name</label>
        <input type="text" name="name" value={intern?.name || ""} required />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={intern ? (isEmail(intern.email) ? intern.email : "") : ""}
          required
        />
        <label>Internship Start</label>
        <input
          type="date"
          name="internshipStart"
          value={intern?.internshipStart.slice(0, 10) || ""}
          required
        />
        <label>Internship End</label>
        <input
          type="date"
          name="internshipEnd"
          value={intern?.internshipEnd.slice(0, 10) || ""}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditIntern;
