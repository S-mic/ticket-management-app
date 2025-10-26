<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Login - Multi-Framework Tickets</title>   
 <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <div class="login-page">
        <div class="card login-card">
            <h1>Login</h1>
            
            <?php if ($error): ?>
                <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value="<?= htmlspecialchars($email) ?>"
                        class="form-input"
                        placeholder="Enter your email"
                        required
                    >
                </div>

                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        class="form-input"
                        placeholder="Enter your password"
                        required
                    >
                </div>

                <button type="submit" class="btn btn-primary login-btn">
                    Login
                </button>

                <div class="auth-link">
                    <p>
                        Don't have an account? 
                        <a href="/auth/signup">Sign up</a>
                    </p>
                </div>
            </form>

            <div class="demo-credentials">
                <p><strong>Demo Credentials:</strong></p>
                <p>Email: demo@example.com</p>
                <p>Password: password123</p>
            </div>
        </div>
    </div>
</body>
</html>