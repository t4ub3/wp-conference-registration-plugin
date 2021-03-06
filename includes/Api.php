<?php
namespace CReP;

use WP_REST_Controller;

/**
 * REST_API Handler
 */
class Api extends WP_REST_Controller {

    /**
     * [__construct description]
     */
    public function __construct() {
        $this->includes();

        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    /**
     * Include the controller classes
     *
     * @return void
     */
    private function includes() {
        if ( !class_exists( __NAMESPACE__ . '\Api\Events'  ) ) {
            require_once __DIR__ . '/Api/Events.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Speakers'  ) ) {
            require_once __DIR__ . '/Api/Speakers.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Tags'  ) ) {
            require_once __DIR__ . '/Api/Tags.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Sessions'  ) ) {
            require_once __DIR__ . '/Api/Sessions.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Seminars'  ) ) {
            require_once __DIR__ . '/Api/Seminars.php';
        }
        if ( !class_exists( __NAMESPACE__ . '\Api\Registrations'  ) ) {
            require_once __DIR__ . '/Api/Registrations.php';
        }
    }

    /**
     * Register the API routes
     *
     * @return void
     */
    public function register_routes() {
        (new Api\Events())->register_routes();
        (new Api\Speakers())->register_routes();
        (new Api\Tags())->register_routes();
        (new Api\Sessions())->register_routes();
        (new Api\Seminars())->register_routes();
        (new Api\Registrations())->register_routes();
    }

}
