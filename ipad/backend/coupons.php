<?php
$dir_coupons='../data/coupons';
$allcoupons=scandir($dir_coupons);
error_reporting(0);
ini_set('display_errors', 0);
//echo json_encode($allcoupons);
$Everycoupon = [];
foreach ($allcoupons as $coupon){
    if(file_get_contents('../data/coupons/'.$coupon)) {
        array_push($Everycoupon, json_decode(file_get_contents('../data/coupons/' . $coupon), true));
    }
}
if($_POST['type']!=='null'){
    if(file_get_contents('../data/coupons/'.$_POST['id'].'.json')) {
        if($_POST['type']==='collected'){
            $coupon_value = json_decode(file_get_contents('../data/coupons/' . $_POST['id'] . '.json'),true);
            $coupon_value['status'] = $_POST['type'];
            file_put_contents('../data/coupons/' . $_POST['id'] . '.json', json_encode($coupon_value));
            $user = json_decode(file_get_contents('../data/users/' . $_POST['currentUser'] . '.json'),true);
            $user['points'] =  $user['points']-$coupon_value['points'];
            if ($user['points'] < 0)
            {
                echo $user['points'];
            }
            else {
                echo "success";
                file_put_contents('../data/users/' . $_POST['currentUser'] . '.json', json_encode($user));
            }
        }
        else{
            $coupon_value = json_decode(file_get_contents('../data/coupons/' . $_POST['id'] . '.json'),true);
            $coupon_value['status'] = $_POST['type'];
            file_put_contents('../data/coupons/' . $_POST['id'] . '.json', json_encode($coupon_value));
            $user = json_decode(file_get_contents('../data/users/' . $_POST['currentUser'] . '.json'),true);
        }

    }
}
else {

    echo json_encode($Everycoupon);
}