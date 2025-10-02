
const calculateNextBillingDate = ()=>{
    const oneMonthFromNow = new Date(); //fecha y mes actual
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1) //se setea el tiempo que esté disponible el plan que tenga el usuario
    return oneMonthFromNow;
}



export default calculateNextBillingDate;