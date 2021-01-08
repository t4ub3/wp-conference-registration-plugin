<?php
namespace CReP\Api;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Speakers extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        global $wpdb;
        $this->namespace = 'crep/v1';
        $this->rest_base = 'speakers';
        $this->prefix = $wpdb->prefix . 'crep_';
    }

    /**
     * Register the routes
     *
     * @return void
     */
    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_speakers' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_speakers' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_speaker' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => array( $this, 'get_speaker' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                    'args' => [
                        'id'
                    ]
                ),
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_speaker' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                    'args' => [
                        'id'
                    ]
                )
            )
        );
    }

    /**
     * Retrieves a collection of speakers.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_speakers() {
        global $wpdb;

        $query = "SELECT * FROM `{$this->prefix}speakers`";
        $list = $wpdb->get_results($query);

        return rest_ensure_response( $list );
    }

    /**
     * Deletes a collection of speakers.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_speakers($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["ids"]) {
            $ids = implode( ',', array_map( 'intval', $parameters["ids"] ) );
            $count = $wpdb->query( "DELETE FROM `{$this->prefix}speakers` WHERE id IN($ids)" );
            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Referenten gelöscht.");
            } else {
                $wpdb->query( "DELETE FROM `{$this->prefix}speakers_to_seminars` WHERE speaker_id IN($ids)" );
                $response = array("success" => "$count Referenten gelöscht!");
            }
        } else {
            $response = array("error" => "Es fehlen IDs, um Referenten zu löschen.");
        }

        return rest_ensure_response( $response );
    }


    /**
     * Creates a new speaker.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_speaker($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["first_name"] && $parameters["surname"]) {
            $result = $wpdb->insert("{$this->prefix}speakers", array(
                'first_name' => $parameters["first_name"],
                'surname' => $parameters["surname"],
                'description' => $parameters["description"] ?: NULL,
                'path_to_picture' => $parameters["path_to_picture"] ?: NULL,
                'location' => $parameters["location"] ?: NULL,
            ));
    
            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Neuer Referent gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Vor- und Nachnamen an!");
        }

        return rest_ensure_response( $response );
    }

    /**
     * Updates a speaker.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_speaker($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["first_name"] && $parameters["surname"]) {
            $result = $wpdb->update("{$this->prefix}speakers", array(
                'first_name' => $parameters["first_name"],
                'surname' => $parameters["surname"],
                'description' => $parameters["description"] ?: NULL,
                'path_to_picture' => $parameters["path_to_picture"] ?: NULL,
                'location' => $parameters["location"] ?: NULL,
            ), array('id' => $request["id"]));
    
            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Daten des Referenten aktualisiert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie mindestens den Vor- und Nachnamen an!");
        }

        return rest_ensure_response( $response );
    }

    /**
     * Get a single speaker and all related data.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_speaker($request) {
        global $wpdb;
        $response = NULL;

        if ($request["id"]) {
            $speaker_id = intval($request["id"]);
            $event_query = "SELECT * FROM `{$this->prefix}speakers` WHERE id = {$speaker_id};";
            $list = $wpdb->get_results($event_query, "ARRAY_A");
    
            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
                return rest_ensure_response( $response );
            }
            $response = $list[0];
        } else {
            $response = array("error" => "Bitte geben Sie die Speaker ID an!");
        }

        return rest_ensure_response( $response );
    }


    /****************************************************************************************
    * API ACCESS PERMISSION CHECKS
    ****************************************************************************************/
   public function check_admin() {
       return current_user_can('administrator');
   }
}
