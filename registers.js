import {createMemory} from './memory.js';
export class Registers {
    constructor() {
        this.regAccNames = ['af'];
        this.regMuxNames = ['bc','de','hl','wz'];
        this.regOthNames = ['ix','iy','sp','pc'];
        this.regNames = [...this.regAccNames, ...this.regMuxNames, ...this.regOthNames];

        this.regMem = createMemory(this.regNames.length * 2);
        this.xregMem = createMemory(10);

        this.regMap = this.regNames.reduce((map,name,i) => {
            map[name] = i * 2;
            if(this.regAccNames.indexOf(name) !== -1 || this.regMuxNames.indexOf(name) !== -1) {
                map[name.substring(0,1)] = i * 2;
                map[name.substring(1,2)] = i * 2 + 1;
            }
            return map;
        }, {});

    }

    debug() {
        this.regNames.forEach((name) => {
            console.log(`${name}: 0x${this.getRegister(name).toString(16).padStart(4,'0')}`)
        });
        console.log();
    }

    mux() {
        const sp = this.regMap[this.regMuxNames[0]];
        const ep = this.regMap[this.regMuxNames[this.regMuxNames.length - 1]] + 2;
        const muxRegs = new DataView(this.regMem.buffer.slice(sp, ep));
        this.regMuxNames.forEach((name, i) => {
            this.setRegister(name, this.xregMem.getUint16(i*2));
        });
        this.xregMem = muxRegs;
    }

    getRegister(name) {
        if(!(name in this.regMap)) {
            throw new Error(`getRegister: No such register as '${name}'`);
        }
        const pos = this.regMap[name];
        if(name.length === 1) {
            return this.regMem.getUint8(pos);
        }
        else {
            return this.regMem.getUint16(pos);
        }
    }

    setRegister(name, value) {
        if(!(name in this.regMap)) {
            throw new Error(`setRegister: No such register as '${name}'`);
        }
        const pos = this.regMap[name];
        if(name.length === 1) {
            this.regMem.setUint8(pos, value);
        }
        else {
            this.regMem.setUint16(pos, value);
        }
    }
}