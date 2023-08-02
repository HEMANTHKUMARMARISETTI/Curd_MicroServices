import * as mongoDB from "mongodb"

export const collections:{users?: mongoDB.Collection}={}

export async function connectToDatabase() {
    const client:mongoDB.MongoClient=new mongoDB.MongoClient("mongodb+srv://vamsi:vamsi4()(L@cluster0.s0tyjqp.mongodb.net/?retryWrites=true&w=majority")

    await client.connect()

    const db:mongoDB.Db=client.db("RegisterStudent")
    
    const users:mongoDB.Collection=db.collection("ListOfStudents")

    collections.users=users
}
