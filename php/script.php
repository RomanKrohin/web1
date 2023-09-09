<?php
    require "utils.php";
    $x= floatval($_POST["x_field"]);
    $y= floatval($_POST["y_field"]);
    $R= floatval($_POST["R_field"]);

    if (privioslyValidateData($x, $y, $R)){
        $result=validateData($x, $y, $R);

        if ($result){
            $answer="true";
        }
        else{
            $answer="false";
        }

        $data= array('collision' => $answer);

        echo json_encode($data);
        http_response_code(201);
    }else{
        echo json_encode(array('collision' => "Wrong data_PHP"));
        http_response_code(400);
    }
?>