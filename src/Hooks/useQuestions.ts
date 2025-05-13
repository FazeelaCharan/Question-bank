"use client"
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/services/QuestionService";
import Question from "@/lib/types";

export const useQuestions=()=>{
return useQuery<Question[]>({
queryKey:["questions"],
queryFn:getQuestions,
})

}