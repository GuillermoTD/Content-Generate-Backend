
/*aqui verificamos si el usuario tiene fecha de proximo cobro 
y si dicha fecha es hoy, cualquiera que sea verdadero devolvera un true*/
const shouldRenewSubscriptionPlan = (user:userDTO)=>{
    const today = new Date();
    return !user?.nextBillingDate || user?.nextBillingDate <= today;
}
 
export default shouldRenewSubscriptionPlan;