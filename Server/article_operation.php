<?php


function getArticleRev ($conn){
    $sql = "

    SELECT *
    FROM articles
    WHERE id = 1
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($sales);
}
function getArticleCost ($conn){
    $sql = "

    SELECT *
    FROM articles
    WHERE id BETWEEN 2 AND 7
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $sales1 = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($sales1);
}
function getArticleOpCost ($conn){
    $sql = "

    SELECT * 
    FROM articles
    WHERE id BETWEEN 8 AND 11
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($sales);
}
function getArticleFin ($conn){
    $sql = "

    SELECT *
    FROM articles
    WHERE id IN(12,13)
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($sales);
}