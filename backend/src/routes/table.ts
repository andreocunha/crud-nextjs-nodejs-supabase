import { Router } from 'express';
import * as tableController from '../controllers/tableController';

const router = Router();

router.route('/login')
  .post(tableController.loginUser)

router.route('/:table')
  .get(tableController.getData)
  .post(tableController.postData)
  .put(tableController.putData)

router.route('/:table/:id')
  .get(tableController.getDataById)
  .delete(tableController.deleteData)

router.route('/:table/:field/:value')
  .get(tableController.getDataByField)


router.route('/').get((req, res) => {
  res.status(200).json({ message: 'API em execução' });
});

export default router;
