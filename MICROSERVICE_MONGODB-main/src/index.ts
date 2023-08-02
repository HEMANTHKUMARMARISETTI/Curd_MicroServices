import express from "express"
import http from 'http'
import cors from 'cors'
import YAML from 'yamljs'
import mongodb from "mongodb"
 
const MongoClient=require("mongodb").MongoClient

import { connectToDatabase } from "./admin/types";

import swaggerUi from "swagger-ui-express"

const swaggerDocuments= YAML.load("openapi.yml")

import serviceApi from '../dist/index'

import bodyParser from "body-parser"

import { serviceApiimpl } from "./impl/types";

const app=express()

const impl=new serviceApiimpl()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({origin: true}))

var options={
    swaggerOptions:{
        url: "/api-docs/swagger.json"
    }
}

app.get("/api-docs/swagger.json",(req,res)=>res.json(swaggerDocuments))
app.use(
    "/api-docs",
    swaggerUi.serveFiles(undefined,options),
    swaggerUi.setup(undefined,options)
)
connectToDatabase()
.then(()=>{
    serviceApi(app,impl);
    app.listen(8087,()=>{
        console.log(`Server Started at http://localhost:8087`)
    })

}).catch((error: Error)=>{
    console.log("Data Base Connected Failed")
    process.exit()
})