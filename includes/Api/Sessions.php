<?php
namespace CReP\Api;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Sessions extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        global $wpdb;
        $this->namespace = 'crep/v1';
        $this->rest_base = 'sessions';
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
                    'callback'            => array( $this, 'get_sessions' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_sessions' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_session' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                )
            )
        );
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)',
            array(
                array(
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => array( $this, 'update_session' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                    'args' => [
                        'id'
                    ]
                )
            )
        );
    }

    /**
     * Retrieves a collection of sessions.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_sessions($request) {
        global $wpdb;
        $response = NULL;
        if ($request["event_id"]) {
            $query = "SELECT * FROM `{$this->prefix}sessions` WHERE event_id = {$request["event_id"]}";
            $response = $wpdb->get_results($query);
        } else {
            $response = array("error" => "Keine Event ID angegeben");
        }
        return rest_ensure_response( $response );
    }

    /**
     * Deletes a collection of sessions.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_sessions($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["ids"]) {
            $ids = implode( ',', array_map( 'intval', $parameters["ids"] ) );
            $count = $wpdb->query( "DELETE FROM `{$this->prefix}sessions` WHERE id IN($ids)" );
            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Session gelöscht.");
            } else {
                $response = array("success" => "$count Sessions gelöscht!");
            }
        } else {
            $response = array("error" => "Es fehlen IDs, um Sessions zu löschen.");
        }

        return rest_ensure_response( $response );
    }


    /**
     * Creates a new session.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_session($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["name"] && $parameters["event_id"]) {
            $result = $wpdb->insert("{$this->prefix}sessions", array(
                'name' => $parameters["name"],
                'event_id' => $parameters["event_id"],
            ));
    
            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Neue Session gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie den Namen und die Event ID an!");
        }

        return rest_ensure_response( $response );
    }

    /**
     * Updates a session.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_session($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["name"]) {
            $result = $wpdb->update("{$this->prefix}sessions", array(
                'name' => $parameters["name"],
            ), array('id' => $request["id"]));
    
            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Aktualisierte Session gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie den Namen an!");
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
