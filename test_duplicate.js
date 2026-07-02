async function test() {
  try {
    // 1. Login
    const loginRes = await fetch('https://application-medtech.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId: 'admin123', password: 'password123' }) // assuming default admin
    });
    
    if (!loginRes.ok) {
        console.log("Login failed", loginRes.status, await loginRes.text());
        return;
    }
    const loginData = await loginRes.json();
    const token = loginData.token;

    // 2. Add Baby
    const res = await fetch('https://application-medtech.onrender.com/api/babies', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        motherName: 'KHUSHI',
        motherAge: 25,
        gender: 'Male',
        weight: 4563,
        gestationalAge: '39W+4D',
        isTwin: false,
        termStatus: 'Term',
        dob: '2026-07-01'
      })
    });
    const text = await res.text();
    console.log("Add Baby Result:", res.status, text);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

test();
