<?php

namespace CReP;

/**
 * Frontend Pages Handler
 */
class Frontend
{

    public function __construct()
    {
        add_shortcode('crep-seminar-list', [$this, 'render_seminar_list']);
        add_shortcode('crep-registration-form', [$this, 'render_registration_form']);
    }

    /**
     * Render list of all seminars for one event
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_seminar_list($atts, $content = '')
    {
        wp_enqueue_style('crep-frontend');
        wp_enqueue_script('crep-frontend');

        // localize data for script
        wp_localize_script('crep-frontend', 'crep', array(
            'rest_url' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest')
        ));

        $attributes = shortcode_atts(array(
            'event_id' => 1
        ), $atts);

        $content .= "<div id='crep-seminar-list' data-event-id='{$attributes["event_id"]}'></div>";

        return $content;
    }

    /**
     * Render registration form for one event
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
    public function render_registration_form($atts, $content = '')
    {
        wp_enqueue_style('crep-frontend');
        wp_enqueue_style('crep-vendors');
        wp_enqueue_script('crep-frontend');

        // localize data for script
        wp_localize_script('crep-frontend', 'crep', array(
            'rest_url' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest')
        ));

        $attributes = shortcode_atts(array(
            'event_id' => 1,
            'redirect_url' => '/'
        ), $atts);

        $content .= "<div id='crep-registration-form' data-event-id='{$attributes["event_id"]}' data-redirect-url='{$attributes["redirect_url"]}'></div>";

        return $content;
    }
}
