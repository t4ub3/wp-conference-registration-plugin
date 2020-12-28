<?php

if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}
  
delete_option( 'crep_version' );

global $wpdb;

$prefix = $wpdb->prefix . 'crep_';

$tables = array("events", "seminars", "timeslots", "registrations", "speakers", "tags", 
                "registrations_to_seminars", "tags_to_seminars", "speakers_to_seminars");
foreach ($tables as &$value) {
    $value = $prefix . $value;
}
unset($value);

$wpdb->query( "DROP TABLE IF EXISTS " . implode(", ", $tables) . ";" );
