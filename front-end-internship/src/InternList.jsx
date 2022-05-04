import "./internList.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";

const InternList = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch("http://localhost:3001/interns");
      const interns = await response.json();
      setInterns(interns);
    };
    fetchInterns();
  }, []);

  return (
    <section className="interns">
      <h2 className="listName">Participants</h2>
      <ul className="list">
        {interns.map((u) => (
          <li key={u.id}>
            <div className="userName">{u.name}</div>
            <div className="references">
              <FiEdit3 />
              <NavLink to={`/interns/${u.id}`}>Edit</NavLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InternList;
