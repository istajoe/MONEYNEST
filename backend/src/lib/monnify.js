import axios from "axios";

const BASE = process.env.MONNIFY_BASE_URL || "https://sandbox.monnify.com";
const API_KEY = process.env.MONNIFY_API_KEY;
const SECRET = process.env.MONNIFY_SECRET_KEY;

export async function getMonnifyToken() {
  const auth = Buffer.from(`${API_KEY}:${SECRET}`).toString("base64");
  const { data } = await axios.post(
    `${BASE}/api/v1/auth/login`,
    {},
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return data.responseBody.accessToken;
}

/**
 * Reserve customer account(s)
 * payload example:
 * {
 *   accountReference: "MN-USER-<userId>",
 *   accountName: "John Doe",
 *   currencyCode: "NGN",
 *   contractCode: "<contract>",
 *   customerEmail: "john@example.com",
 *   getAllAvailableBanks: true
 * }
 */
export async function reserveAccount(payload) {
  const token = await getMonnifyToken();
  const { data } = await axios.post(
    `${BASE}/api/v1/bank-transfer/reserved-accounts`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.responseBody;
}
