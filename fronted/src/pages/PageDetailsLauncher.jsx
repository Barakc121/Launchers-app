// עמוד שמראה את פרטי המשגר
import React from "react";
import { useNavigate } from "react-router";
import useStore from "../useSrote";

function PageDetailsLauncher() {
  const { selectedLauncher } = useStore();
// 
  const navigate = useNavigate();

  if (!selectedLauncher) {
    return (
      <div>
        <p>לא נבחר משגר להצגה</p>
        <button onClick={() => navigate("/")}>חזור לדף הבית</button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <h1>פרטי משגר: {selectedLauncher.name}</h1>
      <hr />
      <p><strong>סוג רקטה:</strong> {selectedLauncher.rocketType}</p>
      <p><strong>עיר:</strong> {selectedLauncher.city}</p>
      <p><strong>נקודת רוחב:</strong> {selectedLauncher.latitude}</p>
      <p><strong>נקודת אורך:</strong> {selectedLauncher.longitude}</p>
      
      <button onClick={() => navigate("/")}>חזור לרשימה</button>
    </div>
  );
}

export default PageDetailsLauncher;