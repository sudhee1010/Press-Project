import {Router} from 'express';
import { addReview } from '../controller/reviewController.js';

const reviewRouter = Router();

reviewRouter.route('/:printingUnitId').post(addReview);

export default reviewRouter;
