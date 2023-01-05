<?php

function getReportOpiu ($conn){
    $sql = 
    "
        SELECT month.name as 'month', sales_revenue as ' vs', 
        SUM(purchase_cost + salary + rent + Fare + internet + com_serv) as 'ss',
        purchase_cost as 'sz', salary as 'zp', rent as 'ap', Fare as 'tr', internet as 'sii',
        com_serv as 'cu', (sales_revenue-SUM(purchase_cost + salary + rent + Fare + internet + com_serv)) as 'vp',
        SUM(corp_exp + hou_exp + repair + advertising) as 'or',
        corp_exp as 'kr',hou_exp as 'hr',  repair as 'rem', advertising as 'rek',
        ((sales_revenue-SUM(purchase_cost + salary + rent + Fare + internet + com_serv))-(SUM(corp_exp + hou_exp + repair + advertising))) as 'op'
        FROM opu,month
        WHERE opu.month = month.id
        GROUP BY month;
    
    ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $opiu = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($opiu);
}


?>