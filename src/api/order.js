// src/api/orders.js
import { apiRequest } from "./client";

export async function createOrder(orderData) {
  return apiRequest("orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}
