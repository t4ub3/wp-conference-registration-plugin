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
                    'permission_callback' => array($this, 'check_frontend'),
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
            $query = "SELECT id FROM `{$this->prefix}registrations` WHERE event_id = {$request["event_id"]}";
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

            $response = array("success" => "Neue Anmeldung gespeichert!");
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
            $registration_id = $request["id"];
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
            $query = "SELECT id FROM `{$this->prefix}sessions_to_seminars` WHERE session_id = {$seminar["session_id"]} AND seminar_id = {$seminar["seminar_id"]}";
            $session_to_seminar_id = $wpdb->get_results($query, "ARRAY_A")[0];

            $values .= "($registration_id, {$session_to_seminar_id['id']}),";
        }
        $values = substr($values, 0, -1);

        $wpdb->query("INSERT INTO {$this->prefix}registrations_to_seminar_in_session
            (`registration_id`, `session_to_seminar_id`)
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

        $event_query = "SELECT * FROM `{$this->prefix}registrations` WHERE id = {$registration_id};";
        $list = $wpdb->get_results($event_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }
        $response = $list[0];

        $registration_seminars_query = "SELECT session_to_seminar_id FROM `{$this->prefix}registrations_to_seminar_in_session` WHERE registration_id = {$registration_id};";
        $registration_seminars_ids = $wpdb->get_results($registration_seminars_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }

        $response["seminars"] = array();

        foreach ($registration_seminars_ids as $registration_seminars_id) {
            $session_to_seminar_id = $registration_seminars_id["session_to_seminar_id"];
            $seminar_sessions_query = "SELECT session_id, seminar_id FROM `{$this->prefix}sessions_to_seminars` WHERE id = {$session_to_seminar_id};";
            $list_session_to_seminar_ids = $wpdb->get_results($seminar_sessions_query, "ARRAY_A");
            array_push($response["seminars"], $list_session_to_seminar_ids[0]);
        }

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }

        return $response;
    }
}
