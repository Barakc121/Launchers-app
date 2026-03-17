import { ObjectId } from "mongodb";
import { getDB } from "../config/db";

const SECRET_KEY = "BARAK_123";
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = getDB();
    const user = await db.collection("users").findOne({ username, password });

    if (!user) {
      return res.json({ message: "משתמש או סיסמא לא נכון" });
    }
    const token = jwt.sign(
      { userId: user._id, user_type: user.user_type },
      SECRET_KEY,
      { expireIn: "8h" },
    );
    res.json({
      message: "connected",
      user: { username: user.username, user_type: user.user_type },
      token,
    });
  } catch {
    res.json({ message: "unconnected" });
  }
};


// 
export const deleteUser=async (req,res)=>{
    try{
        const {id}=req.params
const token=req.headers['authorization']

if(!token){
    return res.json({message:'אין טוקן /אין גישה '})
}

const decoded=jwt.verify(token,SECRET_KEY)

if(decoded.user_type !=='admin'){
    return res.json({message:"רק מנהל מוחק"})

}
    }
}