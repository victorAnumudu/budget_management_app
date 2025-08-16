// const localImgLoader = (location) => require(`../assets/${location}`);
// const localImgLoader = (location) => {
//     if(!location){
//         return `/src/assets/logos/Abia_logo.png`
//     }else{
//         return `/src/assets/${location}`
//     }
// };
// export default localImgLoader

const localImgLoader = (location) => {
    if(!location){
        return `./assets/logos/Abia_logo.png`
    }else{
        return `./assets/${location}`
    }
};
export default localImgLoader