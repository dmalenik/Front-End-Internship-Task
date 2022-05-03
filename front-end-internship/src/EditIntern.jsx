import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

const EditIntern = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [internshipStart, setInternshipStart] = useState("");
  const [internshipEnd, setInternshipEnd] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleInternshipStart = (e) => {
    setInternshipStart(e.target.value);
  };
  const handleInternshipEnd = (e) => {
    setInternshipEnd(e.target.value);
  };

  const verifyEmail = () => {
    if (!email) {
      return;
    }

    if (isEmail(email)) {
      console.log("Correct");
    } else {
      console.log("Wrong!");
    }
  };

  verifyEmail();

  const compareDates = () => {
    if (!internshipStart || !internshipEnd) {
      return;
    }

    if (internshipEnd > internshipStart) {
      console.log(true);
    } else {
      console.log(false);
    }
  };

  compareDates();

  const getIntern = async () => {
    let url = `http://localhost:3001/interns/${id}`;
    let response = await fetch(url);
    let intern = await response.json();

    setName(intern.name);
    setEmail(intern.email);
    setInternshipStart(intern.internshipStart.slice(0, 10));
    setInternshipEnd(intern.internshipEnd.slice(0, 10));
  };

  useEffect(() => {
    //TODO: get intern from REST api http://localhost:3001/interns/:id
    console.log(`I want to get intern with id: ${id}!`);

    getIntern();
  }, [id]);

  const updatePost = async () => {
    let url = `http://localhost:3001/interns/${id}`;
    let body = {
      id: id,
      name: name,
      email: email,
      internshipStart: internshipStart,
      internshipEnd: internshipEnd,
    };
    let requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    let response = await fetch(url, requestOptions);
    let data = await response.json();
  };

  return (
    <div>
      <NavLink to="/">Back to list </NavLink>
      <form onSubmit={updatePost}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleName(e)}
          required
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => {
            handleEmail(e);
          }}
          required
        />
        <label>Internship Start</label>
        <input
          type="date"
          name="internshipStart"
          value={internshipStart}
          onChange={(e) => handleInternshipStart(e)}
          required
        />
        <label>Internship End</label>
        <input
          type="date"
          name="internshipEnd"
          value={internshipEnd}
          onChange={(e) => handleInternshipEnd(e)}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditIntern;
