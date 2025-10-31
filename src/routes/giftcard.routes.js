import { Router } from 'express';
import { getWelcome, listBenefits, redeemGiftcard } from '../controllers/giftcard.controller.js';

const router = Router();

router.get('/message', getWelcome);
router.get('/benefits', listBenefits);
router.post('/redeem', redeemGiftcard);

export default router;
