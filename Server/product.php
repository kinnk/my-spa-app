<?php


    function getProduct($conn){
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $sql .=" WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam (':id',$path[3]);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql); 
            $stmt->execute();
            $product = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
       
        echo json_encode($product);
    }
  

    function postProduct($conn){
        $product = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO products(id, name, rest, price, description) VALUES(null, :name, :rest, :price, :description)";
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam (':name',$product->name);
        $stmt->bindParam (':rest',$product->rest);
        $stmt->bindParam (':price',$product->price);
        $stmt->bindParam (':description',$product->description);

        
        if($stmt->execute()){
            $response = ['status'=>1, 'message'=>'Record created successfully'];
        }else {
            $response = ['status'=>0, 'message'=>'Failed to create record'];
        }
    }
    function putProducts($conn){
        $product = json_decode( file_get_contents('php://input') );
            $sql = "UPDATE products SET name =:name, rest =:rest, price =:price, description = :description WHERE id =:id";
            $stmt = $conn->prepare($sql);
            $path = explode('/',$_SERVER['REQUEST_URI']);
            $stmt->bindParam(':id', $path[3]);
            $stmt->bindParam (':name',$product->name);
            $stmt->bindParam (':rest',$product->rest);
            $stmt->bindParam (':price',$product->price);
            $stmt->bindParam (':description',$product->description);


        if($stmt->execute()){
            $response = ['status'=>1, 'message'=>'Record updated successfully'];
        }else {
            $response = ['status'=>0, 'message'=>'Failed to update record'];
        }
    }
     function delProduct($conn){
        $sql = "DELETE FROM products WHERE id = :id";
        $path = explode('/',$_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);
           
        if($stmt->execute()){
            $response = ['status'=>1, 'message'=>'Record deleted successfully'];
        }else {
            $response = ['status'=>0, 'message'=>'Failed to delete record'];
        }
    }
?>