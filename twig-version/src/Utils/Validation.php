<?php

namespace App\Utils;

class Validation
{
    public static function validateEmail($email)
    {
        if (empty($email)) {
            return 'Email is required';
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    public static function validatePassword($password)
    {
        if (empty($password)) {
            return 'Password is required';
        }
        if (strlen($password) < 6) {
            return 'Password must be at least 6 characters';
        }
        return '';
    }

    public static function validateName($name)
    {
        if (empty($name)) {
            return 'Name is required';
        }
        if (strlen($name) < 2) {
            return 'Name must be at least 2 characters';
        }
        return '';
    }

    public static function validateTicket($ticket)
    {
        $errors = [];
        
        if (empty(trim($ticket['title'] ?? ''))) {
            $errors['title'] = 'Title is required';
        } elseif (strlen($ticket['title']) < 3) {
            $errors['title'] = 'Title must be at least 3 characters';
        }
        
        if (empty($ticket['status'])) {
            $errors['status'] = 'Status is required';
        } elseif (!in_array($ticket['status'], ['open', 'in_progress', 'closed'])) {
            $errors['status'] = 'Invalid status value';
        }
        
        if (!empty($ticket['description']) && strlen($ticket['description']) > 1000) {
            $errors['description'] = 'Description must be less than 1000 characters';
        }
        
        return $errors;
    }
}
?><?php