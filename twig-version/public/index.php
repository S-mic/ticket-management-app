<?php
require_once '../vendor/autoload.php';
session_start();
use App\Utils\Auth;
use App\Utils\TicketStorage;
use App\Utils\Validation;
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = rtrim($path, '/');
if ($path === '') $path = '/';
$routes = [
    '/' => 'home',
    '/auth/login' => 'auth_login',
    '/auth/signup' => 'auth_signup',
    '/dashboard' => 'dashboard',
    '/tickets' => 'tickets',
    '/logout' => 'logout'
];
if (isset($routes[$path])) {
    $handler = $routes[$path];
    $protectedRoutes = ['/dashboard', '/tickets'];
    if (in_array($path, $protectedRoutes) && !Auth::isAuthenticated()) { header('Location: /auth/login'); exit; }
    $authRoutes = ['/auth/login', '/auth/signup'];
    if (in_array($path, $authRoutes) && Auth::isAuthenticated()) { header('Location: /dashboard'); exit; }
    call_user_func($handler);
} else { http_response_code(404); include '../templates/404.php'; }
function home() { include '../templates/home.php'; }
function auth_login() {
    $error = ''; $email = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $email = $_POST['email'] ?? ''; $password = $_POST['password'] ?? '';
        $result = Auth::login($email, $password);
        if ($result['success']) { header('Location: /dashboard'); exit; }
        else $error = $result['error'];
    }
    include '../templates/auth/login.php';
}
function auth_signup() {
    $error = ''; $formData = ['name' => '', 'email' => '', 'password' => '', 'confirmPassword' => ''];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $formData = ['name' => $_POST['name'] ?? '', 'email' => $_POST['email'] ?? '', 'password' => $_POST['password'] ?? '', 'confirmPassword' => $_POST['confirmPassword'] ?? ''];
        if ($formData['password'] !== $formData['confirmPassword']) $error = 'Passwords do not match';
        else {
            $result = Auth::signup($formData['name'], $formData['email'], $formData['password']);
            if ($result['success']) { header('Location: /dashboard'); exit; }
            else $error = $result['error'];
        }
    }
    include '../templates/auth/signup.php';
}
function dashboard() {
    $user = Auth::getUser(); if (!$user) { header('Location: /auth/login'); exit; }
    include '../templates/dashboard.php';
}
function tickets() {
    $user = Auth::getUser(); if (!$user) { header('Location: /auth/login'); exit; }
    include '../templates/tickets.php';
}
function logout() { Auth::logout(); header('Location: /'); exit; }
?>
