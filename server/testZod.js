"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const babyValidators_1 = require("./src/validators/babyValidators");
const payload = {
    motherName: 'Test Mother',
    motherAge: 25,
    isTwin: false,
    dob: '2026-03-02',
    termStatus: 'Term',
    weight: 2569,
    gender: 'Male',
    gestationalAge: '37W'
};
try {
    const result = babyValidators_1.babySchema.parse(payload);
    console.log('SUCCESS:', result);
}
catch (e) {
    console.log('ERROR NAME:', e.name);
    console.log('ERROR MESSAGE:', e.message);
}
//# sourceMappingURL=testZod.js.map