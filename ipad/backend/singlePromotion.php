<?php
$filePath = '../data/promotions/'.$_POST['currentPromotion'].'.json';
$currentPromotion=file_get_contents($filePath);
if($currentPromotion){
    echo $currentPromotion;
}else{
    echo 'error';
}