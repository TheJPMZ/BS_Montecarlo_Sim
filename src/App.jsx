import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import './App.css'
import Montecarlo from './components/montecarlo'


const bet_times = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500]
const bet_amounts = [1, 5, 10, 15, 20, 25, 50, 100, 200, 500]

export default function App() {

  const [ready, setReady] = useState(false)

  const [initial, setInitial] = useState(500)
  const [final, setFinal] = useState(0)

  const [bet, setBet] = useState(1)
  const [numBet, setNumBet] = useState(15)
  const [simulations, setSimulations] = useState(1)
  const [gameEdge, setGameEdge] = useState(0)

  const [series, setSeries] = useState([{ name: "", data: [0] }])
  const [options, setOptions] = useState({})

  const simulate = (e) => {

    e.preventDefault()

    setReady(false)

    console.log(initial, 'red', bet, numBet, simulations)

    const montevideo = new Montecarlo(initial, 'red', bet, numBet, simulations)

    const { average, data } = montevideo.simulate()
    setGameEdge(montevideo.gameEdge())

    setFinal(average)

    let scale = Array.from({lenght: numBet}, (_, i) => i + 1)

    setSeries(data)

    setOptions({
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: scale
      }
    })

    setReady(true)
  }


  return (
    <div className='h-screen'>

      <div className='shadow-md h-24 bg-a1'>
        <h1 className="text-center font-semibold text-4xl text-white pt-7">Simulador de Big Small - Montecarlo</h1>
      </div>


      <div className='flex h-[90vh]'>


        <div className="aspect-square max-w-lg mx-auto p-4 bg-gray-100 shadow-md">
          <h2 className="font-semibold text-4xl text-a1 mb-6">Inputs</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-2xl text-a2 font-medium">Cantidad Inicial</label>
              <input type="number" id="amount" name="amount" className="w-full text-2xl p-2 border border-a3 rounded" value={initial} onChange={(e) => setInitial(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label htmlFor="bet" className="block text-2xl text-a2 font-medium">Apuesta</label>
              <select name="bet" id="bet" className="w-full text-2xl p-2 border border-a3 rounded" value={bet} onChange={(e) => setBet(e.target.value)}>
                {bet_amounts.map((bet_amount, index) => <option key={index} value={bet_amount}>{bet_amount}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="numBet" className="block text-2xl text-a2 font-medium">Numero de Apuestas</label>
              <select name="numBet" id="numBet" className="w-full text-2xl p-2 border border-a3 rounded" value={numBet} onChange={(e) => setNumBet(e.target.value)}>
                {bet_times.map((bet_time, index) => <option key={index} value={bet_time}>{bet_time}</option>)}
              </select>
            </div> 
            <div className="space-y-2">

              <label htmlFor="simulations" className="block text-2xl text-a2 font-medium">Numero de Simulaciones</label>
              <select name="simulations" id="simulations" className="w-full text-2xl p-2 border border-a3 rounded" value={simulations} onChange={(e) => setSimulations(e.target.value)}>
                {[0,1,10,50,100].map((simu, index) => <option key={index} value={simu}>{simu}</option>)}
              </select>
            </div>

            <button onClick={(e)=>simulate(e)} type="submit" className="w-full bg-b1 hover:bg-b2 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Simular</button>
          </form>
        </div>

        <div className='bg-a3 h-full w-full'>
          {ready ?
            <>
              <div className='grid grid-cols-3 p-10'>
                <div className='bg-green-200 h-20 rounded-l-full'>
                  <h3 className='text-green-700 pl-9 font-semibold'>Initial Amount:</h3>
                  <h4 className='pl-9 font-bold text-5xl'>${initial}</h4>
                </div>
                <div className='bg-blue-200 h-20'>
                  <h3 className='text-blue-700 pl-9 font-semibold'>Game Edge:</h3>
                  <h4 className='pl-9 font-bold text-5xl'>{gameEdge}%</h4>
                </div>
                <div className='bg-red-300 h-20 rounded-r-full'>
                  <h3 className='text-red-700 pl-2 font-semibold'>Final Amount:</h3>
                  <h4 className='pl-2 font-bold text-5xl'>${final}</h4>
                </div>
              </div>
              <Chart
                options={options}
                series={series}
                type="line"
                height="80%"
              />
            </>
            : <div className='flex justify-center items-center h-full text-4xl font-bold animate-pulse text-a1'>Esperando datos...</div>
          }

        </div>

      </div>

      <footer className='font-semibold flex justify-center items-center h-16 bg-black text-white absolute bottom-0 w-full'>
        Desarrollado por:
        <span className='underline p-1'>
          Priscilla Gonzalez, Cayetano Molina, Jose Monzon, Sara Paguaga
        </span>
      </footer>
    </div>
  )
}

