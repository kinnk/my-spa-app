<?php

function postSalesOperations($conn){
    $operations = json_decode( file_get_contents('php://input') );
    $sql = 
    "
        INSERT INTO operation(id, date, type, contragent_id, article_id, sum ,description) 
        VALUES(null, :date, :type, :contragent_id, :article_id, :sum, null)
    ";

    $stmt = $conn->prepare($sql);
    $tp = 'Поступление';
    $article = 1;
    $stmt->bindParam (':date',$operations->date);
    $stmt->bindParam (':type',$tp);
    $stmt->bindParam (':contragent_id',$operations->contragent_id);
    $stmt->bindParam (':article_id',$article);
    $stmt->bindParam (':sum',$operations->sum);

if($stmt->execute()){
    $response = ['status'=>1, 'message'=>'Record created successfully'];
}else {
    $response = ['status'=>0, 'message'=>'Failed to create record'];
}
}


?>