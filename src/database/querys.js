
export const querys = {
   //Contact Querys
   getAllContacts: "SELECT * FROM Contact ORDER BY FirstName, LastName",
   addNewContact: "INSERT INTO Contact (FirstName, LastName, Phone, userId) VALUES (@FirstName, @LastName, @Phone, @userId )",
   selectContactById: 'SELECT * FROM Contact WHERE Id = @Id',
   removeContactById: 'DELETE FROM Contact WHERE Id = @Id',
   updtContactById: 'UPDATE Contact SET FirstName = @FirstName, LastName = @LastName, Phone = @Phone, UserId = @userId WHERE Id = @id',

   // User Querys
   selectAllUsers: 'SELECT * FROM Users',
   selectUserById: 'SELECT * FROM Users WHERE userId = @userid',
   addNewUser: 'INSERT INTO Users (userName, password) VALUES (@userName, @password)'
}