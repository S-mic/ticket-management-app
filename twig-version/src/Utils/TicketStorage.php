<?php

namespace App\Utils;

class TicketStorage
{
    private const TICKETS_KEY = 'ticketapp_tickets';

    public static function getTickets()
    {
        if (!isset($_SESSION[self::TICKETS_KEY])) {
            return [];
        }

        try {
            return json_decode($_SESSION[self::TICKETS_KEY], true) ?: [];
        } catch (\Exception $e) {
            return [];
        }
    }

    public static function saveTickets($tickets)
    {
        $_SESSION[self::TICKETS_KEY] = json_encode($tickets);
    }

    public static function createTicket($ticketData)
    {
        $tickets = self::getTickets();
        $newTicket = [
            'id' => (string) time(),
            'createdAt' => date('c'),
            'updatedAt' => date('c'),
            'title' => $ticketData['title'] ?? '',
            'description' => $ticketData['description'] ?? '',
            'status' => $ticketData['status'] ?? 'open',
            'priority' => $ticketData['priority'] ?? 'medium'
        ];
        
        $tickets[] = $newTicket;
        self::saveTickets($tickets);
        return $newTicket;
    }

    public static function updateTicket($id, $updates)
    {
        $tickets = self::getTickets();
        foreach ($tickets as &$ticket) {
            if ($ticket['id'] === $id) {
                $ticket = array_merge($ticket, $updates, ['updatedAt' => date('c')]);
                self::saveTickets($tickets);
                return $ticket;
            }
        }
        return null;
    }

    public static function deleteTicket($id)
    {
        $tickets = self::getTickets();
        $filteredTickets = array_filter($tickets, function($ticket) use ($id) {
            return $ticket['id'] !== $id;
        });
        self::saveTickets(array_values($filteredTickets));
        return true;
    }

    public static function getTicket($id)
    {
        $tickets = self::getTickets();
        foreach ($tickets as $ticket) {
            if ($ticket['id'] === $id) {
                return $ticket;
            }
        }
        return null;
    }
}
?>