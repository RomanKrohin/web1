<?php
    require "utils.php";
    $initial_time = microtime(true);
    $x= number_format(2, floatval($_GET["x_field"]));
    $y= number_format(2, floatval($_GET["y_field"]));
    $R= number_format(2, floatval($_GET["R_field"]));
    $executionTime = $initial_time - $_SERVER['REQUEST_TIME'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        http_response_code(403);
        exit('Forbidden');
    }

    if (privioslyValidateData($x, $y, $R)){
        $result=validateData($x, $y, $R);

        if ($result){
            $answer="true";
        }
        else{
            $answer="false";
        }

        $data= array('collision' => $answer, 'exectime' => $executionTime);

        echo json_encode($data);
        http_response_code(201);
    }else{
        echo json_encode(array('collision' => "Wrong data_PHP", 'exectime' => NULL));
        http_response_code(400);
    }
?>