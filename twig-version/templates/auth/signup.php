<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign Up - Multi-Framework Tickets</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <div class="signup-page">
        <div class="card signup-card">
            <h1>Sign Up</h1>
            
            <?php if ($error): ?>
                <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value="<?= htmlspecialchars($formData['name']) ?>"
                        class="form-input"
                        placeholder="Enter your full name"
                        required
                    >
                </div>

                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value="<?= htmlspecialchars($formData['email']) ?>"
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

                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        class="form-input"
                        placeholder="Confirm your password"
                        required
                    >
                </div>

                <button type="submit" class="btn btn-primary signup-btn">
                    Sign Up
                </button>

                <div class="auth-link">
                    <p>
                        Already have an account? 
                        <a href="/auth/login">Login</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</body>
</html>