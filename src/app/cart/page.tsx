"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { X, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PaymentFlow } from "@/components/payments/PaymentFlow";

export default function CartPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const { items, removeFromCart, totalPrice, itemCount, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-4">
            Please sign in to view your cart
          </p>
          <Button onClick={() => router.push("/auth")}>Sign In</Button>
        </div>
      </div>
    );
  }

  // If showing payment, render payment flow for all courses
  if (showPayment && items.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        <PaymentFlow
          amount={totalPrice}
          currency="INR"
          courseId={items.map((i) => i.courseId).join(",")} // Multiple courses
          courseTitle={`${itemCount} Courses`}
          userCountry={undefined}
          userEmail={user.email!}
          userName={
            profile ? `${profile.first_name} ${profile.last_name}` : user.email!
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/courses/discover"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-[#1e293b]">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {itemCount === 0
              ? "Your cart is empty"
              : `${itemCount} ${
                  itemCount === 1 ? "course" : "courses"
                } in cart`}
          </p>
        </div>

        {items.length === 0 ? (
          <Card className="rounded-sm">
            <CardContent className="py-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add courses to your cart to continue
              </p>
              <Link href="/courses/discover">
                <Button className="bg-[#e27447] hover:bg-[#d1653a] rounded-sm">
                  Browse Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.courseId} className="rounded-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link href={`/courses/${item.courseSlug}`}>
                          <h3 className="text-lg font-semibold hover:text-[#e27447] transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-[#e27447]">
                            ₹{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.courseId)}
                        className="rounded-sm"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="rounded-sm sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({itemCount}{" "}
                        {itemCount === 1 ? "course" : "courses"})
                      </span>
                      <span className="font-medium">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-[#e27447]">
                          ₹{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-[#e27447] hover:bg-[#d1653a] rounded-sm"
                  >
                    Proceed to Payment
                  </Button>

                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full rounded-sm"
                  >
                    Clear Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
