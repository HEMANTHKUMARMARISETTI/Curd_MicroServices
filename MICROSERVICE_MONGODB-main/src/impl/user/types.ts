
import { DeletestudentResponse,GetGetStudentResponse, GetGetAllStudentsResponse,UpdatestudentResponse, StudentApi, StudentcreatedResponse } from "../../../dist/api/student/types";
import { Api } from "../../../dist/models";
import responses from "../user/respones/#responses.json" 
import {collections} from '../../../src/admin/types'
import { v4 } from "uuid"


export class studentApiImpl implements StudentApi {

    getGetStudent(id: string): Promise<GetGetStudentResponse>  {
        return new Promise<GetGetStudentResponse>((resolve,reject)=>{
            collections.users!.findOne({Id:id},function (err: any,result:any){
                if(err) {
                    const response=<GetGetStudentResponse>responses.auth1[0]
                    resolve(response)                   
                }
                console.log(result)
                const response=<GetGetStudentResponse>{
                    status:201,
                    body: result
                }
                resolve(response)    
            })  
        })   
    }
    
    getGetAllStudents(): Promise<GetGetAllStudentsResponse>  {
        return new Promise<GetGetAllStudentsResponse>((resolve,reject)=>{
            collections.users!.find({}).toArray(function(err:any,result:any){
                if(err) {
                    const response=<GetGetAllStudentsResponse>responses.auth1[0]
                    resolve(response)                   
                }
                const response=<GetGetAllStudentsResponse>{
                    status:201,
                    body: result
                }
                resolve(response)    
            })  
        })   
    }

    deletestudent(id: string):Promise<DeletestudentResponse>{
    return new Promise<DeletestudentResponse>((resolve,reject)=>{
        collections.users!.updateOne(
            {Id: id},
            { $set: {isExist: false}},
            function(err: any,result: any){
                if(err){
                    const response=<DeletestudentResponse>responses.auth1[0]
                    resolve(response)
                }
                const response=<DeletestudentResponse>responses.delete[0]
                resolve(response)
            }
        )
        
    })
 }

 updatestudent(id: string, request: Api.StudentUpdate) : Promise<UpdatestudentResponse>
 {
    return new Promise<UpdatestudentResponse>((resolve,reject)=>{
        collections.users!.updateOne(
            {Id: id},
            {$set:request},
            function(err:any,result: any){
                if(err){
                    const response=<UpdatestudentResponse>responses.auth1[0]
                    resolve(response)
                }
                const response=<UpdatestudentResponse>responses.auth2[0]
                resolve(response)
               
            }    
        )

    })
 }


 studentcreated(request: Api.Student): Promise<StudentcreatedResponse>
 {
    return new Promise<UpdatestudentResponse>((resolve,reject)=>{
        const studentDataRequest=request;
        request.Id = v4();
        collections.users!.findOne({rollnumber:request?.rollnumber}, // for unique ness
            function(err:any,result:any){
                if(result){
                    const response=<UpdatestudentResponse>responses.post[0]
                    resolve(response)
                }
                else{
                    collections.users!.insertOne(
                        // {email:request?.email,password:request?.password}, //dob:request?.dob,phonenumber:request?.phonenumber,branch:request?.branch,email:request?.email},
                        {...studentDataRequest},
                        function(err:any,result:any){
                          if(err){
                            const response=<UpdatestudentResponse>responses.auth1[0]
                            resolve(response)
                          }
                          else{
                            const response=<UpdatestudentResponse>responses.post[1]
                            resolve(response)
                          }
                            
                        }

                    )
                }
            }
        )
    })
 }
}