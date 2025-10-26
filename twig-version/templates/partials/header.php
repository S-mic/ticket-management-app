<?php
$user = App\Utils\Auth::getUser();
$currentPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
?>
<header class="header">
    <div class="container">
        <div class="header-content">
            <a href="/dashboard" class="logo">Multi-Framework Tickets</a>
            
            <nav class="navigation">
                <?php if ($user): ?>
                    <a href="/dashboard" class="<?= $currentPath === '/dashboard' ? 'active' : '' ?>">Dashboard</a>
                    <a href="/tickets" class="<?= $currentPath === '/tickets' ? 'active' : '' ?>">Tickets</a>
                    <div class="user-info">
                        <span>Welcome, <?= htmlspecialchars($user['name']) ?></span>
                        <a href="/logout" class="btn btn-secondary">Logout</a>
                    </div>
                <?php else: ?>
                    <a href="/auth/login" class="<?= $currentPath === '/auth/login' ? 'active' : '' ?>">Login</a>
                    <a href="/auth/signup" class="<?= $currentPath === '/auth/signup' ? 'active' : '' ?>">Sign Up</a>
                <?php endif; ?>
            </nav>
        </div>
    </div>
</header>