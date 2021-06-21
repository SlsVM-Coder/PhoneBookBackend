import { Router } from 'express';

import {
   createContact,
   getContacts,
   getContactById,
   deleteContactById,
   updateContactById
} from '../controllers/contact.controller';


const router = Router();

router.get('/contact', getContacts);

router.post('/contact', createContact);

router.get('/contact/:id', getContactById)

router.delete('/contact/:id', deleteContactById)

router.put('/contact/:id', updateContactById)



export default router