import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import NoPage from './pages/nopage/NoPage'
import ChemistDetails from './components/admin/ChemistDetails'
import MedicineDetails from './components/admin/MedicineDetails'
import AddChemist from './pages/admin/AddChemist'
import AddMedicine from './pages/admin/AddMedicine'
import UpdateChemist from './pages/admin/UpdateChemist'
import { Toaster } from 'react-hot-toast'
import State from './context/State'
import UpdateMedicine from './pages/admin/UpdateMedicine'
import MakeBill from './pages/admin/MakeBill'
import BillDetails from './components/admin/BillDetails'
import InventoryDetails from './components/admin/InventoryDetails'

function App() {

  return (
    <>
      <State>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<NoPage />} />
            <Route path='/chemistdetails' element={<ChemistDetails />} />
            <Route path='/medicinedetails' element={<MedicineDetails />} />
            <Route path='/addchemist' element={<AddChemist />} />
            <Route path='/addmedicine' element={<AddMedicine />} />
            <Route path='/updatechemist/:id' element={<UpdateChemist />} />
            <Route path='/updatemedicine/:id' element={<UpdateMedicine />} />
            <Route path='/makebill/:id' element={<MakeBill />} />
            <Route path='/billdetails' element={<BillDetails />} />
            <Route path='/inventorydetails' element={<InventoryDetails />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </State>
    </>
  )
}

export default App
