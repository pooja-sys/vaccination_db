const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const { v4 } = require("uuid");
const app = express();
require("./db")
const PatientModel = require("./Model/patient.model");
const AdministerModel = require("./Model/administer.model");
const path =require('path')

app.use(cors());

// const patients = [{id:"A001", name:"abc", DOB:"09/9/1556", gender:"female", POB:"pune", BloodGrp:"o", height:"5", weight:"50"}]
const patients = [];

const schema = buildSchema(`
    type Query {
        hello : String!
        patients : [ Patient! ]!
        administers : [Administer !]!
        patientName(search : FindPatientInput) : Patient!
    }
    type Mutation {
        createPatient(data : CreatePatientInput) : Patient!
        createAdminister(data : CreateAministerInput) : Administer!
    }
    input FindPatientInput{
        name : String!
    }
    input CreateAministerInput{
      name : String!
      DOB : String!
      vaccine : String!
      dateAdministered : String!
      brand : String
      hospital : String
      age : Int
      dueDate : String
      complete : String
    }
    input CreatePatientInput {
        name : String!
        DOB : String!
        gender : String!
        POB : String!
        BloodGrp : String!
        height : Int
        weight : Int
    }
    type Patient {
        id : ID!
        name : String!
        DOB : String!
        gender : String!
        POB : String!
        BloodGrp : String!
        height : Int
        weight : Int
    }
    type Administer{
        id : ID!
        name : String!
        age : Int
        DOB : String!
        dueDate : String
        vaccine : String!
        dateAdministered : String!
        brand : String
        hospital : String
        complete : String
    }
`)

const rootValue = {
    hello: () => "World",
    patients: () => PatientModel.find(),
    administers : () => AdministerModel.find(),
    createPatient: async (args) => {
        // const {name } = args.data;
    const newPatient = new PatientModel(args.data);
        //  console.log(name,POB,DOB,gender,BloodGrp,height,weight);
        //  console.log(newPatient);
        const createdPatient = await newPatient.save()
        console.log(createdPatient);
        return createdPatient;
    
    },
    createAdminister : async (args) =>{
        //  const {name,hospital } = args.data;
        //  console.log("Hospital" ,hospital);
    const newAdminister = new AdministerModel(args.data);
     console.log(newAdminister);
    const createdAdminister = await newAdminister.save()
    // console.log("database -> ",createdAdminister);
    return createdAdminister;
    },
    patientName: async(args) => {
        const { name } = args.search
        // console.log("name ->" ,name);
        const foundPatient = await PatientModel.findOne({name})
        // console.log("found patient" , foundPatient);
        return foundPatient;
    }
}

app.use("/gq", graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))



app.get('/' , (req,res) => {
    res.send("Success")
});


const PORT = process.env.PORT || 9090

app.listen(PORT, () => console.log("Server started at PORT :" , PORT))



