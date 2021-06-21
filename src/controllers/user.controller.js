import { getConnection, querys, sql } from '../database';


const { selectAllUsers, selectUserById, addNewUser } = querys


export const getAllUsers = async (req, res) => {

   try {
      const pool = await getConnection();
      const result = await pool.request().query(selectAllUsers);

      res.json(result.recordset)

   } catch (error) {
      res.status(500)
      res.send(error.message)
   }
};

export const getUserById = async (req, res) => {
   const { userid } = req.params;

   try {
      const pool = await getConnection();
      const result = await pool
         .request()
         .input("userId", userid)
         .query(selectUserById)

      console.log(result.recordset[0]);

      if (result.recordset[0] === undefined) {
         return res.sendStatus(404);
      }

      res.send(result.recordset[0]);

   } catch (error) {
      res.status(500)
      res.send(error.message)
   };
};

export const createUser = async (req, res) => {
   const { userName, password } = req.body;

   let count = Object.keys(req.body).length;

   if (count < 2) {
      return res.status(400).json({ msg: 'Bad request: Please Fill all fields' });
   }

   try {

      const pool = await getConnection();

      await pool.request()
         .input("userName", sql.VarChar, userName)
         .input("password", sql.VarChar, password)
         .query(addNewUser);

      res.json({ msg: "New Contact Created succefully", userName, password });
      res.sendStatus(200);

   } catch (error) {
      res.status(500)
      res.send(error.message)
   };
};