<?php

    function getOperations ($conn){
        $sql = 
        "

        SELECT operation.id, operation.date, operation.type, contragents.name AS 'contragent', articles.name AS 'article', operation.sum as 'sum', operation.description 
        FROM operation, contragents, articles
        WHERE contragents.id = operation.contragent_id
        AND articles.id = operation.article_id
        
        ";
        $path = explode('/', $_SERVER['REQUEST_URI']); //explode разбивает строку на массив разделителем
        if(isset($path[3]) && is_numeric($path[3])){//isset - проверка на null is_numeric - проверка на число
            $sql .="WHERE id = :id";
            $stmt = $conn->prepare($sql); //подготовка запроса к выполнению и возврат обьетка
            $stmt->bindParam (':id',$path[3]); // привязка параметра запроса к переменной
            $stmt->execute();//запуск подготовленного запроса на выполнение
            $operations = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $operations = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        echo json_encode($operations);
    }

    function postOperations($conn){
            $operations = json_decode( file_get_contents('php://input') );
            $sql = "INSERT INTO operation(id, date, type, contragent_id, article_id, sum, description) 
                    VALUES(null, :date, :type, :contragent_id, :article_id, :sum, :description)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam (':date',$operations->date);
            $stmt->bindParam (':type',$operations->type);
            $stmt->bindParam (':contragent_id',$operations->contragent_id);
            $stmt->bindParam (':article_id',$operations->article_id);
            $stmt->bindParam (':sum',$operations->sum);
            $stmt->bindParam (':description',$operations->description);

        if($stmt->execute()){
            $response = ['status'=>1, 'message'=>'Record created successfully'];
        }else {
            $response = ['status'=>0, 'message'=>'Failed to create record'];
        }
    }
    function putOperations($conn){
        $operation = json_decode( file_get_contents('php://input') );
            $temp = $operation->article_id;
            switch($temp){
                
                case 1:
                    $sql = "UPDATE opu SET sales_revenue = sales_revenue +:sales_revenue WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':sales_revenue',$operation-> sum);
                    
                break;
                case 2:
                    $sql = "UPDATE opu SET purchase_cost =purchase_cost+:purchase_cost WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':purchase_cost',$operation-> sum);
                break;
                case 3:
                    $sql = "UPDATE opu SET salary =salary+:salary WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':salary',$operation-> sum);
                break;
                case 4:
                    $sql = "UPDATE opu SET rent =rent+:rent WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':rent',$operation-> sum);
                break;
                case 5:
                    $sql = "UPDATE opu SET Fare =Fare+:Fare WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':Fare',$operation-> sum);
                break;
                case 6:
                    $sql = "UPDATE opu SET internet =internet+:internet WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':internet',$operation-> sum);
                break;
                case 7:
                    $sql = "UPDATE opu SET com_serv =com_serv+:com_serv WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':com_serv',$operation-> sum);
                break;
                case 8:
                    $sql = "UPDATE opu SET corp_exp =corp_exp+:corp_exp WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':corp_exp',$operation-> sum);
                break;
                case 9:
                    $sql = "UPDATE opu SET hou_exp =hou_exp+:hou_exp WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':hou_exp',$operation-> sum);
                break;
                case 10:
                    $sql = "UPDATE opu SET repair =repair+:repair WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':repair',$operation-> sum);
                break;
                case 11:
                    $sql = "UPDATE opu SET adverstising =adverstising+:adverstising WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':adverstising',$operation-> sum);
                break;
                case 12:
                    $sql = "UPDATE opu SET other_income = other_income +:other_income WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':other_income',$operation-> sum);
                break;
                case 13:
                    $sql = "UPDATE opu SET other_expenses =other_expenses+:other_expenses WHERE month = MONTH(:date)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':other_expenses',$operation-> sum);
                break;
                }
                $stmt->bindParam(':date', $operation->date);
        if($stmt->execute()){
            $response = ['status'=>1, 'message'=>'Record updated successfully'];
        }else {
            $response = ['status'=>0, 'message'=>'Failed to update record'];
        }
    }

    function delOperations($conn){
        $sql = "DELETE FROM operation WHERE id = :id";
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