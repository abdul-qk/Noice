<?php
$user_details=json_decode(file_get_contents('../data/users/'.$_POST['currentUser'].'.json'),true);
$user_details['points']=$user_details['points']+$_POST['points'];
file_put_contents('../data/users/'.$_POST['currentUser'].'.json',json_encode($user_details));
echo $user_details['points'];