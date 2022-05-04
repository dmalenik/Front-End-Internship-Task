import "./EditIntern.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EditIntern = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailCorrect, setIsEmailCorrect] = useState("");
  const [internshipStart, setInternshipStart] = useState("");
  const [internshipEnd, setInternshipEnd] = useState("");
  const [isDateCorrect, setIsDateCorrect] = useState("");

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
      setIsEmailCorrect(true);
    } else {
      setIsEmailCorrect(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [email]);

  const compareDates = () => {
    if (internshipEnd > internshipStart) {
      setIsDateCorrect(true);
    } else {
      setIsDateCorrect(false);
    }
  };

  useEffect(() => {
    compareDates();
  }, [internshipStart, internshipEnd]);

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
    <div className="container">
      <div className="returnLink">
        <AiOutlineArrowLeft />
        <NavLink to="/">Back to list </NavLink>
      </div>
      <section className="internProfile">
        <h2 className="headerForm">Edit</h2>
        <form onSubmit={updatePost} className="internForm">
          <div className="name">
            <label for="name">Full name *</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => handleName(e)}
              required
            />
          </div>
          <div className="email">
            <label for="email">Email address *</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                handleEmail(e);
              }}
              required
            />
          </div>
          <div className="internshipDates">
            <div className="date">
              <label for="start">Internship start *</label>
              <input
                type="date"
                name="internshipStart"
                id="start"
                value={internshipStart}
                onChange={(e) => handleInternshipStart(e)}
                required
              />
            </div>
            <div className="date">
              <label for="end">Internship end *</label>
              <input
                type="date"
                name="internshipEnd"
                id="end"
                value={internshipEnd}
                onChange={(e) => handleInternshipEnd(e)}
                required
              />
            </div>
          </div>
          <div className="btn">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditIntern;
