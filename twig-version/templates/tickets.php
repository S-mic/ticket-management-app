<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Management - TicketFlow</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <?php include 'partials/header.php'; ?>
    
    <div class="container ticket-management">
        <div class="page-header">
            <div>
                <h1>Ticket Management</h1>
                <p>Create, view, and manage your support tickets</p>
            </div>
            
            <?php if (!isset($_GET['create']) && !isset($_GET['edit'])): ?>
                <a href="/tickets?create=new" class="btn btn-primary">Create New Ticket</a>
            <?php endif; ?>
        </div>

        <?php if ($success): ?>
            <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>

        <?php if ($error): ?>
            <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <?php if (isset($_GET['create']) || isset($_GET['edit'])): ?>
            <!-- Ticket Form -->
            <form method="POST" class="card">
                <h2><?= isset($_GET['edit']) ? 'Edit Ticket' : 'Create New Ticket' ?></h2>
                
                <?php if (isset($_GET['edit'])): ?>
                    <input type="hidden" name="id" value="<?= htmlspecialchars($editingTicket['id'] ?? '') ?>">
                    <input type="hidden" name="action" value="update">
                <?php else: ?>
                    <input type="hidden" name="action" value="create">
                <?php endif; ?>
                
                <div class="form-group">
                    <label class="form-label">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value="<?= htmlspecialchars($editingTicket['title'] ?? '') ?>"
                        class="form-input"
                        placeholder="Enter ticket title"
                        required
                    >
                </div>

                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea
                        name="description"
                        class="form-input"
                        rows="4"
                        placeholder="Enter ticket description"
                    ><?= htmlspecialchars($editingTicket['description'] ?? '') ?></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Status *</label>
                    <select name="status" class="form-select" required>
                        <option value="">Select Status</option>
                        <option value="open" <?= ($editingTicket['status'] ?? '') === 'open' ? 'selected' : '' ?>>Open</option>
                        <option value="in_progress" <?= ($editingTicket['status'] ?? '') === 'in_progress' ? 'selected' : '' ?>>In Progress</option>
                        <option value="closed" <?= ($editingTicket['status'] ?? '') === 'closed' ? 'selected' : '' ?>>Closed</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Priority</label>
                    <select name="priority" class="form-select">
                        <option value="low" <?= ($editingTicket['priority'] ?? 'medium') === 'low' ? 'selected' : '' ?>>Low</option>
                        <option value="medium" <?= ($editingTicket['priority'] ?? 'medium') === 'medium' ? 'selected' : '' ?>>Medium</option>
                        <option value="high" <?= ($editingTicket['priority'] ?? 'medium') === 'high' ? 'selected' : '' ?>>High</option>
                    </select>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        <?= isset($_GET['edit']) ? 'Update Ticket' : 'Create Ticket' ?>
                    </button>
                    <a href="/tickets" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        <?php else: ?>
            <!-- Ticket List -->
            <div class="grid">
                <?php if (empty($tickets)): ?>
                    <div class="card text-center">
                        <p>No tickets found.</p>
                        <p>Create your first ticket to get started!</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($tickets as $ticket): ?>
                        <div class="card">
                            <div class="ticket-header">
                                <h3><?= htmlspecialchars($ticket['title']) ?></h3>
                                <span class="status-badge status-<?= $ticket['status'] ?>">
                                    <?= str_replace('_', ' ', $ticket['status']) ?>
                                </span>
                            </div>
                            
                            <?php if (!empty($ticket['description'])): ?>
                                <p class="ticket-description">
                                    <?= htmlspecialchars($ticket['description']) ?>
                                </p>
                            <?php endif; ?>
                            
                            <div class="ticket-footer">
                                <div class="ticket-meta">
                                    <div>Priority: <?= $ticket['priority'] ?></div>
                                    <div>Created: <?= date('M j, Y', strtotime($ticket['createdAt'])) ?></div>
                                </div>
                                
                                <div class="ticket-actions">
                                    <a href="/tickets?edit=<?= $ticket['id'] ?>" class="btn btn-secondary">Edit</a>
                                    <form method="POST" style="display: inline;">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="id" value="<?= $ticket['id'] ?>">
                                        <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this ticket?')">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>

    <?php include 'partials/footer.php'; ?>
</body>
</html>