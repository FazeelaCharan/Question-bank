"use client"
import {  useMutation,useQueryClient } from "@tanstack/react-query";
import { updateQuestion } from "@/services/QuestionService";
import Question from "@/lib/types";
import { toast } from "sonner";

export const useUpdateQuestion=()=>{
const queryclient= useQueryClient();
return useMutation({
    mutationFn:({id,data}:{id:string; data:Question})=>updateQuestion(id,data),
    onSuccess:()=>{
toast.success("Question updated successfully.");
queryclient.invalidateQueries({queryKey:["questions"]})
    },
    onError:()=>{
        toast.error("Error in updating Question")
    }
})


}