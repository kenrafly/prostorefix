import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ShippingAdressForm from "./shipping-address-form";
import type { ShippingAddress } from "@/types";
import CheckOutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Provide your shipping address",
  keywords: ["shipping", "address", "checkout"],
};
const ShippingAdrresPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) throw new Error("User not found");
  const user = await getUserById(userId);

  return (
    <>
      <CheckOutSteps current={1} />
      <ShippingAdressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAdrresPage;
