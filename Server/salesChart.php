<?php
 function getSalesChart ($conn){
    $sql = "
    SELECT month.name, SUM(opu.sales_revenue) AS 'sum'
    FROM month, opu
    WHERE month.id = opu.month
    GROUP BY month.name
    ORDER BY month.id;
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($sales);
}

function getSalesChartBar ($conn){
    $sql = "
    SELECT products.name AS 'product', SUM(sales.count) AS 'count'
    FROM products, sales
    WHERE products.id = sales.product_id
    GROUP BY products.id;
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($sales);
}



?>