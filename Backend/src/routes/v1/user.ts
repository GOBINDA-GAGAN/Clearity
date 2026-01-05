import { Request, Response, Router } from "express";
import { param, body, query } from "express-validator";


import { authenticate } from "@/middleware/authenticate";
// import { ValidationError } from "@/Middleware/validatorError";

import { User } from "@/models/user";
import { authorize } from "@/middleware/authorize";
import { getCurrentUser } from "@/controllers/v1/user/get_Current_User";
import { updateCurrentUser } from "@/controllers/v1/user/updata_Current_User";
import { deleteCurrentUser } from "@/controllers/v1/user/delete_Current_User";
import { getAllUser } from "@/controllers/v1/user/get_All_User";
import { getUserById } from "@/controllers/v1/user/get_User_By_Id";
import { deleteUserById } from "@/controllers/v1/user/delete_User_By_Id";

const router = Router();

router.delete('/current',authenticate,authorize(['user','admin']),deleteCurrentUser)
router.get('/current',authenticate,authorize(['user','admin']),getCurrentUser)
router.put('/current',authenticate,authorize(['user','admin']),updateCurrentUser)
router.get('/:userId',authenticate,authorize(['admin']),getUserById)
router.delete('/:userId',authenticate,authorize(['admin']),deleteUserById)
router.get('/',authenticate,authorize(['admin']),getAllUser)


export default router;