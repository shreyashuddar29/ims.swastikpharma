/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import context from "./context"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebase/config"

function State({children}) {

    const [getAllChemist, setGetAllChemist] = useState([])
    const [getAllMedicine, setGetAllMedicine] = useState([])
    const [getAllBill, setGetAllBill] = useState([])

    const getAllChemistFunction = async () => {
        try {
            const q = query(
                collection(db, 'chemist'),
                orderBy('name')
            )

            const data = onSnapshot(q, (QuerySnapshot) => {
                let chemistArray = []
                QuerySnapshot.forEach((doc) => {
                    chemistArray.push({...doc.data(), id: doc.id})
                })
                setGetAllChemist(chemistArray)
            })
            return () => data
        } catch (error) {
            console.error("Error in getting chemist data", error)
        }
    }

    const getAllMedicineFunction = async () => {
        try {
            const q = query(
                collection(db, 'medicine'),
                orderBy('name')
            )

            const data = onSnapshot(q, (QuerySnapshot) => {
                let medicineArray = []
                QuerySnapshot.forEach((doc) => {
                    medicineArray.push({...doc.data(), id: doc.id})
                })
                setGetAllMedicine(medicineArray)
            })
            return () => data
        } catch (error) {
            console.error("Error in getting medicine data", error)
        }
    }

    const getAllBillsFunction = async() => {
        try {
            const q = query(
                collection(db, 'bill'),
                orderBy('time')
            )

            const data = onSnapshot(q, (QuerySnapshot) => {
                let billArray = []
                QuerySnapshot.forEach((doc) => {
                    billArray.push({...doc.data(), id: doc.id})
                })
                setGetAllBill(billArray)
            })
            return () => data
        } catch (error) {
            console.error("Error in getting bill data", error)
        }
    }

    useEffect(() => {
        getAllChemistFunction()
        getAllMedicineFunction()
        getAllBillsFunction()
    }, [])

    return (
        <context.Provider value= {{
            getAllChemist,
            getAllMedicine,
            getAllBill
        }}>
            {children}
        </context.Provider>
    )
}

export default State