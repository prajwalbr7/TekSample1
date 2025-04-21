const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const EmployeeModel=require('./models/employee')

const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb://localhost:27017/employee`);
app.listen(3003,()=>{
    console.log(`server running`)
})

app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser=await EmployeeModel.findOne({email});
        if(existingUser){
            res.status(409).json({
                status:"error",
                message:"User already registered with this email"
            });
        }else{
            const newUser=await EmployeeModel.create({name,email,password})
            res.status(201).json({
            status:"success",
            message:"User registered successfully",
            data:newUser
        })
        }
        
    }catch(error){
        res.status(500).json({
            status:"error",
            message:"Registration failed",

        })
    }
    
    
})
app.post('/login',(req,res)=>{
    const {email,password}=req.body
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json({
                    status:"success",
                    message:"Login Successfully",
                })
            }else{
                res.json({
                    status:"error",
                    message:"Incorrect password"
                })
            }
        }else{
            res.json("No record found")
        }
    })
    .catch(error=>{
        console.log("Login error",error)
        res.status(500).json({
            status:"error",
            message:"Login failed",

        })
    })
})
