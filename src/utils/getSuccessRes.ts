export const getSuccesRes=(data:object,statusCode:number=200)=>{
    return {
        statusCode,
        message:'success',
        data
    }
}