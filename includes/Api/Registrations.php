<?php

namespace CReP\Api;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Registrations extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        global $wpdb;
        $this->namespace = 'crep/v1';
        $this->rest_base = 'registrations';
        $this->prefix = $wpdb->prefix . 'crep_';
    }

    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_registrations'),
                    'permission_callback' => array($this, 'check_admin'),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array($this, 'delete_registrations'),
                    'permission_callback' => array($this, 'check_admin'),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array($this, 'create_registration'),
                    'permission_callback' => array($this, 'check_admin'),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_registration'),
                    'permission_callback' => array($this, 'check_admin'),
                    'args' => [
                        'id'
                    ]
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array($this, 'update_registration'),
                    'permission_callback' => array($this, 'check_admin'),
                    'args' => [
                        'id'
                    ]
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/validate',
            array(
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array($this, 'create_registration_validate'),
                    'permission_callback' => array($this, 'check_frontend'),
                )
            )
        );
    }

    /**
     * Retrieves a collection of registrations.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_registrations($request)
    {
        global $wpdb;
        $response = [];
        if ($request["event_id"]) {
            $event_id = intval($request["event_id"]);
            $query = "SELECT id FROM `{$this->prefix}registrations` WHERE event_id = {$event_id}";
            $registration_ids = $wpdb->get_results($query, "ARRAY_A");
            foreach ($registration_ids as $registration_id) {
                array_push($response, $this->get_registration_with_lookups($registration_id["id"]));
            }
        } else {
            $response = array("error" => "Kein Event angegeben");
        }

        return rest_ensure_response($response);
    }

    /**
     * Deletes a collection of registrations.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_registrations($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["ids"]) {
            $ids = implode(',', array_map('intval', $parameters["ids"]));
            $count = $wpdb->query("DELETE FROM `{$this->prefix}registrations` WHERE id IN($ids)");

            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Anmeldungen gelöscht.");
                return rest_ensure_response($response);
            }

            $this->delete_registration_lookups($ids);

            $response = array("success" => "$count Anmeldungen gelöscht!");
        } else {
            $response = array("error" => "Es fehlen IDs, um Anmeldungen zu löschen.");
        }

        return rest_ensure_response($response);
    }


    /**
     * Creates a new registration.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_registration($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["first_name"] && $parameters["surname"] && $parameters["event_id"]) {
            $wpdb->insert("{$this->prefix}registrations", array(
                'first_name' => $parameters["first_name"],
                'surname' => $parameters["surname"],
                'contact_mail'  => $parameters["contact_mail"] ?: NULL,
                'confirmed'  => $parameters["confirmed"] ?: 0,
                'additional_params' => $parameters["additional_params"],
                'event_id' => $parameters["event_id"]
            ));


            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            $registration_id = $wpdb->insert_id;
            if ($parameters["seminars"]) {
                $this->add_registration_lookups($registration_id, $parameters["seminars"]);

                if ($wpdb->last_error) {
                    $response = array("error" => $wpdb->last_error);
                    return rest_ensure_response($response);
                }
            }

            $response = array("success" => "Neue Anmeldung gespeichert!", "id" => $registration_id);
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Namen, Vornamen und das Event an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Updates a registration.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_registration($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["first_name"] && $parameters["surname"]) {
            $registration_id = intval($request["id"]);
            $wpdb->update("{$this->prefix}registrations", array(
                'first_name' => $parameters["first_name"],
                'surname' => $parameters["surname"],
                'contact_mail'  => $parameters["contact_mail"] ?: NULL,
                'confirmed'  => $parameters["confirmed"] ?: 1,
                'additional_params' => $parameters["additional_params"],
            ), array('id' => $registration_id));

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            $registration_ids = implode(',', array_map('intval', array($registration_id)));
            $this->delete_registration_lookups($registration_ids);

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            if ($parameters["seminars"]) {
                $this->add_registration_lookups($registration_id, $parameters["seminars"]);
                if ($wpdb->last_error) {
                    $response = array("error" => $wpdb->last_error);
                    return rest_ensure_response($response);
                }
            }

            $response = array("success" => "Aktualisierte Anmeldung gespeichert!");
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Namen und den Vornamen an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Get a single registration and all related data.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_registration($request)
    {
        global $wpdb;
        $response = NULL;

        if ($request["id"]) {
            $response = $this->get_registration_with_lookups($request["id"]);
        } else {
            $response = array("error" => "Bitte geben Sie die Anmeldung an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Creates a new registration with validation (for public use).
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_registration_validate($request) {
        global $wpdb;
        $parameters = $request->get_params();
        if (!$parameters["consent"]) {
            return rest_ensure_response(array("error" => "Bitte bestätige den Hinweis zum Datenschutz, um dich anzumelden!"));
        }
        if (!$parameters["contact_mail"]) {
            return rest_ensure_response(array("error" => "Bitte gib deine E-Mail-Adresse an, um dich anzumelden!"));
        }
        if (intval($parameters["number_one"]) + intval($parameters["number_two"]) != intval($parameters["result"])) {
            return rest_ensure_response(array("error" => "Bitte gib die korrekte Summe an, um zu bestätigen, dass du kein Roboter bist."));
        }
        $event_id = intval($parameters["event_id"]);
        $event_query = "SELECT * FROM `{$this->prefix}events` WHERE id = {$event_id};";
        $list = $wpdb->get_results($event_query, "ARRAY_A");
        if (count($list) < 1) {
            return rest_ensure_response(array("error" => "Die Anmeldung konnte keinem Event zugeordnet werden."));
        }
        $event = $list[0];
        if (isset($event["additional_params"]) && $event["additional_params"] != "") {
            $additional_fields = json_decode($event["additional_params"]);
            $additional_fields_params = json_decode($parameters["additional_params"], true);
            foreach ($additional_fields as $field) {
                if (isset($field->required) && $field->required == true && !$additional_fields_params[$field->code]) {
                    return rest_ensure_response(array("error" => "Das Feld {$field->name} ist ein Pflichtfeld und muss angegeben werden!"));
                }
            }
        }

        $response = $this->create_registration($request);

        if (isset($response->data["success"])) {
            $mail = "Liebe(r) {$parameters["first_name"]},\n du hast dich für {$event["name"]} angemeldet.\n\n";

            if ($parameters["seminars"] && sizeof($parameters["seminars"]) > 0) {
                $mail .= "Folgende Seminare hast du ausgewählt:\n";
                foreach ($parameters["seminars"] as $seminar) {
                    $session_id = intval($seminar["session_id"]);
                    $seminar_id = intval($seminar["seminar_id"]);
                    $seminar_session_query = "SELECT seminars.name as seminar_name, sessions.name as session_name 
                        FROM {$this->prefix}sessions_to_seminars as lookup
                        LEFT JOIN {$this->prefix}seminars as seminars ON seminars.id = lookup.seminar_id
                        LEFT JOIN {$this->prefix}sessions as sessions ON sessions.id = lookup.session_id
                        WHERE lookup.seminar_id = $seminar_id AND lookup.session_id = $session_id;";
                    $seminar_session = $wpdb->get_results($seminar_session_query, "ARRAY_A");
                    if (sizeof($seminar_session) > 0) {
                        $mail .= " - {$seminar_session[0]["session_name"]}: {$seminar_session[0]["seminar_name"]}\n";
                    }
                }
                $mail .= "\n\n";
            }

            $mail .= "Deine Anmeldung muss noch von uns bestätigt werden " .
                    "- sobald das geschehen ist, bekommst du eine Bestätigung per E-Mail.\n\n" .
                    "Danke für deine Anmeldung - Wir freuen uns auf dich!";
            $domain = $_SERVER['HTTP_HOST'];
            $headers = "From: {$event["name"]} <no-reply@{$domain}>";
            wp_mail($parameters["contact_mail"], "Deine Anmeldung für {$event["name"]}", $mail, $headers);
            
            $admin_mail = "{$parameters["first_name"]} {$parameters["surname"]} hat sich für {$event["name"]} angemeldet.\n\n" . 
            "Klicke auf folgenden Link, um die Anmeldung anzuschauen und ggf. zu bestätigen:\n";
            $registration_id = $response->data["id"];
            $url = get_bloginfo('wpurl');
            $admin_mail .= "{$url}/wp-admin/admin.php?page=crep&confirm_registration={$registration_id}&event_id={$event["id"]}";
                    
            wp_mail($event["contact_mail"], "Neue Anmeldung für {$event["name"]}", $admin_mail, $headers);
        }
        
        return $response;
    }

    /****************************************************************************************
     * API ACCESS PERMISSION CHECKS
     ****************************************************************************************/
    public function check_admin()
    {
        return current_user_can('administrator');
    }
    public function check_frontend()
    {
        return true;
    }

    /****************************************************************************************
     * HELPERS
     ****************************************************************************************/
    public function add_registration_lookups($registration_id, $seminars)
    {
        global $wpdb;

        $values = "";
        foreach ($seminars as $seminar) {
            $session_id = intval($seminar["session_id"]);
            $seminar_id = intval($seminar["seminar_id"]);
            $values .= "($registration_id, $session_id, $seminar_id),";
        }
        $values = substr($values, 0, -1);

        $wpdb->query("INSERT INTO {$this->prefix}registrations_to_seminar_in_session
            (`registration_id`, `session_id`, `seminar_id`)
            VALUES
            $values");
    }

    public function delete_registration_lookups($registration_ids)
    {
        global $wpdb;
        $wpdb->query("DELETE FROM `{$this->prefix}registrations_to_seminar_in_session` WHERE registration_id IN($registration_ids)");
    }

    public function get_registration_with_lookups($registration_id)
    {
        global $wpdb;
        $response = NULL;
        $registration_id = intval($registration_id);
        $event_query = "SELECT * FROM `{$this->prefix}registrations` WHERE id = {$registration_id};";
        $list = $wpdb->get_results($event_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }
        $response = $list[0];

        $registration_seminars_query = "SELECT session_id, seminar_id FROM `{$this->prefix}registrations_to_seminar_in_session` WHERE registration_id = {$registration_id};";
        $registration_seminars_ids = $wpdb->get_results($registration_seminars_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }

        $response["seminars"] = $registration_seminars_ids;

        return $response;
    }
}
