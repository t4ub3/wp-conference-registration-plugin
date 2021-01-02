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
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array($this, 'get_seminar'),
                    'permission_callback' => array($this, 'check_admin'),
                    'args' => [
                        'id'
                    ]
                ),
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
        $response = [];
        if ($request["event_id"]) {
            $query = "SELECT id FROM `{$this->prefix}seminars` WHERE event_id = {$request["event_id"]}";
            $seminar_ids = $wpdb->get_results($query, "ARRAY_A");
            foreach ($seminar_ids as $seminar_id) {
                array_push($response, $this->get_seminar_with_lookups($seminar_id["id"]));
            }
        } else {
            $response = array("error" => "Kein Event angegeben");
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

            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Seminare gelöscht.");
                return rest_ensure_response($response);
            }

            $this->delete_seminar_lookups($ids);

            $response = array("success" => "$count Seminars gelöscht!");
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
            $wpdb->insert("{$this->prefix}seminars", array(
                'name' => $parameters["name"],
                'description' => $parameters["description"],
                'slot_max'  => $parameters["slot_max"],
                'number'  => $parameters["number"],
                'event_id' => $parameters["event_id"]
            ));


            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            $seminar_id = $wpdb->insert_id;
            $this->add_seminar_lookups("session", $seminar_id, $parameters["session_ids"]);

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            if ($parameters["speaker_ids"]) {
                $this->add_seminar_lookups("speaker", $seminar_id, $parameters["speaker_ids"]);
                if ($wpdb->last_error) {
                    $response = array("error" => $wpdb->last_error);
                    return rest_ensure_response($response);
                }
            }

            if ($parameters["tag_ids"]) {
                $this->add_seminar_lookups("tag", $seminar_id, $parameters["tag_ids"]);
                if ($wpdb->last_error) {
                    $response = array("error" => $wpdb->last_error);
                    return rest_ensure_response($response);
                }
            }

            $response = array("success" => "Neues Seminar gespeichert!");
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Namen und die zugehörigen Sessions und das Event an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Updates a seminar.
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
            $seminar_id = $request["id"];
            $wpdb->update("{$this->prefix}seminars", array(
                'name' => $parameters["name"],
                'description' => $parameters["description"] ?: NULL,
                'slot_max'  => $parameters["slot_max"] ?: NULL,
                'number'  => $parameters["number"] ?: NULL,
            ), array('id' => $seminar_id));

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            $this->delete_seminar_lookups(array($seminar_id));

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            $this->add_seminar_lookups("session", $seminar_id, $parameters["session_ids"]);

            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response($response);
            }

            if ($parameters["speaker_ids"]) {
                $this->add_seminar_lookups("speaker", $seminar_id, $parameters["speaker_ids"]);
                if ($wpdb->last_error) {
                    $response = array("error" => $wpdb->last_error);
                    return rest_ensure_response($response);
                }
            }

            if ($parameters["tag_ids"]) {
                $this->add_seminar_lookups("tag", $seminar_id, $parameters["tag_ids"]);
                if ($wpdb->last_error) {
                    $response = array("error" => $wpdb->last_error);
                    return rest_ensure_response($response);
                }
            }

            $response = array("success" => "Aktualisiertes Seminar gespeichert!");
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Namen und die zugehörigen Sessions an!");
        }

        return rest_ensure_response($response);
    }

    /**
     * Get a single seminar and all related data.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_seminar($request)
    {
        global $wpdb;
        $response = NULL;

        if ($request["id"]) {
            $response = $this->get_seminar_with_lookups($request["id"]);
        } else {
            $response = array("error" => "Bitte geben Sie die Seminar ID an!");
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

    /****************************************************************************************
     * HELPERS
     ****************************************************************************************/
    public function add_seminar_lookups($entity, $seminar_id, $entity_ids)
    {
        global $wpdb;

        $values = "";
        foreach ($entity_ids as $entity_id) {
            $values .= "($entity_id, $seminar_id),";
        }
        $values = substr($values, 0, -1);

        $wpdb->query("INSERT INTO {$this->prefix}{$entity}s_to_seminars
            (`{$entity}_id`, `seminar_id`)
            VALUES
            $values");
    }

    public function delete_seminar_lookups($seminar_ids)
    {
        global $wpdb;

        $seminar_ids = implode(',', array_map('intval', $seminar_ids));
        $wpdb->query("DELETE FROM `{$this->prefix}sessions_to_seminars` WHERE seminar_id IN($seminar_ids)");
        $wpdb->query("DELETE FROM `{$this->prefix}speakers_to_seminars` WHERE seminar_id IN($seminar_ids)");
        $wpdb->query("DELETE FROM `{$this->prefix}tags_to_seminars` WHERE seminar_id IN($seminar_ids)");
    }

    public function get_seminar_with_lookups($seminar_id)
    {
        global $wpdb;
        $response = NULL;

        $event_query = "SELECT * FROM `{$this->prefix}seminars` WHERE id = {$seminar_id};";
        $list = $wpdb->get_results($event_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }
        $response = $list[0];

        $sessions_query = "SELECT session_id FROM `{$this->prefix}sessions_to_seminars` WHERE seminar_id = {$seminar_id};";
        $list = $wpdb->get_results($sessions_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }

        $response["session_ids"] = array();
        foreach ($list as $session_row) {
            array_push($response["session_ids"], $session_row["session_id"]);
        }

        $speakers_query = "SELECT speaker_id FROM `{$this->prefix}speakers_to_seminars` WHERE seminar_id = {$seminar_id};";
        $list = $wpdb->get_results($speakers_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }
        $response["speaker_ids"] = array();
        foreach ($list as $speaker_row) {
            array_push($response["speaker_ids"], $speaker_row["speaker_id"]);
        }

        $tags_query = "SELECT tag_id FROM `{$this->prefix}tags_to_seminars` WHERE seminar_id = {$seminar_id};";
        $list = $wpdb->get_results($tags_query, "ARRAY_A");

        if ($wpdb->last_error) {
            $response = array("error" => $wpdb->last_error);
            return $response;
        }
        $response["tag_ids"] = array();
        foreach ($list as $tag_row) {
            array_push($response["tag_ids"], $tag_row["tag_id"]);
        }

        return $response;
    }
}
