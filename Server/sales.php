<?php


 function getSales ($conn){
    $sql = "
    SELECT sales.id, sales.date, contragents.name AS 'contragent', products.name as 'product', sales.count, sales.sum
    FROM sales, contragents, products
    WHERE sales.contragent_id = contragents.id 
    AND sales.product_id = products.id;
    
    ";
    $path = explode('/', $_SERVER['REQUEST_URI']); //explode разбивает строку на массив разделителем
    if(isset($path[3]) && is_numeric($path[3])){//isset - проверка на null is_numeric - проверка на число
        $sql .=" WHERE id = :id";
        $stmt = $conn->prepare($sql); //подготовка запроса к выполнению и возврат обьетка
        $stmt->bindParam (':id',$path[3]); // привязка параметра запроса к переменной
        $stmt->execute();//запуск подготовленного запроса на выполнение
        $sales = $stmt->fetch(PDO::FETCH_ASSOC);
    }else{
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo json_encode($sales);
}

function postSales($conn){
    $sales = json_decode( file_get_contents('php://input') );
    $sql = 
    "
    INSERT INTO sales(id, date, contragent_id, product_id, count, sum ) 
    VALUES(null, :date, :contragent_id, :product_id, :count, :sum)  

    ";
   
    $stmt = $conn->prepare($sql);
  
    $stmt->bindParam (':date',$sales->date);
    $stmt->bindParam (':contragent_id',$sales->contragent_id);
    $stmt->bindParam (':product_id',$sales->product_id);
    $stmt->bindParam (':count',$sales->count);
    $stmt->bindParam (':sum',$sales->sum);
   

    if($stmt->execute()){
        $response = ['status'=>1, 'message'=>'Record created successfully'];
    }else {
        $response = ['status'=>0, 'message'=>'Failed to create record'];
    }
   
}

function putSales($conn){
    $sales = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE opu SET sales_revenue = sales_revenue +:sales_revenue WHERE month = MONTH(:date)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':sales_revenue',$sales-> sum);
        $stmt->bindParam(':date', $sales->date);
    if($stmt->execute()){
        $response = ['status'=>1, 'message'=>'Record updated successfully'];
    }else {
        $response = ['status'=>0, 'message'=>'Failed to update record'];
    }
}

// function delSales($conn){
//     $sql = "DELETE FROM sales WHERE id = :id";
//     $path = explode('/',$_SERVER['REQUEST_URI']);

//     $stmt = $conn->prepare($sql);
//     $stmt->bindParam(':id', $path[3]); 
       
// if($stmt->execute()){
//     $response = ['status'=>1, 'message'=>'Record deleted successfully'];
// }else {
//     $response = ['status'=>0, 'message'=>'Failed to delete record'];
// }
// // echo json_encode($contragent);
// }










?>