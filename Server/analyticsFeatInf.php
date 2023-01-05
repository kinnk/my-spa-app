
<?php
 function getRevenueInf ($conn){
    $sql = "
    SELECT 
	SUM(CASE month WHEN MONTH(NOW()) THEN opu.sales_revenue END ) 'last',
    SUM(CASE month WHEN MONTH(DATE_ADD(NOW(), INTERVAL -1 MONTH)) THEN opu.sales_revenue END ) 'prev'
    FROM opu;
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $revenue = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($revenue);
}


// UNION
//     SELECT SUM(sales.sum) AS 'rev' 
//     FROM sales
//     WHERE MONTH(sales.date) = MONTH(DATE_ADD(NOW(), INTERVAL -1 MONTH)) AND YEAR(sales.date) = YEAR(NOW());


?>