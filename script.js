// Create a <style> element
const style = document.createElement("style");

// Add CSS rules as text content
style.textContent = `
body {
  box-sizing: border-box;
  padding: 10px;
  margin:0px;
  text-transform: uppercase;
  font-weight: 600;
}
h1{
  color:#257180;
  font-size:22px;
  display:flex;
  flex-direction: column;
  align-items:center;
}
input{
  color:#257180;
  font-size:22px;
  width:200px;
  height:30px;
  padding:0px 5px 
}
  button{
    background-color:#333;
    color: whitesmoke;
    width:100px;
    margin-left:calc(50% - 50px);
    height:30px;
    border-radius:4px;
    border:none;
    font-size:18px;
    text-transform:uppercase;
    cursor:pointer;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
h2{
  color:#FD8B51;
  font-size:20px;
}
h3{
  color:#859F3D;
  font-size:18px;
}
h4{
  color:#608BC1;
  font-size:16px;
}
p{
  color:#333;
  font-size:14px;  
}
@media print{
  h1{
    display:none;
  }
  button{
    display:none;
  }
}
`;

// Append the <style> element to the <head> or <body> of the document
document.head.appendChild(style);

// Note: please restart the page if syntax highlighting works bad.
let container = document.querySelector("#container");
let header = document.querySelector("#header");

var values = {
  O: 0,
  S: 0,
  B: 0,
  D: 0,
  C: 0,
};

const onChange = (e) => {
  values[e.target.name] = Number(e.target.value);
  container.innerHTML = "";
  buildProgram(values.O, values.S, values.B, values.D, values.C);
};

const setInput = (input, name) => {
  input.name = name;
  input.id = name;
  input.type = "number";
  input.min = 0;
};

const form = document.createElement("h1");

const O = document.createElement("input");
setInput(O, "O");

const S = document.createElement("input");
setInput(S, "S");

const B = document.createElement("input");
setInput(B, "B");

const D = document.createElement("input");
setInput(D, "D");

const C = document.createElement("input");
setInput(C, "C");

form.innerHTML = `OHP`;
form.append(O);
form.innerHTML += `SQUATS`;
form.append(S);
form.innerHTML += `BENCH PRESS`;
form.append(B);
form.innerHTML += `DEADLIFTS`;
form.append(D);
form.innerHTML += `CYCLES`;
form.append(C);

header.append(form);

document.getElementById("O").addEventListener("input", (e) => {
  onChange(e);
});
document.getElementById("S").addEventListener("input", (e) => {
  onChange(e);
});
document.getElementById("B").addEventListener("input", (e) => {
  onChange(e);
});
document.getElementById("D").addEventListener("input", (e) => {
  onChange(e);
});
document.getElementById("C").addEventListener("input", (e) => {
  onChange(e);
});

const buildProgram = (ohp, squat, bench, deadlift, cycles) => {
  if (cycles > 12) return alert("easy boy, maximum cycles is 12 !");
  const save = document.getElementById("save");
  if (!save && values.O && values.S && values.B && values.D && values.C) {
    const button = document.createElement("button");
    button.id = "save";
    button.innerText = "save";
    button.onclick = (e) => {
      window.print();
    };

    header.append(button);
  }

  var O = (ohp * 90) / 100;
  var S = (squat * 90) / 100;
  var B = (bench * 90) / 100;
  var D = (deadlift * 90) / 100;

  var sets = [65, 75, 85];
  var deloads = [40, 50, 60];

  const newMaxes = document.createElement("h1");
  newMaxes.innerText = "* your new maxes are *";

  const getDecipline = (index) => {
    switch (index) {
      case 1:
        return "OHP";
      case 2:
        return "DEADLIFTS";
      case 3:
        return "BENCH PRESS";
      case 4:
        return "SQUATS";
    }
  };

  const getDeciplineMax = (index) => {
    switch (index) {
      case 1:
        return O;
      case 2:
        return D;
      case 3:
        return B;
      case 4:
        return S;
    }
  };

  const getReps = (w, s) => {
    switch (w) {
      case 1:
        switch (s) {
          case 1:
            return 5;
          case 2:
            return 5;
          case 3:
            return "5+";
        }
      case 2:
        switch (s) {
          case 1:
            return 3;
          case 2:
            return 3;
          case 3:
            return "3+";
        }
      case 3:
        switch (s) {
          case 1:
            return 5;
          case 2:
            return 3;
          case 3:
            return "1+";
        }
      case 4:
        switch (s) {
          case 1:
            return 5;
          case 2:
            return 5;
          case 3:
            return "5";
        }
    }
  };

  const calcNewMax = (weight) => {
    let step = weight * 0.05;
    weight += step;
    step = weight * 0.1;
    weight += step;
    return Math.round(weight);
  };

  const buildCycles = (cycles) => {
    for (let c = 1; c <= cycles; c++) {
      const cycle = document.createElement("h2");
      cycle.innerText = "CYCLE: " + c;
      container.append(cycle);

      for (let w = 1; w <= 4; w++) {
        const week = document.createElement("h3");
        week.innerText = "WEEK: " + w + (w === 4 ? " !!! DELOAD !!!" : "");
        container.append(week);

        for (let d = 1; d <= 4; d++) {
          const day = document.createElement("h4");
          day.innerText = "DAY: " + d + " | " + getDecipline(d);
          container.append(day);

          const workout = document.createElement("div");
          workout.style.width = "300px";
          workout.style.display = "flex";
          workout.style.justifyContent = "space-between";

          for (let s = 0; s < sets.length; s++) {
            const set = document.createElement("p");
            const weight = Math.round(
              (getDeciplineMax(d) * (w === 4 ? deloads[s] : sets[s])) / 100
            );
            set.innerText = weight + " KG × " + getReps(w, s + 1);
            workout.append(set);

            if (c === cycles && w === 3 && s === 2) {
              const record = document.createElement("h1");
              record.innerText = ` ${getDecipline(d)}: ${calcNewMax(weight)}`;
              newMaxes.append(record);
            }
          }
          container.append(workout);
          container.append(newMaxes);
        }
        sets = sets.map((s) => s + 5);
      }
      sets = [65, 75, 85];
      O += 2.5;
      D += 5;
      B += 2.5;
      S += 5;
    }
  };

  buildCycles(cycles);
};
