<?php
error_reporting(0);
ini_set('display_errors', 0);
$productData = file_get_contents('../data/products/' . $_POST['prodId'] . '.json');
if ($_POST['action'] == 'view') {
    echo $productData;
} else if ($_POST['action'] == 'add') {
    $email = $_POST['email'];
    $description = $_POST['description'];
    $time = $_POST['time'];
    $rating = $_POST['rating'];
    $selectedProduct = $_POST['prodId'];
    $reviewObj = array(
        'email' => $email,
        'description' => $description,
        'time' => $time,
        'rating' => $rating,
    );

    $currentFile = json_decode(file_get_contents('../data/products/' . $_POST['prodId'] . '.json'), true);
    array_push($currentFile[0]['review'], $reviewObj);
    $success = file_put_contents('../data/products/' . $selectedProduct . '.json', json_encode($currentFile));
    if ($success) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'error';
}