import path from 'path';
const __dirname = import.meta.dirname



const homeControl = (req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'))
}

export default homeControl