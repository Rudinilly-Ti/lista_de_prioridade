import { useState, useEffect } from 'react'
import { Process, inserirProcesso, removerProcesso } from './Process'
import './style.css';

const newProcesses = [
  { id: 0, name: 'Process 1', time: Math.floor(Math.random() * 20) + 1 },
  { id: 1, name: 'Process 2', time: Math.floor(Math.random() * 20) + 1 },
  { id: 2, name: 'Process 3', time: Math.floor(Math.random() * 20) + 1 },
  { id: 3, name: 'Process 4', time: Math.floor(Math.random() * 20) + 1 },
]

function App() {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [firstProcess, setFirstProsess] = useState<Process>();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    let list: Process[] = processes;
    newProcesses.forEach((process) => {
      list = inserirProcesso(process, list);
    })

    setFirstProsess(list[0]);
    if (list[0].time <= 3) {
      setRemainingTime(list[0].time);
    } else {
      setRemainingTime(3);
    }
    list = removerProcesso(list);
    setProcesses(list);
  }, []);


  useEffect(() => {
    if (firstProcess && processes.length > 0) {
      let actualProcess = firstProcess;

      if (actualProcess.time > 3) {
        setTimeout(() => {
          if (remainingTime === 0) {
            setFirstProsess(processes[0]);

            let list = removerProcesso(processes);

            list = inserirProcesso(actualProcess, list);
            setProcesses(list)

            if (processes[0].time < 3) {
              setRemainingTime(processes[0].time);
            } else {
              setRemainingTime(3);
            }
          } else {
            setRemainingTime(remainingTime - 1);
            actualProcess.time -= 1;
            if (counter === 10) {
              handleTenSeconds();
            }
            if (counter === 20) {
              handleSixteenSeconds();
            }
            setCounter(counter + 1);
          }
        }, 1000)
      } else {
        setTimeout(() => {
          if (remainingTime === 0) {
            setFirstProsess(processes[0]);
            let list = removerProcesso(processes);

            if (actualProcess.time > 0) {
              list = inserirProcesso(actualProcess, list);
            }

            setProcesses(list);

            if (processes[0].time < 3) {
              setRemainingTime(processes[0].time);
            } else {
              setRemainingTime(3);
            }
          } else {
            actualProcess.time -= 1;
            setRemainingTime(remainingTime - 1);
            if (counter === 10) {
              handleTenSeconds();
            }
            if (counter === 20) {
              handleSixteenSeconds();
            }
            setCounter(counter + 1);
          }
        }, 1000)
      }
    } else {
      if (firstProcess) {
        let actualProcess = firstProcess;
        if (actualProcess.time > 3) {
          setTimeout(() => {
            if (remainingTime === 0) {
              setFirstProsess(actualProcess);

              if (actualProcess.time < 3) {
                setRemainingTime(actualProcess.time);
              } else {
                setRemainingTime(3);
              }
            } else {
              actualProcess.time -= 1;
              setRemainingTime(remainingTime - 1);
              if (actualProcess.time === 0) {
                setFirstProsess(undefined);
              }
            }
          }, 1000)
        } else {
          setTimeout(() => {
            if (remainingTime === 0) {
              setFirstProsess(actualProcess);

              if (actualProcess.time < 3) {
                setRemainingTime(actualProcess.time);
              } else {
                setRemainingTime(3);
              }
            } else {
              actualProcess.time -= 1;
              setRemainingTime(remainingTime - 1);
              if (actualProcess.time === 0) {
                setFirstProsess(undefined);
              }
            }
          }, 1000)
        }
      }

    }

  }, [remainingTime]);

  const handleTenSeconds = () => {
    let list = processes;
    for (let i = 4; i < 14; i++) {
      list = inserirProcesso({ id: i, name: `Process ${i + 1}`, time: Math.floor(Math.random() * 20) + 1 }, list);
    }
    setProcesses(list);
  }

  const handleSixteenSeconds = () => {
    let list = processes;
    for (let i = 14; i < 30; i++) {
      list = inserirProcesso({ id: i, name: `Process ${i + 1}`, time: Math.floor(Math.random() * 20) + 1 }, list);
    }
    setProcesses(list);
  }

  return (
    <div className="App">
      <div className='firstProsses'>
        <div className='process' style={{ background: 'green' }}>
          <h1>{firstProcess?.name}</h1>
          <p> Tempo de execução: {firstProcess?.time}</p>
        </div>
        <div className='timer'>
          <h1>Tempo de execução</h1>
          <p>Tempo restante: {remainingTime} segundos</p>
        </div>
      </div>
      <div className='allProssesses'>
        {processes.map((process) => (
          <div className='process' key={process.id}>
            <h1>{process.name}</h1>
            <p>Tempo de execução: {process.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
