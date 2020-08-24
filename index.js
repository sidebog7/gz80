
// import {CPU} from './simple/cpu.js';

// const cpu = new CPU();
// console.log(cpu.debug());
// cpu.reg.setRegister('bc',12345);
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());
// cpu.reg.setRegister('bc',54321);
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());
// cpu.reg.mux();
// console.log(cpu.debug());

// cpu.reg.setRegister('af',34343);
// console.log(cpu.debug());
// cpu.reg.switchAF();
// console.log(cpu.debug());
// cpu.reg.setRegister('af',21212);
// console.log(cpu.debug());
// cpu.reg.switchAF();
// console.log(cpu.debug());
// cpu.reg.switchAF();
// console.log(cpu.debug());

import { Spectrum } from './spectrum.js';

const speccy = new Spectrum();
const st = process.hrtime.bigint();
while(true) {
    speccy.cpu.step();
    //speccy.cpu.debug();
}

const et = process.hrtime.bigint();
console.log(et-st);
speccy.cpu.debug();
