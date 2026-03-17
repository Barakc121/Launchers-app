import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import useStore from "../useSrote";
import './HomePage.css'


function HomePage() {
  const { launchers, fetchLaunchers, setSelectLaunchers } = useStore();
  const navigate = useNavigate();
  const [citySearch, setCitySearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetchLaunchers();
  }, []);

  const filteredLaunchers = launchers.filter((l) => {
    const matchesCity = l.city
      ?.toLowerCase()
      .includes(citySearch.toLowerCase());
    const matchesType = typeFilter === "" || l.rocketType === typeFilter;
    return matchesCity && matchesType;
  });

  const handleSelect = (launcher) => {
    setSelectLaunchers(launcher);
    navigate("/details");
  };

  return (
    <div className="container">
      <h1>ניהול משגרים</h1>
      <h2>{launchers.length} :סה"כ משגרים</h2>
      <div className="user-table">
        <input
          placeholder="חיפוש לפי עיר"
          value={citySearch}
          onChange={(e) => setCitySearch(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">סינון לפי סוג</option>
          <option value="Shahab3">Shahab3</option>
          <option value="Fetah110">Fetah110</option>
          <option value="Radwan">Radwan</option>
          <option value="Kheibar">Kheibar</option>
        </select>
      </div>

      <div className="list">
        {filteredLaunchers.map((l) => (
          <div key={l._id}>
            <h3>{l.name}</h3>
            <p>עיר: {l.city}</p>
            <p> {l.rocketType} :סוג</p>
            <button onClick={() => handleSelect(l)}>צפייה במשגר בודד</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
