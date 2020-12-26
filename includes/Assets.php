<?php
namespace CReP;

/**
 * Scripts and Styles Class
 */
class Assets {

    function __construct() {

        if ( is_admin() ) {
            add_action( 'admin_enqueue_scripts', [ $this, 'register' ], 5 );
        } else {
            add_action( 'wp_enqueue_scripts', [ $this, 'register' ], 5 );
        }
    }

    /**
     * Register our app scripts and styles
     *
     * @return void
     */
    public function register() {
        $this->register_scripts( $this->get_scripts() );
        $this->register_styles( $this->get_styles() );
    }

    /**
     * Register scripts
     *
     * @param  array $scripts
     *
     * @return void
     */
    private function register_scripts( $scripts ) {
        foreach ( $scripts as $handle => $script ) {
            $deps      = isset( $script['deps'] ) ? $script['deps'] : false;
            $in_footer = isset( $script['in_footer'] ) ? $script['in_footer'] : false;
            $version   = isset( $script['version'] ) ? $script['version'] : CREP_VERSION;

            wp_register_script( $handle, $script['src'], $deps, $version, $in_footer );
        }
    }

    /**
     * Register styles
     *
     * @param  array $styles
     *
     * @return void
     */
    public function register_styles( $styles ) {
        foreach ( $styles as $handle => $style ) {
            $deps = isset( $style['deps'] ) ? $style['deps'] : false;

            wp_register_style( $handle, $style['src'], $deps, CREP_VERSION );
        }
    }

    /**
     * Get all registered scripts
     *
     * @return array
     */
    public function get_scripts() {
        $prefix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'crep-runtime' => [
                'src'       => CREP_ASSETS . '/js/runtime.js',
                'version'   => filemtime( CREP_PATH . '/assets/js/runtime.js' ),
                'in_footer' => true
            ],
            'crep-vendor' => [
                'src'       => CREP_ASSETS . '/js/vendors.js',
                'version'   => filemtime( CREP_PATH . '/assets/js/vendors.js' ),
                'in_footer' => true
            ],
            'crep-frontend' => [
                'src'       => CREP_ASSETS . '/js/frontend.js',
                'deps'      => [ 'jquery', 'crep-vendor', 'crep-runtime' ],
                'version'   => filemtime( CREP_PATH . '/assets/js/frontend.js' ),
                'in_footer' => true
            ],
            'crep-admin' => [
                'src'       => CREP_ASSETS . '/js/admin.js',
                'deps'      => [ 'jquery', 'crep-vendor', 'crep-runtime' ],
                'version'   => filemtime( CREP_PATH . '/assets/js/admin.js' ),
                'in_footer' => true
            ]
        ];

        return $scripts;
    }

    /**
     * Get registered styles
     *
     * @return array
     */
    public function get_styles() {

        $styles = [
            'crep-style' => [
                'src' =>  CREP_ASSETS . '/css/style.css'
            ],
            'crep-frontend' => [
                'src' =>  CREP_ASSETS . '/css/frontend.css'
            ],
            'crep-admin' => [
                'src' =>  CREP_ASSETS . '/css/admin.css'
            ],
        ];

        return $styles;
    }

}
