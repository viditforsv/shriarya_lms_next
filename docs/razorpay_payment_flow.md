# Razorpay Payment Integration - User Flow

## Overview

Users can now pay for courses using Razorpay and get automatically enrolled upon successful payment.

## Payment Flow

### 1. Browse Courses

- User visits course page: `/courses/[slug]`
- Sees course price and "Buy Now" button

### 2. Initiate Payment

- User clicks "Buy Now"
- Redirected to: `/courses/[slug]/payment`

### 3. Payment Page

- Shows course details and price
- "Pay ₹XX" button
- Clicking opens Razorpay checkout modal

### 4. Razorpay Checkout

- User enters payment details (Card/UPI/NetBanking/Wallets)
- Razorpay processes payment securely

### 5. Payment Verification

- Backend verifies payment signature (HMAC SHA256)
- Creates enrollment record in database
- Saves payment record in payments table

### 6. Success

- User redirected to course page: `/courses/[slug]?enrolled=true`
- Can now access all lessons

## API Endpoints

### `/api/payments/create-razorpay` (POST)

Creates Razorpay order

**Request:**

```json
{
  "amount": 999,
  "currency": "INR",
  "courseId": "course-uuid",
  "courseName": "Course Title"
}
```

**Response:**

```json
{
  "success": true,
  "orderId": "order_xxxxx",
  "amount": 999,
  "currency": "INR"
}
```

### `/api/payments/verify-razorpay` (POST)

Verifies payment and creates enrollment

**Request:**

```json
{
  "orderId": "order_xxxxx",
  "paymentId": "pay_xxxxx",
  "signature": "signature_xxxxx",
  "courseId": "course-uuid"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment verified successfully",
  "paymentId": "pay_xxxxx",
  "orderId": "order_xxxxx",
  "amount": 9.99,
  "currency": "INR"
}
```

## Database Records Created

### 1. courses_enrollments

```sql
INSERT INTO courses_enrollments (
  student_id,
  course_id,
  is_active,
  enrolled_at
) VALUES (
  'user-uuid',
  'course-uuid',
  true,
  NOW()
);
```

### 2. payments

```sql
INSERT INTO payments (
  user_id,
  course_id,
  amount,
  currency,
  provider,
  payment_id,
  order_id,
  status,
  metadata
) VALUES (
  'user-uuid',
  'course-uuid',
  999,
  'INR',
  'razorpay',
  'pay_xxxxx',
  'order_xxxxx',
  'completed',
  '{"razorpay_payment_id": "pay_xxxxx", ...}'
);
```

## Environment Variables Required

```env
# Backend (Server-side)
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key

# Frontend (Client-side)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

## Security Features

1. **Signature Verification**: All payments verified using HMAC SHA256
2. **Server-side Processing**: Critical operations never exposed to client
3. **Environment Variables**: Keys secured in environment
4. **CSP Headers**: Content Security Policy allows only Razorpay domains

## Testing

### Test Mode (Sandbox)

Use test keys: `rzp_test_xxxxx`

**Test Cards:**

- Card: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name

### Live Mode (Production)

Use live keys: `rzp_live_xxxxx`

**Requirements:**

- KYC verification completed on Razorpay
- Real payment cards only
- Actual money will be charged

## Test Page

Visit `/test-payment` for a simple payment test interface.

## Files Changed

1. **Frontend:**

   - `/src/app/courses/[slug]/payment/page.tsx` - Course payment page
   - `/src/app/test-payment/page.tsx` - Test payment page

2. **Backend:**

   - `/src/app/api/payments/create-razorpay/route.ts` - Order creation
   - `/src/app/api/payments/verify-razorpay/route.ts` - Payment verification

3. **Configuration:**
   - `/next.config.ts` - CSP headers for Razorpay
   - `/env.example` - Environment variables template

## Status

✅ Fully working in both test and live modes
✅ Tested with ₹10 live payment
✅ Auto-enrollment working
✅ Payment records saved to database

---

**Last Updated:** October 23, 2025
