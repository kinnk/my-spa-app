<?php



    function getContragents ($conn){
        $sql = "SELECT * FROM contragents";
        $path = explode('/', $_SERVER['REQUEST_URI']); //explode разбивает строку на массив разделителем
        if(isset($path[3]) && is_numeric($path[3])){//isset - проверка на null is_numeric - проверка на число
            $sql .=" WHERE id = :id";
            $stmt = $conn->prepare($sql); //подготовка запроса к выполнению и возврат обьетка
            $stmt->bindParam (':id',$path[3]); // привязка параметра запроса к переменной
            $stmt->execute();//запуск подготовленного запроса на выполнение
            $contragent = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $contragent = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        echo json_encode($contragent);
    }

    function postContragents($conn){
        $contragent = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO contragents(id, name, email, mobile) VALUES(null, :name, :email, :phone_number)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam (':name',$contragent->name);
        $stmt->bindParam (':email',$contragent->email);
        $stmt->bindParam (':mobile',$contragent->mobile);
            
        if($stmt->execute()){
            $response = ['status'=>1, 'message'=>'Record created successfully'];
        }else {
            $response = ['status'=>0, 'message'=>'Failed to create record'];
        }
    }

    function putContragents($conn){
        $contragent = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE contragents SET name =:name, email =:email, mobile =:mobile WHERE id =:id";
        $stmt = $conn->prepare($sql);
        $path = explode('/',$_SERVER['REQUEST_URI']);
        $stmt->bindParam(':id', $path[3]);
        $stmt->bindParam (':name',$contragent->name);
        $stmt->bindParam (':email',$contragent->email);
        $stmt->bindParam (':mobile',$contragent->mobile);

        if($stmt->execute()){
            $response = ['status'=>1, 'message'=>'Record updated successfully'];
        }else {
            $response = ['status'=>0, 'message'=>'Failed to update record'];
        }
    }

    function delContragents($conn){
        $sql = "DELETE FROM contragents WHERE id = :id";
        $path = explode('/',$_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
       $stmt->bindParam(':id', $path[3]); 
           
    if($stmt->execute()){
        $response = ['status'=>1, 'message'=>'Record deleted successfully'];
    }else {
        $response = ['status'=>0, 'message'=>'Failed to delete record'];
    }
    // echo json_encode($contragent);
    }
?>