export async function POST() {
  const response = Response.json({ message: 'Logged out' });
  (response.headers as Headers).set(
    'Set-Cookie',
    'auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
  );
  return response;
}
