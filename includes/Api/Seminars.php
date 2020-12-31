<?php

namespace CReP\Api;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Seminars extends WP_REST_Controller
{

    /**
     * [__construct description]
     */
    public function __construct()
    {
        global $wpdb;
        $this->namespace = 'crep/v1';
        $this->rest_base = 'seminars';
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
                    'callback'            => array($this, 'get_seminars'),
                    'permission_callback' => array($this, 'check_admin'),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array($this, 'delete_seminars'),
                    'permission_callback' => array($this, 'check_admin'),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array($this, 'create_seminar'),
                    'permission_callback' => array($this, 'check_admin'),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array($this, 'update_seminar'),
                    'permission_callback' => array($this, 'check_admin'),
                    'args' => [
                        'id'
                    ]
                )
            )
        );
    }

    /**
     * Retrieves a collection of seminars.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_seminars($request)
    {
        global $wpdb;
        $response = NULL;
        if ($request["event_id"]) {
            $query = "SELECT * FROM `{$this->prefix}seminars` WHERE event_id = {$request["event_id"]}";
            $response = $wpdb->get_results($query);
        } else {
            $response = array("error" => "Keine Event ID angegeben");
        }
        return rest_ensure_response($response);
    }

    /**
     * Deletes a collection of seminars.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_seminars($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["ids"]) {
            $ids = implode(',', array_map('intval', $parameters["ids"]));
            $count = $wpdb->query("DELETE FROM `{$this->prefix}seminars` WHERE id IN($ids)");
            // TODO: Einträge in lookup Tabellen löschen
            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Seminars gelöscht.");
            } else {
                $response = array("success" => "$count Seminars gelöscht!");
            }
        } else {
            $response = array("error" => "Es fehlen IDs, um Seminars zu löschen.");
        }

        return rest_ensure_response($response);
    }


    /**
     * Creates a new seminar.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_seminar($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["name"] && $parameters["session_ids"] && $parameters["event_id"]) {
            $result = $wpdb->insert("{$this->prefix}seminars", array(
                'name' => $parameters["name"],
                'description' => $parameters["description"],
                'slot_max'  => $parameters["slot_max"],
                'number'  => $parameters["number"],
                'event_id' => $parameters["event_id"]
            ));

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Neues Seminar gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Namen und die zugehörigen Session und Event IDs an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Updates an seminar.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_seminar($request)
    {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["name"] && $parameters["session_ids"]) {
            $result = $wpdb->update("{$this->prefix}seminars", array(
                'name' => $parameters["name"],
                'description' => $parameters["description"] ?: NULL,
                'slot_max'  => $parameters["slot_max"] ?: NULL,
                'number'  => $parameters["number"] ?: NULL,
            ), array('id' => $request["id"]));

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Aktualisiertes Seminar gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Namen und die zugehörigen Session IDs an!");
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
}
