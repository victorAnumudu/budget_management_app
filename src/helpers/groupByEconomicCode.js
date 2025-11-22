// const groupByEconomicCode = (data=[]) => {
//     if(!data){
//         return {}
//     }
//     const newObj = {} // {org_code: []}
//     for(let i=0; i<data.length; i++){
//         const newOrgCode = data[i].org_code
//         if(newObj[newOrgCode]){
//             newObj[newOrgCode] = [...newObj[newOrgCode], data[i]]
//         }else{
//             newObj[newOrgCode] = [data[i]]
//         }
//     }
// console.log(newObj)
//     // const sortedObjectByValue = Object.fromEntries(sortedEntriesByValue);
//     // return sortedObjectByValue
// }

const groupByEconomicCode = (data=[]) => {
    if(!data.length){
        return []
    }
    const newData = [] // [{org_code, beneficiary_mda, pvs}]
    let itemExist = false
    for(let i=0; i<data.length; i++){
        let matchOrgCode = data[i].org_code
        for(let j=0; j<newData.length; j++){
            if(newData[j]?.org_code == matchOrgCode){
                newData[j] = {...newData[j], pvs: [...newData[j].pvs, data[i]]}
                itemExist = true
            }
        }
        if(!itemExist){
            newData.push({org_code: matchOrgCode, beneficiary_mda:data[i]?.beneficiary_mda, pvs: [data[i]]})
        }
    }
    return newData
}

export default groupByEconomicCode