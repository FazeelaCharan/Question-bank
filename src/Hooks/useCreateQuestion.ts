"use client"
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { createQuestion } from "@/services/QuestionService";

import { toast } from "sonner";

export const useCreateQuestion=()=>{
const queryclient= useQueryClient();
return useMutation({
    mutationFn:createQuestion,
   onSuccess:()=>{
    toast.success("Question created successfully!")
    queryclient.invalidateQueries({queryKey:["questions"]})
   }, 
   onError:()=>{
    toast.error("Failed to create Question")
   }
})

}