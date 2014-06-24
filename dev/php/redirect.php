<?php
// a small utility to redirect the backbone's model saves to the API (avoids cross domain nonsense)
include 'httpful.phar';

define('LOG_PATH', '../log/log.txt');
define('BASE_URL', 'http://54.88.3.200:8182/juxta');

if(isset($_GET['log']) && $_GET['log'] = 1) {
        echo '<h1> LOG FILE </h1>';
        echo '<hr/>';
        echo '<br /><br />';

        fwrite(LOG_PATH, "<br/><br/>end");

        $log = file_get_contents($fpath);
        echo $log;
} else {
       $f = fopen(LOG_PATH,'a');

        $verb = strtolower($_SERVER['REQUEST_METHOD']);
        $path_array = explode('/',$_SERVER['REQUEST_URI']);
        $id = (int) end($path_array);
        $route = ($id !== 0) ? prev($path_array) . '/' .  array_pop($path_array) : '/' . array_pop($path_array);
        $json_string = file_get_contents('php://input');

        fwrite($f, '<h2>' . date(DATE_RFC2822,time()) . '</h2>');
        fwrite($f, "<hr/><pre>\n\n");
        fwrite($f, $_SERVER['REQUEST_URI']);
        fwrite($f, $json_string);
        fwrite($f, "\n\n");

		$args = array (
		        $verb,
		        $route,
		        $json_string,
		        $f
		);

		switch($verb){
		case('post'): jws_request($args); break;
		case('get'): jws_request($args); break;
		case('put'): break;
		case('delete'): break;
		}
	        
        fwrite($f, "end\n\n</pre>");
        fclose($f);
	}

function jws_request($args){

        fwrite($args[3], BASE_URL . $args[1]);
        fwrite($args[3], "\n\n");

        try {
        $call = \Httpful\Request::$args[0](BASE_URL . $args[1]);
        if($args[0] == 'post') { $call->sendsJson()->body('[' . $args[2] . ']'); }
        $call->send();
        $body = print_r($call, true);
        fwrite($args[3], $body);

      } catch(Exception $e) {

        $error = $e->getMessage();
        fwrite($args[3], $e);
		}
}
