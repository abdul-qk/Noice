<?php
$user_details=file_get_contents('../data/users/'.$_POST['currentUser'].'.json');
 if($_POST['action']=='view'){
    echo $user_details;
}
else{
    echo 'error';
}