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
        name varchar(50) NOT NULL, 
        default_slot_max smallint(4), 
        created timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, 
        contact_mail text NOT NULL, 
        additional_params text,
    ");

    create_crep_table("timeslots", "
        name varchar(50) NOT NULL,
        event_id int(9),
    ");

    create_crep_table("seminars", "
        name varchar(50) NOT NULL, 
        description text NOT NULL, 
        slot_max smallint(4), 
        number smallint(4), 
        timeslot_id int(9),
    ");
    
    create_crep_table("tags", "
        name varchar(50) NOT NULL,
    ");

    create_crep_table("registrations", "
        first_name varchar(50) NOT NULL,
        surname varchar(50) NOT NULL,
        contact_mail text NOT NULL, 
        registration_date timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, 
        additional_params text,
        event_id int(9),
    ");

    create_crep_table("speakers", "
        first_name varchar(50) NOT NULL,
        surname varchar(50) NOT NULL,
        description text NOT NULL, 
        path_to_picture varchar(500),
        location varchar(50),
    ");

    create_crep_table("registrations_to_seminars", "
        registration_id int(9) NOT NULL,
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

function crep_drop_tables() {
    global $wpdb;

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    $charset_collate = $wpdb->get_charset_collate() . ' engine = innoDB';

    $prefix = $wpdb->prefix . 'crep_';

    $tables = array("events", "seminars", "timeslots", "registrations", "speakers", "tags", 
                    "registrations_to_seminars", "tags_to_seminars", "speakers_to_seminars");
    foreach ($tables as &$value) {
        $value = $prefix .  $value;
    }
    unset($value);

    $sql = "DROP TABLE IF EXISTS " . implode(", ", $tables) . ";";
    dbDelta( $sql );
}

?>