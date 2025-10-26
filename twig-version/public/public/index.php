<?php
require_once '../vendor/autoload.php';

session_start();

use App\Utils\Auth;

// Simple routing
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Remove trailing slash
$path = rtrim($path, '/');

// Route definitions
$routes = [
    '/' => 'home',
    '/auth/login' => 'auth_login',
    '/auth/signup' => 'auth_signup',
    '/dashboard' => 'dashboard',
    '/tickets' => 'tickets',
    '/logout' => 'logout'
];

// Check if route exists
if (isset($routes[$path])) {
    $handler = $routes[$path];
    
    // Check authentication for protected routes
    $protectedRoutes = ['/dashboard', '/tickets'];
    if (in_array($path, $protectedRoutes) && !Auth::isAuthenticated()) {
        header('Location: /auth/login');
        exit;
    }
    
    // Check if already authenticated for auth routes
    $authRoutes = ['/auth/login', '/auth/signup'];
    if (in_array($path, $authRoutes) && Auth::isAuthenticated()) {
        header('Location: /dashboard');
        exit;
    }
    
    call_user_func($handler);
} else {
    http_response_code(404);
    include '../templates/404.php';
}

function home() {
    include '../templates/home.php';
}

function auth_login() {
    $error = '';
    $email = '';
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $result = App\Utils\Auth::login($email, $password);
        if ($result['success']) {
            header('Location: /dashboard');
            exit;
        } else {
            $error = $result['error'];
        }
    }
    
    include '../templates/auth/login.php';
}

function auth_signup() {
    $error = '';
    $formData = [
        'name' => '',
        'email' => '',
        'password' => '',
        'confirmPassword' => ''
    ];
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $formData = [
            'name' => $_POST['name'] ?? '',
            'email' => $_POST['email'] ?? '',
            'password' => $_POST['password'] ?? '',
            'confirmPassword' => $_POST['confirmPassword'] ?? ''
        ];
        
        if ($formData['password'] !== $formData['confirmPassword']) {
            $error = 'Passwords do not match';
        } else {
            $result = App\Utils\Auth::signup($formData['name'], $formData['email'], $formData['password']);
            if ($result['success']) {
                header('Location: /dashboard');
                exit;
            } else {
                $error = $result['error'];
            }
        }
    }
    
    include '../templates/auth/signup.php';
}

function dashboard() {
    $user = App\Utils\Auth::getUser();
    $tickets = App\Utils\TicketStorage::getTickets();
    
    $stats = [
        'total' => count($tickets),
        'open' => count(array_filter($tickets, fn($t) => $t['status'] === 'open')),
        'in_progress' => count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress')),
        'closed' => count(array_filter($tickets, fn($t) => $t['status'] === 'closed'))
    ];
    
    include '../templates/dashboard.php';
}

function tickets() {
    $user = App\Utils\Auth::getUser();
    $tickets = App\Utils\TicketStorage::getTickets();
    $error = '';
    $success = '';
    
    // Handle form submissions
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'] ?? '';
        
        if ($action === 'create' || $action === 'update') {
            $ticketData = [
                'title' => $_POST['title'] ?? '',
                'description' => $_POST['description'] ?? '',
                'status' => $_POST['status'] ?? 'open',
                'priority' => $_POST['priority'] ?? 'medium'
            ];
            
            $errors = App\Utils\Validation::validateTicket($ticketData);
            
            if (empty($errors)) {
                if ($action === 'create') {
                    App\Utils\TicketStorage::createTicket($ticketData);
                    $success = 'Ticket created successfully!';
                } else {
                    $id = $_POST['id'] ?? '';
                    App\Utils\TicketStorage::updateTicket($id, $ticketData);
                    $success = 'Ticket updated successfully!';
                }
                
                // Refresh tickets
                $tickets = App\Utils\TicketStorage::getTickets();
            } else {
                $error = 'Please fix the errors below';
            }
        } elseif ($action === 'delete') {
            $id = $_POST['id'] ?? '';
            App\Utils\TicketStorage::deleteTicket($id);
            $success = 'Ticket deleted successfully!';
            $tickets = App\Utils\TicketStorage::getTickets();
        }
    }
    
    $editingTicket = null;
    if (isset($_GET['edit'])) {
        $editingTicket = App\Utils\TicketStorage::getTicket($_GET['edit']);
    }
    
    include '../templates/tickets.php';
}

function logout() {
    App\Utils\Auth::logout();
    header('Location: /');
    exit;
}
?><?php