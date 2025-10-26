<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Multi-Framework Tickets</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <?php include 'partials/header.php'; ?>
    
    <div class="container dashboard">
        <div class="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome to your ticket management dashboard</p>
        </div>

        <div class="stats-grid">
            <div class="card text-center">
                <h3 style="color: #3b82f6"><?= $stats['total'] ?></h3>
                <p>Total Tickets</p>
            </div>
            <div class="card text-center">
                <h3 style="color: #10b981"><?= $stats['open'] ?></h3>
                <p>Open</p>
            </div>
            <div class="card text-center">
                <h3 style="color: #f59e0b"><?= $stats['in_progress'] ?></h3>
                <p>In Progress</p>
            </div>
            <div class="card text-center">
                <h3 style="color: #6b7280"><?= $stats['closed'] ?></h3>
                <p>Closed</p>
            </div>
        </div>

        <div class="card quick-actions">
            <h2>Quick Actions</h2>
            <div class="actions">
                <a href="/tickets" class="btn btn-primary">View All Tickets</a>
                <a href="/tickets?create=new" class="btn btn-secondary">Create New Ticket</a>
            </div>
        </div>
    </div>

    <?php include 'partials/footer.php'; ?>
</body>
</html>