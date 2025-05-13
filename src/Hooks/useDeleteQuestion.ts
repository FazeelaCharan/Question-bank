"use client"
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import { deleteQuestion } from "@/services/QuestionService";
import { toast } from "sonner";
export const useDeleteQuestion=()=>{
    const queryclient= useQueryClient();
    return useMutation({
        mutationFn:deleteQuestion,
        onSuccess:()=>{
            toast.success("Question deleted successfully.")
            queryclient.invalidateQueries({queryKey:["questions"]})

        },
        onError:()=>{
            toast.error("Error to delete Question")
        }
    })
}