<?php
// a small utility to redirect the backbone's model saves to the API (avoids cross domain nonsense)
include 'httpful.phar';
// define('ABS_LOG_PATH', '../av_test_suite/log/log.txt');
// define('REL_LOG_PATH', '../log/log.txt');
define('BASE_URL', 'http://54.88.3.200:8182/juxta');

if(isset($_GET['log'])) {

        echo '<div class="row">';
        echo '<div class="col-md-8 col-md-offset-1">';
        echo '<h1> LOG FILE </h1>';
        echo '<hr/>';
        echo '<br /><br />';

        $log = file_exists('../../php/log.txt') ? file_get_contents('../../php/log.txt') : 'no log file found';
        echo $log;
        echo '</div></div>';
} else if(isset($_GET['clear'])){

    file_put_contents('log.txt', '');

} else {
       $f = fopen('log.txt','w');

        $verb = strtolower($_SERVER['REQUEST_METHOD']);
        $path_array = explode('/',$_SERVER['REQUEST_URI']);
        $path_test = end($path_array);
        $route = ((int) $path_test !== 0 || $path_test == 'public.json') 
            ? '/' . prev($path_array) . '/' .  array_pop($path_array) : '/' . array_pop($path_array);
        $json_string = file_get_contents('php://input');

        fwrite($f, '<h2>' . date(DATE_RFC2822,time()) . '</h2>');
        fwrite($f, "<hr/><pre>\n\n");
        fwrite($f, "\n\n");

		$args = array (
		        $verb,
		        $route,
		        $json_string,
		        $f
		);

        fwrite($f, print_r($args, true));

		switch($verb){
		case('post'): jws_request($args); break;
		case('get'): jws_request($args); break;
		case('put'): break;
		case('delete'): break;
		}
	        
        fwrite($f, "</pre>");
        fclose($f);
	}

function jws_request($args){

        fwrite($args[3], BASE_URL . $args[1]);
        fwrite($args[3], "\n\n");
        $body = isset($args[2]) ? '[' . $args[2] . ']' : '';

        if($args[0] == 'post'){
            try {
        
            $call = \Httpful\Request::$args[0](BASE_URL . '/public' . $args[1])
                ->sendsJson()
                ->body($body)
                ->send();

            fwrite($args[3], print_r($call, true));
            echo $call->raw_headers;

            } catch(Exception $e) {

            $error = $e->getMessage();
            fwrite($args[3], $error);
    		}
        } else if ($args[0] == 'get'){
            try {
        
            $call = \Httpful\Request::$args[0](BASE_URL . '/public' . $args[1])
                ->send();

            fwrite($args[3], print_r($call, true));
            echo $call->raw_body;
            } catch(Exception $e) {

            $error = $e->getMessage();
            fwrite($args[3], $error);
            }            
        }
}
