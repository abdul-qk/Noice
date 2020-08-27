<?php
$dir_promotion='../data/promotions/'.$_POST['promotion'].'.json';
$dir_products='../data/products';
$allproducts=scandir($dir_products);
$currentPromotion=file_get_contents($dir_promotion);
if($currentPromotion){
    $promotionProduct=array();
    $currentPromotion= json_decode($currentPromotion,true);
    foreach ($allproducts as $product){
        if(in_array(explode('.',$product)[0],$currentPromotion[0]['productList'])){
            array_push( $promotionProduct,json_decode(file_get_contents('../data/products/'.$product),true)[0]);
        };
    }
   // echo json_encode($promotionProduct);
}
else{
    echo 'error';
}

foreach ($promotionProduct as $key => $product){
    if(floatval($product['rating']) < $_POST['ratingFilter']){
        unset($promotionProduct[$key]);
    }
}
foreach ($promotionProduct as $key => $product){
    if($product['price'] < json_decode($_POST['priceFilter'])->startValue || $product['price'] > json_decode($_POST['priceFilter'])->EndValue){
        unset($promotionProduct[$key]);
    }
}

if($_POST['sort']=='AZ'){
    usort($promotionProduct,function($a,$b) {return strnatcasecmp($a['name'],$b['name']);});
    echo json_encode($promotionProduct);
}
else if($_POST['sort']=='ZA'){
    usort($promotionProduct,function($a,$b) {return strnatcasecmp($a['name'],$b['name']);});
    echo json_encode(array_reverse($promotionProduct));
}
else if($_POST['sort']=='LowHigh'){
    usort($promotionProduct,function($a,$b) {return $a['price'] - $b['price']; });
    echo json_encode($promotionProduct);
}
else if($_POST['sort']=='HighLow'){
    usort($promotionProduct,function($a,$b) {return $b['price'] - $a['price']; });
    echo json_encode($promotionProduct);

}
else {
    echo json_encode($promotionProduct);
}



?>