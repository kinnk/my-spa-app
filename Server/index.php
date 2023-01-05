<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

include 'DbConnect.php';
require 'contragent.php';
require 'product.php';
require 'operation.php';
require 'article.php';
require 'sales.php';
require 'salesChart.php';
require 'analyticsFeatInf.php';
require 'reportOpiu.php';
require 'article_operation.php';

    $objDb = new DbConnect;
    $conn = $objDb->connect();
    $type = explode('/',$_SERVER['REQUEST_URI']);
   

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "GET":
            switch($type[2]){
                case "contragent":
                    getContragents($conn);
                break;
                case "product":
                    getProduct($conn);
                break;
                case "operation":
                    getOperations($conn);
                break;
                case "article":
                    getArticles($conn);
                break;
                case "sales":
                    getSales($conn);
                break;
                case "salesChart":
                    getSalesChart($conn);
                break;
                case "salesChartBar":
                    getsalesChartBar($conn);
                    break;
                case "revenueInf":
                    getRevenueInf ($conn);
                break;
                case "reportOpiu":
                    getReportOpiu ($conn);
                break;
                
                case "articleRev":
                    getArticleRev($conn);
                break;
                case "articleCost":
                    getArticleCost($conn);
                break;
                case "articleOpCost":
                    getArticleOpCost($conn);
                break;
                case "articleFin":
                    getArticleFin($conn);
                break;
            }
        break;

        case "POST":
            switch($type[2]){
                case"contragent":
                    postContragents($conn);
                break;
                case"product":
                    postProduct($conn);
                break;
                case "operation":
                    postOperations($conn);
                break;
                case "sales":
                    postSales($conn);
                break;
                case "salesOp":
                    postSalesOperations($conn);
                break;
            }
        break;
        case "PUT":
            switch($type[2]){
                case"contragent":
                    putContragents($conn);
                break;
                case "product":
                    putProducts($conn);
                break;
                case "operation":
                    putOperations($conn);
                break;
                case "sales":
                    putSales($conn);
                break;
            }
        break;
        case "DELETE":
            switch($type[2]){
                case "contragent":
                    delContragents($conn);
                break;
                case"product":
                    delProduct($conn);
                break;
                case "operation":
                    delOperations($conn);
                break;
                
            }
        break; 
        
    }