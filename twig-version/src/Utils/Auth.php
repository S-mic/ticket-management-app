<?php
namespace App\Utils;
class Auth
{
    private const SESSION_KEY = 'ticketapp_session';
    private const TEST_USERS = [
        ['email' => 'demo@example.com', 'password' => 'password123', 'name' => 'Demo User'],
        ['email' => 'admin@example.com', 'password' => 'admin123', 'name' => 'Admin User']
    ];
    public static function login($email, $password)
    {
        foreach (self::TEST_USERS as $user) {
            if ($user['email'] === $email && $user['password'] === $password) {
                $session = [
                    'user' => ['email' => $user['email'], 'name' => $user['name']],
                    'token' => 'mock-jwt-token-' . time(),
                    'expiresAt' => time() + (24 * 60 * 60)
                ];
                $_SESSION[self::SESSION_KEY] = json_encode($session);
                return ['success' => true, 'user' => $session['user']];
            }
        }
        return ['success' => false, 'error' => 'Invalid email or password'];
    }
    public static function signup($name, $email, $password)
    {
        foreach (self::TEST_USERS as $user) {
            if ($user['email'] === $email) return ['success' => false, 'error' => 'User already exists with this email'];
        }
        $session = [
            'user' => ['email' => $email, 'name' => $name],
            'token' => 'mock-jwt-token-' . time(),
            'expiresAt' => time() + (24 * 60 * 60)
        ];
        $_SESSION[self::SESSION_KEY] = json_encode($session);
        return ['success' => true, 'user' => $session['user']];
    }
    public static function logout() { unset($_SESSION[self::SESSION_KEY]); }
    public static function getSession()
    {
        if (!isset($_SESSION[self::SESSION_KEY])) return null;
        try {
            $session = json_decode($_SESSION[self::SESSION_KEY], true);
            if ($session['expiresAt'] < time()) { self::logout(); return null; }
            return $session;
        } catch (\Exception $e) { self::logout(); return null; }
    }
    public static function isAuthenticated() { return self::getSession() !== null; }
    public static function getUser() { $session = self::getSession(); return $session ? $session['user'] : null; }
}
?>
