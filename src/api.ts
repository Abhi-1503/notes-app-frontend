// src/api.ts (or wherever you defined sendOtp)
export const sendOtp = async (email: string, name: string, dob: string) => {
  const res = await fetch('http://localhost:5000/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, dob }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'OTP failed');
  return data;
};
