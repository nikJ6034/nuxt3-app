export enum ResultType {
    SUCCESS = "SUCCESS"
    , FAIL = "FAIL"
}

export interface ResultData<T> {
    resultType: ResultType,
    msg: string,
    data: T
}

export interface ErrorData{
    data:ResultData<void>

}