<?php
namespace CReP\Api;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Tags extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        global $wpdb;
        $this->namespace = 'crep/v1';
        $this->rest_base = 'tags';
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
                    'callback'            => array( $this, 'get_tags' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_tags' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                ),
                array(
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => array( $this, 'create_tag' ),
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
                    'callback'            => array( $this, 'update_tag' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                    'args' => [
                        'id'
                    ]
                )
            )
        );
    }

    /**
     * Retrieves a collection of tags.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_tags($request) {
        global $wpdb;
        $response = NULL;
        if ($request["event_id"]) {
            $query = "SELECT * FROM `{$this->prefix}tags` WHERE event_id = {$request["event_id"]}";
            $response = $wpdb->get_results($query);
        } else {
            $response = array("error" => "Keine Event ID angegeben");
        }
        return rest_ensure_response( $response );
    }

    /**
     * Deletes a collection of tags.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_tags($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["ids"]) {
            $ids = implode( ',', array_map( 'intval', $parameters["ids"] ) );
            $count = $wpdb->query( "DELETE FROM `{$this->prefix}tags` WHERE id IN($ids)" );
            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Tags gelöscht.");
            } else {
                $response = array("success" => "$count Tags gelöscht!");
            }
        } else {
            $response = array("error" => "Es fehlen IDs, um Tags zu löschen.");
        }

        return rest_ensure_response( $response );
    }


    /**
     * Creates a new tag.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function create_tag($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["name"] && $parameters["event_id"]) {
            $result = $wpdb->insert("{$this->prefix}tags", array(
                'name' => $parameters["name"],
                'event_id' => $parameters["event_id"],
            ));
    
            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Neues Tag gespeichert!", "result" => $result);
            }
        } else {
            $response = array("error" => "Bitte geben Sie den Namen und die Event ID an!");
        }

        return rest_ensure_response( $response );
    }

    /**
     * Updates a tag.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function update_tag($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["name"]) {
            $result = $wpdb->update("{$this->prefix}tags", array(
                'name' => $parameters["name"],
            ), array('id' => $request["id"]));
    
            if ($wpdb->last_error) {
                $response = array("error" => $wpdb->last_error);
            } else {
                $response = array("success" => "Aktualisiertes Tag gespeichert!", "result" => $result);
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
