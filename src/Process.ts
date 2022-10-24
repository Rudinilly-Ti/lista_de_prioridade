export type Process = {
  id: number,
  name: string,
  time: number,
}

function SubirProcesso(i: number, list: Process[]): Process[] {
  let newList = [...list];
  let j = Math.floor(i + 1 / 2);
  if (j >= 1) {
    j--;
    if (newList[i].time < newList[j].time) {
      const aux = newList[i];
      newList[i] = newList[j];
      newList[j] = aux;
      return SubirProcesso(j, newList);
    }
  }
  return newList;
}

export function inserirProcesso(process: Process, list: Process[]): Process[] {
  if (list.length === 0) {
    return [process];
  } else {
    const newList = [...list, process];
    return SubirProcesso(newList.length - 1, newList);
  }
}

function descerProcesso(i: number, list: Process[]): Process[] {
  let newList = [...list];
  let j = i + 1 * 2;
  if (j < newList.length) {
    j--;
    if (newList[j + 1].time < newList[j].time) {
      j++;
    }
    if (newList[i].time > newList[j].time) {
      const aux = newList[i];
      newList[i] = newList[j];
      newList[j] = aux;
      return descerProcesso(j, newList);
    }
  }
  return newList;
}

export function removerProcesso(list: Process[]): Process[] {
  let newList = [...list];
  if (newList.length !== 0) {
    newList[0] = newList[newList.length - 1];
    newList.pop();
    return descerProcesso(0, newList);
  } else {
    return [];
  }
}

