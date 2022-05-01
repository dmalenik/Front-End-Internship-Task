import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

const EditIntern = () => {
  // added
  const [internData, setInternData] = useState();
  console.log(internData);
  const { id } = useParams();

  // added
  const getIntern = async () => {
    let url = `http://localhost:3001/interns/${id}`;
    let response = await fetch(url);
    let internData = await response.json();
    setInternData(internData);
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
          value={internData ? internData.name : ""}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={internData ? internData.email : ""}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditIntern;
