import { Review } from '../model/reviewSchema.js';
import { printingPressunit } from '../model/printingPressunit.js';

const addReview = async (req, res) => {
  try {
    const { customerName, comment, rating } = req.body;
    const { printingUnitId } = req.params;

    const newReview = await Review.create({
      customerName,
      comment,
      rating,
      printingUnit: printingUnitId
    });

    // Optional: push review to printing unit
    await printingPressunit.findByIdAndUpdate(printingUnitId, {
      $push: { reviews: newReview._id }
    });

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Error creating review', details: err.message });
  }
};

export {addReview}
