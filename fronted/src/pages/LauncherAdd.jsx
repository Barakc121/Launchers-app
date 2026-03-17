// פה ניתן להוסיף משגר חדש

import React, { useState } from "react";
import { useNavigate } from "react-router";
import useStore from "../useSrote";

function LauncherAdd() {
  const { addLauncher } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    // צריך לתת ברירת מחדל לרקטה כי אם הלקוח לא בוחר הוא שולח ריק
    rocketType: "Shahab3",
    latitude: "",
    longitude: "",
    city: "",
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    await addLauncher(form);
    navigate("/");
  };

  return (
    <div className="add-page">
      <h1>הוספת משגר חדש</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="שם המשגר"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.rocketType}
          onChange={(e) => setForm({ ...form, rocketType: e.target.value })}
        >
          <option value="Shahab3">Shahab3</option>
          <option value="Fetah110">Fetah110</option>
          <option value="Radwan">Radwan</option>
          <option value="Kheibar">Kheibar</option>
        </select>

        <input
          type="number"
          placeholder="נקודת רוחב (latitude)"
          value={form.latitude}
          onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
          required
        />

        <input
          type="number"
          placeholder="נקודת אורך (longitude)"
          value={form.longitude}
          onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
          required
        />

        <input
          placeholder="עיר"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />

        <button type="submit">הוסף משגר</button>
      </form>
    </div>
  );
}

export default LauncherAdd;

