// app/cart/page.tsx

import CartClient from "@/components/clientComponents/CartClient";

export default function CartPage() {
  // لا تمرر isEmpty من السيرفر — الحالة على الكلاينت
  return <CartClient />;
}
