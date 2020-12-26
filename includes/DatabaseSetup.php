<?php

global $crep_db_version;
$crep_db_version = '1.0';

function create_crep_table($name, $columns) {
    global $wpdb;
    global $crep_db_version;

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    $charset_collate = $wpdb->get_charset_collate();

    $table_name = $wpdb->prefix . 'crep_' . $name;
    $sql = "CREATE TABLE $table_name IF NOT EXISTS (
        id int(9) NOT NULL AUTO_INCREMENT, "
        . $columns .
		" PRIMARY KEY  (id)
	) $charset_collate;";
    dbDelta( $sql );
}

function crep_setup_tables() {
    create_crep_table("events", "
        name varchar(50) NOT NULL,
        default_slot_max smallint,
        created timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
        contact_mail text NOT NULL,
        additional_params text,
    ");
}

?>