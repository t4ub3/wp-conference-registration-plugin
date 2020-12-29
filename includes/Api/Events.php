<?php
namespace CReP\Api;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Events extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        global $wpdb;
        $this->namespace = 'crep/v1';
        $this->rest_base = 'events';
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
                    'callback'            => array( $this, 'get_events' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                ),
                array(
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => array( $this, 'delete_events' ),
                    'permission_callback' => array( $this, 'check_admin' ),
                )
            )
        );

        // register_rest_route(
        //     $this->namespace,
        //     '/' . $this->rest_base,
        //     array(
        //         array(
        //             'methods'             => \WP_REST_Server::DELETABLE,
        //             'callback'            => array( $this, 'delete_events' ),
        //             'permission_callback' => array( $this, 'check_admin' ),
        //         )
        //     )
        // );
    }

    /**
     * Retrieves a collection of events.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function get_events() {
        global $wpdb;

        $query = "SELECT * FROM `{$this->prefix}events`";
        $list = $wpdb->get_results($query);

        return rest_ensure_response( $list );

    }

    /**
     * Deletes a collection of events.
     *
     * @param WP_REST_Request $request Full details about the request.
     *
     * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
     */
    public function delete_events($request) {
        global $wpdb;
        $response = NULL;

        $parameters = $request->get_params();
        if ($parameters["ids"]) {
            $ids = implode( ',', array_map( 'intval', $parameters["ids"] ) );
            $count = $wpdb->query( "DELETE FROM `{$this->prefix}events` WHERE id IN($ids)" );
            if ($count <= 0) {
                $response = array("error" => "Fehler beim Löschen - keine Events gelöscht.");
            } else {
                $response = array("success" => "$count Events gelöscht!");
            }
        } else {
            $response = array("error" => "Es fehlen IDs, um Events zu löschen.");
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
