import { studentApiImpl } from "./user/types";
import { ApiImplementation } from "../../dist/types";



export class serviceApiimpl implements ApiImplementation {
    student:studentApiImpl=new studentApiImpl
}
