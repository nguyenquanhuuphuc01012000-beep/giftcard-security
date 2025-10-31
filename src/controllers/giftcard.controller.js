import { z } from 'zod';

const redeemSchema = z.object({
  code: z.string().min(6, 'Mã phải >= 6 ký tự'),
  userEmail: z.string().email('Email không hợp lệ'),
});

export const getWelcome = (req, res) => {
  res.json({ message: 'Chào mừng bạn đến Gift Card An Ninh Mạng!', version: '1.0.0' });
};

export const listBenefits = (_req, res) => {
  res.json([
    'Truy cập nội dung học tập về an ninh mạng',
    'Tích hợp thanh toán bảo mật cao',
    'Nâng cao hiểu biết phòng tránh rủi ro trực tuyến',
    'Món quà ý nghĩa cho bạn và người thân',
  ]);
};

export const redeemGiftcard = (req, res, next) => {
  try {
    const data = redeemSchema.parse(req.body);
    // TODO: xử lý thực (DB, xác thực code, ...)
    res.json({ ok: true, message: `Redeem thành công mã ${data.code} cho ${data.userEmail}` });
  } catch (err) {
    err.status = 400;
    next(err);
  }
};
