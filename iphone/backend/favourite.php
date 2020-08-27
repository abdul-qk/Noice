<?php
$user_details=json_decode(file_get_contents('../data/users/'.$_POST['currentUser'].'.json'),true);
if($_POST['action']=='add'){
    array_push($user_details['favoriteList'],intval($_POST['prodId']));
    $success = file_put_contents('../data/users/'.$_POST['currentUser'].'.json',json_encode($user_details));
    if($success){
        echo "success";
    }else{
        echo "error";
    }
}
else if($_POST['action']=='remove'){
    if (($key = array_search(intval($_POST['prodId']), $user_details['favoriteList'])) !==false) {
        array_splice($user_details['favoriteList'], $key, 1);
    }

    $success = file_put_contents('../data/users/'.$_POST['currentUser'].'.json',json_encode($user_details));
    if($success){
        echo json_encode($user_details['favoriteList']);
    }else{
        echo "error";
    }

}
else if($_POST['action']=='view'){
    echo json_encode($user_details['favoriteList']);
}
else if($_POST['action']=='getList'){
    $favouriteList = $_POST['favList'];
//    $favArr = explode($favouriteList,',');
    $dir_products='';
    $productListArr = array();
    for ($x = 0; $x < sizeof($favouriteList); $x++) {
        $favObj = $favouriteList[$x];
        $products= file_get_contents('../data/products/'.$favObj.'.json');
        array_push($productListArr,$products);
    }
    echo json_encode($productListArr);
}
else{
    echo 'error';
}