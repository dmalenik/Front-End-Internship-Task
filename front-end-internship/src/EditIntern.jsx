import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

const EditIntern = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log(email);
  // const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  // console.log(isVerifiedEmail);
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
    if (isEmail(email)) {
      console.log("Correct");
    } else {
      console.log("Wrong!");
    }
  };

  verifyEmail();

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

  return (
    <div>
      <NavLink to="/">Back to list </NavLink>
      <form>
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
