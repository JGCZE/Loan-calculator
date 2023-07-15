import { useEffect, useState } from "react"
import { tenureData } from "./utils/constants"
import numberFormat from "./utils/config"
import TextInput from "./components/TextInput"
import Sliders from "./components/Sliders"

const App = () => {

  const [cost, setCost] = useState(0)
  const [interest, setInterest] = useState(10)
  const [downPayment, setDownPayment] = useState(0)
  const [tenure, setTenure] = useState(12)
  const [emi, setEmi] = useState(0)

  const calculateEMI = (downPayment) => {
    // emi amount = [P x R x (1+R)^N]/[(1+R)^N-1]

    if(!cost) return 0
    const loanAmnt = cost - downPayment
    const rateOfInterest = interest / 100
    const numOfYears = tenure / 12

    const emi = 
     ( (loanAmnt * rateOfInterest * Math.pow(1 + rateOfInterest, numOfYears)) / 
      (Math.pow(1 + rateOfInterest, numOfYears) - 1) ) / 12

      return emi.toFixed(0)
    }
    

  const calculateDP = (emi) => {
    if(!cost) return 0

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100
    return Number((downPaymentPercent / 100) * cost).toFixed(0)
  }

  useEffect(() => {
    if(!(cost > 0)) {
      setDownPayment(0)
      setEmi(0)
    }
    const emi = calculateEMI(downPayment)
    setEmi(emi)
  },[tenure, cost, calculateEMI, downPayment])

  const updateEMI = (e) => {
    if(!cost) return

    const dp = Number(e.target.value)
    setDownPayment(dp.toFixed(0))

    //calculate emi and update it
    const emi = calculateEMI(dp)
    setEmi(emi)
  }

  const updateDownPayment = (e) => {
    if(!cost) return

    const emi = Number(e.target.value)
    setEmi(emi.toFixed(0))

    //calculate downpayment and update it
    const dp = calculateDP(emi)
    setDownPayment(dp)
  }

  return (
    <div className="App">
      <h3>
          Úvěrová kalkulačka
      </h3>

      <div className="form">
        <TextInput
            title="Výše půjčky"
            state={cost}
            setState={setCost}
          />
      </div>

      <div className="form">
          <TextInput
            title="Úrok v procentech"
            state={interest}
            setState={setInterest}
            max={100}
          />
      </div>

      <Sliders
        title="Akontace"
        underlineTitle={`Celková výše akontace - ${numberFormat(calculateDP(emi))}`}
        onChange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
       />

      <Sliders
        title="Měsíční splátky"
        underlineTitle={`Měsíční splátka - ${numberFormat(emi)}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
       />

      <span className="title"> Doba úvěru v měsících </span>
        <div className="tenure-container">
        {tenureData.map((item, index) => {
            return (
              <button 
                key={index} 
                className={`tenure ${item === tenure? "selected" : ""}`} 
                onClick={() => setTenure(item)}
              > 
                {item}
            </button>
            )})
            }
        </div>

    </div>
  )
}

export default App