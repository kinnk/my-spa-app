import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import s from "./app.module.css";
import Analytics  from './pages/analytics/analytics';
import ContragentList from './pages/contragentList/contragentList';
import Contragent from './pages/contragent/contragent';
import NewContragent from './pages/newContragent/newContragent';
import SalesList from './pages/salesList/salesList';
import ProductList from './pages/productList/productList';
import Product from './pages/product/product';
import NewProduct from './pages/newProduct/newProduct';
import NewSales from './pages/newSales/newSales';
import ReportOpiu from './pages/reportOpiu/reportOpiu';
import OperationList from './pages/operations/operationList';
import NewOperation from './pages/newOperation/newOperation';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Topbar />
          <div className={s.container}>
              <Sidebar />
              <Routes>
                <Route path='/' element={ <Analytics />} />

                <Route path='/operationList' element = { <OperationList />} />
                <Route path='/operation/newOperation' element = { <NewOperation />} />

                <Route path='/salesList' element = { <SalesList />} />
                <Route path='/sales/newSales' element = { <NewSales/>} />

                <Route path='/contragentList' element = { <ContragentList />} />
                <Route path='/contragent/:id/edit' element = { <Contragent />} />
                <Route path='/contragent/newContragent' element = { <NewContragent />} />

                <Route path='/productList' element = { <ProductList />} />
                <Route path='/product/:id/edit' element = { <Product />} />
                <Route path='/product/newProduct' element = { <NewProduct />} />

                <Route path='/reportOpiu' element = { <ReportOpiu />} />
               
                


              </Routes>      
          </div>
      </div>
    </BrowserRouter>      

  );
}

export default App;
