<?php
    function privioslyValidateData($x, $y, $R){
        if ($x >=-2 && $x <=2 && $y >-3 && $y<5 && $R>1 && $R<4){    
            return true;
        }
        return false;
    }

    function validateData($x, $y, $R){

        if ($x>=0 && $y>=0 && $y<-2*$x+$R && $x<$R/2){
            return true;
        }

        if ($x<=0 && $x>-$R/2 && $y<=0 && $y>-$R){
            return true;
        }

        if ($x>-$R && $x<=0 && $y>=0 && $y<$R && sqrt($x**2+$y**2)<$R){
            return true;
        }

        return false;
    }
?>