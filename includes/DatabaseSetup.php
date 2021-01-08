<?php

global $crep_db_version;
$crep_db_version = '1.0';

function create_crep_table($name, $columns) {
    global $wpdb;

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

    $charset_collate = $wpdb->get_charset_collate() . ' engine = innoDB';

    $table_name = $wpdb->prefix . 'crep_' . $name;
    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id int(9) NOT NULL AUTO_INCREMENT, 
            $columns 
            PRIMARY KEY  (id)
        ) $charset_collate;";
    dbDelta( $sql );
}

function crep_setup_tables() {
    create_crep_table("events", "
        name varchar(500) NOT NULL, 
        default_slot_max smallint(4), 
        created timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, 
        contact_mail text NOT NULL, 
        additional_params text,
    ");

    create_crep_table("sessions", "
        name varchar(500) NOT NULL,
        event_id int(9) NOT NULL,
    ");

    create_crep_table("seminars", "
        name varchar(500) NOT NULL, 
        description text, 
        slot_max smallint(4), 
        number smallint(4),
        event_id int(9) NOT NULL,
    ");
    
    create_crep_table("tags", "
        name varchar(500) NOT NULL,
        event_id int(9) NOT NULL,
    ");

    create_crep_table("registrations", "
        first_name varchar(500) NOT NULL,
        surname varchar(500) NOT NULL,
        contact_mail text, 
        confirmed BOOLEAN NOT NULL DEFAULT 0,
        registration_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, 
        additional_params text,
        event_id int(9) NOT NULL,
    ");

    create_crep_table("speakers", "
        first_name varchar(500) NOT NULL,
        surname varchar(500) NOT NULL,
        description text, 
        path_to_picture varchar(500),
        location varchar(500),
    ");

    create_crep_table("sessions_to_seminars", "
        session_id int(9) NOT NULL,
        seminar_id int(9) NOT NULL,
    ");

    create_crep_table("registrations_to_seminar_in_session", "
        registration_id int(9) NOT NULL,
        session_id int(9) NOT NULL,
        seminar_id int(9) NOT NULL,
    ");

    create_crep_table("tags_to_seminars", "
        tag_id int(9) NOT NULL,
        seminar_id int(9) NOT NULL,
    ");

    create_crep_table("speakers_to_seminars", "
        speaker_id int(9) NOT NULL,
        seminar_id int(9) NOT NULL,
    ");
}



?>