import {Router} from 'express';
import { addReview } from '../controller/reviewController';

const reviewRouter = Router();

reviewRouter.route('/:printingUnitId').post(addReview);

export default reviewRouter;
