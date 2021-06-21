import { getConnection, sql, querys } from '../database';

// Querys
const {
   getAllContacts,
   addNewContact,
   selectContactById,
   removeContactById,
   updtContactById
} = querys;

export const createContact = async (req, res) => {

   const { FirstName, LastName, Phone, userId } = req.body;

   let count = Object.keys(req.body).length;

   if (count < 4) {
      return res.status(400).json({ msg: 'Bad request: Please Fill all fields' });
   }

   try {

      const pool = await getConnection();

      await pool.request()
         .input("FirstName", sql.VarChar, FirstName)
         .input("LastName", sql.VarChar, LastName)
         .input("Phone", sql.VarChar, Phone)
         .input("userId", sql.Int, userId)
         .query(addNewContact);

      res.json({ msg: "New Contact Created succefully", FirstName, LastName, Phone, userId });
      res.sendStatus(200);

   } catch (error) {

      res.status(500)
      res.send(error.message)

   }

};

export const getContacts = async (req, res) => {

   try {
      const pool = await getConnection();
      const result = await pool.request().query(getAllContacts);

      res.json(result.recordset);

   } catch (error) {
      res.status(500)
      res.send(error.message)
   };
};

export const getContactById = async (req, res) => {

   const { id } = req.params;

   try {
      const pool = await getConnection();
      const result = await pool
         .request()
         .input("Id", id)
         .query(selectContactById)


      if (result.recordset[0] === undefined) {
         return res.sendStatus(404);
      }

      res.send(result.recordset[0]);

   } catch (error) {
      res.status(500)
      res.send(error.message)
   }
};

export const deleteContactById = async (req, res) => {

   const { id } = req.params;

   try {
      const pool = await getConnection();
      const result = await pool
         .request()
         .input("Id", id)
         .query(removeContactById)


      res.sendStatus(204);

   } catch (error) {
      res.status(500)
      res.send(error.message)
   }
};

export const updateContactById = async (req, res) => {

   const { FirstName, LastName, Phone, userId } = req.body;
   const { id } = req.params

   let count = Object.keys(req.body).length;

   if (count < 4) {
      return res.status(400).json({ msg: 'Bad request: Please Fill all fields' });
   };

   try {
      const pool = await getConnection();
      await pool
         .request()
         .input("FirstName", sql.VarChar, FirstName)
         .input("LastName", sql.VarChar, LastName)
         .input("Phone", sql.VarChar, Phone)
         .input("userId", sql.VarChar, userId)
         .input("id", sql.Int, id)
         .query(updtContactById);

      res.json({ FirstName, LastName, Phone, userId });

   } catch (error) {
      res.status(500)
      res.send(error.message)
   };

};