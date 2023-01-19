import CommonCode from "./commonCode";

type UpperCode = {
    id: number,
    code: string,
    name: string,
    desc: string,
    codeList: CommonCode[],
    regId: number,
    regDt: Date,
    mdfcnId: number,
    mdfcnDt: Date
};

export default UpperCode;