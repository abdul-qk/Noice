<?php
$filePath = '../data/products/'.$_POST['currentProduct'].'.json';
$currentProduct=file_get_contents($filePath);
if($currentProduct){
    echo $currentProduct;
}else{
    echo 'error';
}