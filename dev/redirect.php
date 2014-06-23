<?php
// a small utility to redirect the backbone's model saves to the API (avoids cross domain nonsense)
include 'httpful.phar';

if(isset($_GET['log']) && $_GET['log'] = 1) {

        $fpath = 'log/log.txt';
        $f = fopen($fpath, 'r');
        echo '<h1> LOG FILE </h1>';
        echo '<hr/>';
        echo '<br /><br />';

        fwrite($f, "<br/><br/>end");

        $log = file_get_contents($fpath);
        echo $log;
        fclose($f);

} else {

        $baseURL = 'http://54.88.3.200:8182/juxta';
        $route = array('/source', '/transform');
        $f = fopen('log/log.txt','a');

        fwrite($f, '<h2>' . time() . '</h2>');
        fwrite($f, "<hr/><pre>\n\n");

        $json_string = file_get_contents('php://input');  
        fwrite($f, $json_string);

        $json_array = json_decode($json_string,true);
        $json_write = print_r($json_array, true);
        
        fwrite($f, $json_write);
        fwrite($f, "\n\n");

        try{
                $call = \Httpful\Request::post($baseURL . $route[0])
                ->sendsJson()
                ->body('[' . $json_string . ']')
                ->send();

                $body = print_r($call, true);
                fwrite($f, $body);
        
        } catch(Exception $e) {

                $error = $e->getMessage();
                fwrite($f, 'nope');
        }
        
        fwrite($f, "end\n\n</pre>");
        fclose($f);
}