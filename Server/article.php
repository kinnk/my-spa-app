<?php


    function getArticles($conn){
        $sql = "SELECT * FROM article";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $article = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        
        echo json_encode($article);
    }




?>