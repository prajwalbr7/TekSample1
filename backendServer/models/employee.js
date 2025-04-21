const mongoose=require('mongoose')

const EmployeeSchema=new mongoose.Schema({
    name:{ type: String, unique: true, required: true },
    email:{type:String, unique:true, required: true},
    password:{type:String, required:true}
})

const EmployeeModel=mongoose.model("employeeRegistrationData",EmployeeSchema)
module.exports=EmployeeModel