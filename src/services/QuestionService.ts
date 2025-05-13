
import { api } from "../lib/api";
import Question from "../lib/types";
const getQuestions=async()=>{
    const reponse = await api.get("/question");
    return reponse.data;
}
const createQuestion=async(data:Question):Promise<Question>=>{
const response=await api.post("/question",data);
return response.data;
}
const updateQuestion=async(id:string, data:Question):Promise<Question>=>{
const response= await api.put(`/question/${id}`,data);
return response.data;
}
const deleteQuestion=async(id:string):Promise<void>=>{
const response=await api.delete(`/question/${id}`);
return response.data;
}
export {getQuestions,createQuestion,updateQuestion,deleteQuestion};